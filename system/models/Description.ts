import { Declaration, ExportNamedDeclaration, Node } from 'estree';
import { Script as SvelteScript, Var } from 'svelte/types/compiler/interfaces';
import Base from '../base/Base';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import { BaseExportSpace } from '../exports/BaseExport';
import { ExportResultType } from '../types/ExportResultType';

export namespace DescriptionSpace {
  export type Config = {
    data: Data;
  }

  export type Data = {
    type: string;
    value: string;
  }
}

export default class Description extends Base<DescriptionSpace.Config> {

  public data: DescriptionSpace.Data;

  public get markdown(): string {
    return this.data.value
      // remove trailing stars
      .replace(/^\*+/, '')
      .replace(/\*+$/, '')
      .replace(/\n\*/g, '\n')
      // remove trailing new lines
      .replace(/^\n+/, '')
      .replace(/\n+$/, '')
      // remove trailing spaces before every line
      .replace(/\n\s+/g, '\n')
      // remove trailing spaces
      .trim();
  }
}
