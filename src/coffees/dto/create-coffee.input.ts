import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class CreateCoffeeInput extends GraphQLTypes.CoffeeCreateInput {
  @MinLength(3)
  declare name: string;
}
