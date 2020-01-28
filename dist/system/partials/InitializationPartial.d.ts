import BasePartial, { BasePartialSpace } from './BasePartial';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
export declare namespace InitializationPartialSpace {
    type Config = {};
}
export default class InitializationPartial extends BasePartial<InitializationPartialSpace.Config> {
    static get alias(): string;
    generate(variables?: Variable[], attributes?: Attribute[]): BasePartialSpace.Generated;
}
