import BasePartial, { BasePartialSpace } from './BasePartial';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
import { DOCUMENTATION_VARIABLE_INITIALIZATION } from '../constants';

export namespace MainPartialSpace {
  export type Config = {}
}

export default class MainPartial extends BasePartial<MainPartialSpace.Config> {

  public static get alias(): string {
    return 'Component';
  }

  public generate(variables: Variable[] = [], attributes: Attribute[] = [], withContent: boolean = true): BasePartialSpace.Generated {
    // use global name to pass initialization attribute to the component
    const initializationVariable = new Variable({ name: DOCUMENTATION_VARIABLE_INITIALIZATION, value: undefined, asPlaceholder: true });
    const initializationAttribute = new Attribute({ name: 'initialization', value: initializationVariable });

    const declaration = this.documentation.component.result;
    const declarationVariable = new Variable({ value: declaration });
    const declarationAttribute = new Attribute({ name: 'declaration', value: declarationVariable });

    return super.generate(
      [...variables, initializationVariable, declarationVariable],
      [...attributes, initializationAttribute, declarationAttribute]
    );
  }
}
