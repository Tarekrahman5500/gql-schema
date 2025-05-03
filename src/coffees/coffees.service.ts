import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from './entities/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return this.coffeesRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} not found`);
    }
    return coffee;
  }

  // now use promise.all to create the flavors and save them in the db then create the coffee

  async create(coffeeCreateInput: CreateCoffeeInput): Promise<Coffee> {
    const flavors = await Promise.all(
      coffeeCreateInput.flavors.map((name) => this.findOrCreateFlavor(name)),
    );
    const coffee = this.coffeesRepository.create({
      ...coffeeCreateInput,
      flavors,
    });
    const newCoffee = await this.coffeesRepository.save(coffee);
    this.pubSub
      .publish('coffeeAdded', { coffeeAdded: newCoffee })
      .catch((err) => console.error('PubSub publish error:', err));
    return newCoffee;
  }

  // now modify the update function to use the findOrCreateFlavor function

  async update(
    id: number,
    coffeeUpdateInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    await this.findOne(id);

    let flavors: Flavor[] | undefined = undefined;
    if (coffeeUpdateInput.flavors) {
      flavors = await Promise.all(
        coffeeUpdateInput.flavors.map((name) => this.findOrCreateFlavor(name)),
      );
    }

    const coffee = await this.coffeesRepository.preload({
      id,
      ...Object.fromEntries(
        Object.entries(coffeeUpdateInput).filter(([, value]) => value !== null),
      ),
      ...(flavors && { flavors }),
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} not found`);
    }
    return this.coffeesRepository.save(coffee);
  }

  // now create an async function take name as string, and if present in db return the flavor else create it and return it
  async findOrCreateFlavor(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    const newFlavor = this.flavorsRepository.create({ name });
    return this.flavorsRepository.save(newFlavor);
  }
}
