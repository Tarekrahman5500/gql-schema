import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Flavor } from '../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../entities/coffee.entity';
import { In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {
    super((keys) => {
      return this.batchLoad(keys);
    });
  }

  private async batchLoad(keys: readonly number[]): Promise<Flavor[][]> {
    const coffees = await this.coffeesRepository.find({
      select: ['id'],
      where: {
        id: In(keys as number[]),
      },
      relations: {
        flavors: true,
      },
    });

    const coffeeMap = new Map<number, Flavor[]>();
    for (const coffee of coffees) {
      coffeeMap.set(coffee.id, coffee.flavors ?? []);
    }

    return keys.map((id) => coffeeMap.get(id) ?? []);
  }
}
