
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CoffeeCreateInput {
    name: string;
    brand: string;
    flavors: string[];
}

export class CoffeeUpdateInput {
    name?: Nullable<string>;
    brand?: Nullable<string>;
    flavors?: Nullable<string[]>;
}

export interface Drink {
    name: string;
}

export class Coffee implements Drink {
    id: number;
    name: string;
    brand: string;
    flavors?: Nullable<Flavor[]>;
    createdAt?: Nullable<Date>;
}

export class Tea implements Drink {
    name: string;
}

export class Flavor {
    id: number;
    name: string;
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee?: Nullable<Coffee>;
    drinks: Drink[];
}

export abstract class IMutation {
    coffeeCreate?: Coffee;
    coffeeUpdate?: Coffee;
}

export abstract class ISubscription {
    coffeeAdded: Coffee;
}

export type DrinksUnion = Coffee | Tea;
type Nullable<T> = T | null;
