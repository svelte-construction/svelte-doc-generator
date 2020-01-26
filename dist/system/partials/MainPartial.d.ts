import BasePartial, { BasePartialSpace } from './BasePartial';
export declare namespace MainPartialSpace {
    type Config = {};
}
export default class MainPartial extends BasePartial<MainPartialSpace.Config> {
    static get alias(): string;
    generate(): BasePartialSpace.Generated;
}
