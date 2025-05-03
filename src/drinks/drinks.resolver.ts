import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';

@Resolver('Drink') // IMPORTANT: resolver target is the interface or abstract type
export class DrinksResolver {
  @Query('drinks')
  findAll(): GraphQLTypes.Drink[] {
    const coffee = new GraphQLTypes.Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    const tea = new GraphQLTypes.Tea();
    tea.name = 'Lipton';

    return [coffee, tea];
  }

  @ResolveField('__resolveType') // Special field for schema-first mode
  resolveType(obj: GraphQLTypes.Drink): string | null {
    if ('brand' in obj) return 'Coffee';
    if ('name' in obj && !('brand' in obj)) return 'Tea';
    return null;
  }
}
