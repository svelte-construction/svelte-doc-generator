import { Ast } from 'svelte/types/compiler/interfaces';
export default interface SvelteSourceInterface {
    path?: string;
    tree?: Ast;
}
