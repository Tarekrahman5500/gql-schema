import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as GraphQLTypes from '../../graphql-types';
import { Coffee } from './coffee.entity';
@Entity()
export class Flavor implements GraphQLTypes.Flavor {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  // now join the flavors with falvor relation m-m relation
  @JoinTable()
  @ManyToMany(() => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}
