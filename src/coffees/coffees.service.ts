import { Injectable } from '@nestjs/common';
import { CoffeeCreateInput } from '../graphql';

@Injectable()
export class CoffeesService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return {
      id: id,
      name: 'test',
      brand: 'test',
      flavors: ['test'],
    };
  }

  create(coffeeCreateInput: CoffeeCreateInput) {
    return { id: 1, ...coffeeCreateInput };
  }
}
