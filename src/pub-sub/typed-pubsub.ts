/*
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import * as GraphQLTypes from '../graphql-types';

export type AppEvents = {
  coffeeAdded: { coffeeAdded: GraphQLTypes.Coffee };
};

export class TypedPubSub implements PubSubEngine {
  private readonly pubsub = new PubSub();

  publish<K extends keyof AppEvents>(
    trigger: K,
    payload: AppEvents[K],
  ): Promise<void> {
    return this.pubsub.publish(trigger as string, payload);
  }

  asyncIterator<K extends keyof AppEvents>(
    trigger: K,
  ): AsyncIterator<AppEvents[K]> {
    return this.pubsub.asyncIterableIterator()
    >;a
  }

  subscribe = this.pubsub.subscribe.bind(this.pubsub);
  unsubscribe = this.pubsub.unsubscribe.bind(this.pubsub);
}
*/
