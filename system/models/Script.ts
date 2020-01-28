import { Declaration, ExportNamedDeclaration, Node } from 'estree';
import { Script as SvelteScript, Var } from 'svelte/types/compiler/interfaces';
import Base from '../base/Base';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
import { BaseExportSpace } from '../exports/BaseExport';
import { ExportResultType } from '../types/ExportResultType';
import SvelteSource from '../base/SvelteSource';
import Component from './Component';
import { SourceSpace } from '../base/Source';
import create from '../helpers/create';

export namespace ScriptSpace {
  export type Config = {
    data: SvelteScript;
  }

  export type Declarations = {
    variables: { [key: string]: VariableExportSpace.Result; };
    functions: { [key: string]: FunctionExportSpace.Result; };
    classes: { [key: string]: ClassExportSpace.Result; };
  }
}

const declarationsToModels = {
  VariableDeclaration: VariableExport,
  FunctionDeclaration: FunctionExport,
  ClassDeclaration: ClassExport
};

export default class Script extends Base<ScriptSpace.Config> {

  public data: SvelteScript;

  public get exports(): ExportType[] {
    if (!this.data.content || !this.data.content.body) {
      return [];
    }

    const exports: ExportNamedDeclaration[] = this.data.content.body
      .filter((node: Node) => node.type === 'ExportNamedDeclaration') as any[];

    const filtered = exports.filter((node) => node.declaration);

    return filtered.map((node): ExportType => {
      const declaration = node.declaration as Declaration;
      const model = declarationsToModels[declaration.type];
      return create(model).configure({ data: node });
    });
  }

  public get variables(): VariableExport[] {
    return Script.filterExports(this.exports, VariableExport) as VariableExport[];
  }

  public get functions(): FunctionExport[] {
    return Script.filterExports(this.exports, FunctionExport) as FunctionExport[];
  }

  public get classes(): ClassExport[] {
    return Script.filterExports(this.exports, ClassExport) as ClassExport[];
  }

  get declarations(): ScriptSpace.Declarations {
    return {
      variables: Script.collectExports(this.variables) as { [key: string]: VariableExportSpace.Result; },
      functions: Script.collectExports(this.functions) as { [key: string]: FunctionExportSpace.Result; },
      classes: Script.collectExports(this.classes) as { [key: string]: ClassExportSpace.Result; },
    };
  }

  private static filterExports(exports: ExportType[], type: any) {
    return exports.filter((_export) => _export instanceof type) as ExportType[];
  }

  private static collectExports(exports: ExportType[]): { [key: string]: ExportResultType; } {
    const results: { [key: string]: ExportResultType; } = {};
    for (const _export of exports) {
      results[_export.name] = _export.result;
    }

    return results;
  }
}
