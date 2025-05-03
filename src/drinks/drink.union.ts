// drink.union.ts
import { createUnionType } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';

export const DrinkUnion = createUnionType({
  name: 'Drink',
  types: () => [GraphQLTypes.Coffee, GraphQLTypes.Tea],
  resolveType(value) {
    if ('brand' in value) return GraphQLTypes.Coffee;
    if ('name' in value) return GraphQLTypes.Tea;
    return null;
  },
});
