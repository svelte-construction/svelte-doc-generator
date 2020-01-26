import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';
import Base from '../base/Base';
import FunctionExport, { FunctionExportSpace } from '../exports/FunctionExport';
import VariableExport, { VariableExportSpace } from '../exports/VariableExport';
import ClassExport, { ClassExportSpace } from '../exports/ClassExport';
import { ExportType } from '../types/ExportType';
export declare namespace ScriptSpace {
    type Config = {
        data: SvelteScript;
    };
    type Declarations = {
        variables: {
            [key: string]: VariableExportSpace.Result;
        };
        functions: {
            [key: string]: FunctionExportSpace.Result;
        };
        classes: {
            [key: string]: ClassExportSpace.Result;
        };
    };
}
export default class Script extends Base<ScriptSpace.Config> {
    data: SvelteScript;
    get exports(): ExportType[];
    get variables(): VariableExport[];
    get functions(): FunctionExport[];
    get classes(): ClassExport[];
    get declarations(): ScriptSpace.Declarations;
    private static filterExports;
    private static collectExports;
}
