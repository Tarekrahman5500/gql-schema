import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import * as GraphQLTypes from '../graphql-types';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Query('coffees') async coffeeFindAll(): Promise<GraphQLTypes.Coffee[]> {
    return await this.coffeesService.findAll();
  }

  @Query('coffee') async coffeeFindOne(
    @Args('id') id: string,
  ): Promise<GraphQLTypes.Coffee> {
    const numericId = parseInt(id, 10);
    return await this.coffeesService.findOne(numericId);
  }

  @Mutation('coffeeCreate') async coffeeCreate(
    @Args('coffeeCreateInput')
    coffeeCreateInput: CreateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return await this.coffeesService.create(coffeeCreateInput);
  }

  @Mutation('coffeeUpdate') async coffeeUpdate(
    @Args('id') id: string,
    @Args('coffeeCreateInput')
    coffeeUpdateInput: UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    const numericId = parseInt(id, 10);
    return await this.coffeesService.update(numericId, coffeeUpdateInput);
  }
}
