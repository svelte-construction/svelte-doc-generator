import * as fs from 'fs';
import DOMParser from 'dom-parser';
import { parse } from 'svelte/compiler';
import { Ast } from 'svelte/types/compiler/interfaces';
import SvelteSourceInterface from '../interfaces/SvelteSourceInterface';
import Source from './Source';

export namespace SvelteComponentSpace {
  export type Config = {}
}

export default abstract class SvelteSource<C> extends Source<SvelteComponentSpace.Config & C> implements SvelteSourceInterface {

  private _tree?: Ast;

  public get tree(): Ast {
    if (!this._tree) {
      this._tree = parse(this.source);
    }

    return this._tree;
  }

  public reset() {
    super.reset();
    delete this._tree;
  }
}
