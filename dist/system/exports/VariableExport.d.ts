import BaseExport from './BaseExport';
import { VariableDeclaration, VariableDeclarator } from 'estree';
import Description from '../models/Description';
import { LocationSpace } from '../models/Location';
export declare namespace VariableExportSpace {
    type Config = {};
    type Result = {
        default: any;
        constant: boolean;
        description: string | false;
        note: string | false;
        location: LocationSpace.Result;
    };
}
export default class VariableExport extends BaseExport<VariableExportSpace.Config> {
    get declaration(): VariableDeclaration;
    get declarator(): VariableDeclarator;
    get kind(): string;
    get constant(): boolean;
    get name(): string;
    get default(): any;
    get description(): Description | false;
    get note(): Description | false;
    get result(): VariableExportSpace.Result;
}
