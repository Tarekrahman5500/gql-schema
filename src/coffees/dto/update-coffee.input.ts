import { IsOptional, MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql-types';

export class UpdateCoffeeInput extends GraphQLTypes.CoffeeUpdateInput {
  @IsOptional()
  @MinLength(3)
  declare name: string;
}
