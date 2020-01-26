import Base from '../base/Base';
import BaseExport, { BaseExportSpace } from './BaseExport';
import {
  FunctionDeclaration,
  Identifier,
  Literal,
  SourceLocation,
  VariableDeclaration,
  VariableDeclarator
} from 'estree';
import Description from '../models/Description';
import Location, { LocationSpace } from '../models/Location';

export namespace VariableExportSpace {
  export type Config = {};

  export type Result = {
    default: any;
    constant: boolean;
    description: string | false;
    note: string | false;
    location: LocationSpace.Result;
  };
}

export default class VariableExport extends BaseExport<VariableExportSpace.Config> {

  public get declaration(): VariableDeclaration {
    return this.data.declaration as VariableDeclaration;
  }

  public get declarator(): VariableDeclarator {
    return this.declaration.declarations[0] as VariableDeclarator;
  }

  public get kind(): string {
    return this.declaration.kind;
  }

  public get constant(): boolean {
    return this.kind === 'const';
  }

  public get name(): string {
    return (this.declarator.id as Identifier).name;
  }

  public get default(): any {
    if (!this.declarator.init) {
      return undefined;
    }

    return (this.declarator.init as Literal).value;
  }

  public get description(): Description | false {
    if (!this.data.leadingComments) {
      return false;
    }

    const data = this.data.leadingComments[0];
    return new Description({ data });
  }

  public get note(): Description | false {
    if (!this.declaration.trailingComments) {
      return false;
    }

    const data = this.declaration.trailingComments[0];
    return new Description({ data });
  }

  public get result(): VariableExportSpace.Result {
    return {
      default: this.default,
      constant: this.constant,
      description: this.description && this.description.markdown,
      note: this.note && this.note.markdown,
      location: this.location.result
    };
  }
}
