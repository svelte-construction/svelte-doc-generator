import Script, { ScriptSpace } from './Script';
import SvelteSource from '../base/SvelteSource';
import { SourceSpace } from '../base/Source';
import { Script as SvelteScript } from 'svelte/types/compiler/interfaces';

export namespace ComponentSpace {
  export type Config = {
    path: string;
  }

  export type ScripResult = {
    declarations: ScriptSpace.Declarations;
    start: SourceSpace.Position;
    end: SourceSpace.Position;
  }

  export type Result = {
    module: ScripResult | undefined;
    instance: ScripResult | undefined;
  }
}

export default class Component extends SvelteSource<ComponentSpace.Config> {

  public get result(): ComponentSpace.Result {
    return {
      module: this.getScriptResult(this.tree.module),
      instance: this.getScriptResult(this.tree.instance)
    };
  }

  protected getScriptResult(script: SvelteScript): ComponentSpace.ScripResult | undefined {
    if (!script) {
      return undefined;
    }

    const module = new Script({ data: script });
    return {
      declarations: module.declarations,
      start: this.getPosition(script.start),
      end: this.getPosition(script.end)
    };
  }
}
