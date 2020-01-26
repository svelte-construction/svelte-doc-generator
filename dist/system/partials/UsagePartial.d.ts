import BasePartial, { BasePartialSpace } from './BasePartial';
export declare namespace UsagePartialSpace {
    type Config = {};
}
export default class UsagePartial extends BasePartial<UsagePartialSpace.Config> {
    static get alias(): string;
    generate(): BasePartialSpace.Generated;
}
