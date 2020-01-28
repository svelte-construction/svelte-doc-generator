import BasePartial, { BasePartialSpace } from './BasePartial';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
import { DOCUMENTATION_VARIABLE_INITIALIZATION } from '../constants';
import create from '../helpers/create';

export namespace InitializationPartialSpace {
  export type Config = {}
}

export default class InitializationPartial extends BasePartial<InitializationPartialSpace.Config> {

  public static get alias(): string {
    return 'script';
  }

  public generate(variables: Variable[] = [], attributes: Attribute[] = []): BasePartialSpace.Generated {
    const source = encodeSpecialChars(this.code);
    const sourceVariable = create(Variable).configure({ name: DOCUMENTATION_VARIABLE_INITIALIZATION, value: source });
    console.log(source);
    process.exit(0);

    return {
      variables: [...variables, sourceVariable],
      code: this.generateTag()
    };
  }
}
