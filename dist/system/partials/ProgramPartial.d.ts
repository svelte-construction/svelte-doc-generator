import BasePartial from './BasePartial';
import { Program } from 'estree';
export declare namespace ProgramPartialSpace {
    type Config = {
        node: Program;
    };
}
export default abstract class ProgramPartial<C> extends BasePartial<ProgramPartialSpace.Config & C> {
}
