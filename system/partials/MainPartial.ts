import BasePartial, { BasePartialSpace } from './BasePartial';
import encodeSpecialChars from '../helpers/encodeSpecialChars';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';

export namespace MainPartialSpace {
  export type Config = {}
}

export default class MainPartial extends BasePartial<MainPartialSpace.Config> {

  public static get alias(): string {
    return 'Component';
  }

  public generate(): BasePartialSpace.Generated {
    const source = encodeSpecialChars(this.documentation.component.source);
    const declaration = this.documentation.component.result;

    const sourceVariable = new Variable({ value: source });
    const declarationVariable = new Variable({ value: declaration });

    const attributes = [
      new Attribute({ name: 'source', value: sourceVariable }),
      new Attribute({ name: 'declaration', value: declarationVariable }),
    ];

    return {
      variables: [sourceVariable, declarationVariable],
      code: this.tag(this.code, attributes)
    };
  }
}
