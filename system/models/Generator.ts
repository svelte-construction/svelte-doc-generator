import * as fs from 'fs-extra';
import * as path from 'path';
import merge from 'deepmerge';
import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import { Ast, Script, TemplateNode } from 'svelte/types/compiler/interfaces';
import Package from './Package';
import { ImportDeclaration, ImportSpecifier } from 'estree';
import Import from '../imports/Import';
import NamespaceImport from '../imports/NamespaceImport';
import DefaultImport from '../imports/DefaultImport';
import UsagePartial from '../partials/UsagePartial';
import Documentation from './Documentation';
import Base from '../base/Base';
import resolveRelativeImports from '../helpers/resolveRelativeImports';
import Variable from './Variable';
import create from '../helpers/create';

export namespace GeneratorSpace {
  export type Config = {
    name: string;
    package: Package;
    directory: string;
    documentation: Documentation;
  }
}

export default class Generator extends Base<GeneratorSpace.Config> {

  readonly fileNameIndex = 'index.js';
  readonly fileNameDocumentation = 'Documentation.svelte';

  public name: string;

  public package: Package;

  public directory: string;

  public documentation: Documentation;

  public variables: Variable[] = [];

  public get indexPath() {
    return path.resolve(this.directory, this.fileNameIndex);
  }

  public get documentationPath() {
    return path.resolve(this.directory, this.fileNameDocumentation);
  }

  public generate() {
    // reset target documentation file if exists
    fs.writeFileSync(this.documentationPath, this.documentation.source);

    // create documentation clone from cloned file
    const path = this.documentationPath;
    const that = this.documentation.package;
    const component = this.documentation.component;
    const clone = create(Documentation).configure({ path, package: that, component });

    // rebind all imports paths and update the file
    clone.source = resolveRelativeImports(clone.source, this.documentation.path, this.documentationPath);

    // replace all partials
    // with generated source code
    // and process variables
    for (let i = 0; i < clone.partials.length; i++) {
      const variables = clone.apply(clone.partials[i]);
      this.variables = [...this.variables, ...variables];
    }

    // define variables inside the documentation
    clone.define(this.variables);

    // generate index file
    this.index();
  }

  public index() {
    const content = `import Component from './${this.fileNameDocumentation}';\n\nexport default Component;`;
    fs.writeFileSync(this.indexPath, content);
  }
}
