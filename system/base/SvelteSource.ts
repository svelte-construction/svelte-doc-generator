import { parse } from 'svelte/compiler';
import { Ast } from 'svelte/types/compiler/interfaces';
import Source from './Source';

export namespace SvelteComponentSpace {
  export type Config = {}
}

export default abstract class SvelteSource<C> extends Source<SvelteComponentSpace.Config & C> {

  private _tree?: Ast;

  public get tree(): Ast {
    if (!this._tree) {
      try {
        this._tree = parse(this.source);
      } catch(error) {
        error.message = `Unable to parse svelte component '${this.path}' with an error '${error.message}'`;
        throw error;
      }
    }

    return this._tree;
  }

  public reset() {
    super.reset();
    delete this._tree;
  }
}
