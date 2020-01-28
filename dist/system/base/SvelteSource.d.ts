import { Ast } from 'svelte/types/compiler/interfaces';
import Source from './Source';
export declare namespace SvelteComponentSpace {
    type Config = {};
}
export default abstract class SvelteSource<C> extends Source<SvelteComponentSpace.Config & C> {
    private _tree?;
    get tree(): Ast;
    reset(): void;
}
