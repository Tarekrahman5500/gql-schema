import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Coffee, CoffeeCreateInput } from '../graphql';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Query('coffees')
  coffeeFindAll(): Coffee[] {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  coffeeFindOne(@Args('id') id: string): Coffee {
    const numericId = parseInt(id, 10);
    return this.coffeesService.findOne(numericId);
  }

  @Mutation('coffeeCreate')
  coffeeCreate(
    @Args('coffeeCreateInput') coffeeCreateInput: CoffeeCreateInput,
  ): Coffee {
    return this.coffeesService.create(coffeeCreateInput);
  }
}
