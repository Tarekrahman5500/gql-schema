import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Coffee, CoffeeCreateInput } from '../graphql';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  coffeeFindAll(): Coffee[] {
    return [];
  }

  @Query('coffee')
  coffeeFindOne(@Args('id') id: number): Coffee {
    return {
      id: id,
      name: 'test',
      brand: 'test',
      flavors: ['test'],
    };
  }

  @Mutation('coffeeCreate')
  coffeeCreate(
    @Args('coffeeCreateInput') coffeeCreateInput: CoffeeCreateInput,
  ): Coffee {
    return {
      id: 1,
      ...coffeeCreateInput,
    };
  }
}
