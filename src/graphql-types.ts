
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

export class Coffee {
    id: number;
    name: string;
    brand: string;
    flavors?: Nullable<Flavor[]>;
}

export class Flavor {
    id: number;
    name: string;
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee?: Nullable<Coffee>;
}

export abstract class IMutation {
    coffeeCreate?: Coffee;
    coffeeUpdate?: Coffee;
}

type Nullable<T> = T | null;
