import { ScriptSpace } from './Script';
import SvelteSource from '../base/SvelteSource';
import { SourceSpace } from '../base/Source';
import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';
export declare namespace ComponentSpace {
    type Config = {
        path: string;
    };
    type ScripResult = {
        declarations: ScriptSpace.Declarations;
        start: SourceSpace.Position;
        end: SourceSpace.Position;
    };
    type Result = {
        module: ScripResult | undefined;
        instance: ScripResult | undefined;
    };
}
export default class Component extends SvelteSource<ComponentSpace.Config> {
    get result(): ComponentSpace.Result;
    protected getScriptResult(script: SvelteScript): ComponentSpace.ScripResult | undefined;
}
