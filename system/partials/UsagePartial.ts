import BasePartial, { BasePartialSpace } from './BasePartial';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import encodeSvelteValue from '../helpers/encodeSvelteValue';
import resolveUniqueVariableName from '../helpers/resolveUniqueVariableName';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';

export namespace UsagePartialSpace {
  export type Config = {}
}

export default class UsagePartial extends BasePartial<UsagePartialSpace.Config> {

  public static get alias(): string {
    return 'Component.Usage';
  }

  public generate(): BasePartialSpace.Generated {
    const source = encodeSpecialChars(this.code);
    const variable = new Variable({ value: source });
    const attributes = [new Attribute({ name: 'source', value: variable })];

    return {
      variables: [variable],
      code: this.tag(this.code, attributes)
    };
  }
}
