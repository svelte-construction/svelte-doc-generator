import BasePartial from './BasePartial';

export namespace UsagePartialSpace {
  export type Config = {}
}

export default class UsagePartial extends BasePartial<UsagePartialSpace.Config> {

  public static get alias(): string {
    return 'Component.Usage';
  }
}
