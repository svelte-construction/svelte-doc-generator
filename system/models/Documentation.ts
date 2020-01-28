import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import { Ast, Script, TemplateNode } from 'svelte/types/compiler/interfaces';
import Package from './Package';
import { ImportDeclaration } from 'estree';
import Import from '../imports/Import';
import NamespaceImport from '../imports/NamespaceImport';
import DefaultImport from '../imports/DefaultImport';
import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import { PartialClassType, PartialType } from '../types/PartialType';
import Variable from './Variable';
import DescriptionPartial from '../partials/DescriptionPartial';
import InitializationPartial from '../partials/InitializationPartial';
import create from '../helpers/create';
import { ImportType } from '../types/ImportType';

export namespace DocumentationSpace {
  export type Config = {
    package: Package;
    component: Component;
  }
}

const importsMap = {
  ImportSpecifier: Import,
  ImportDefaultSpecifier: DefaultImport,
  ImportNamespaceSpecifier: NamespaceImport
};

export default class Documentation extends SvelteSource<DocumentationSpace.Config> {

  public package: Package;

  public component: Component;

  public get title(): string {
    if (!this.main) {
      return '';
    }

    return this.main
      .getNativeAttributeAsString('title');
  }

  public get main(): MainPartial | undefined {
    return Documentation.resolveTagNode(this, MainPartial);
  }

  public get initialization(): MainPartial | undefined {
    return create(InitializationPartial).configure({  });
  }

  public get description(): DescriptionPartial | undefined {
    return Documentation.resolveTagNode(this, DescriptionPartial);
  }

  public get usages(): UsagePartial[] {
    return Documentation.resolveTagNodes(this, UsagePartial);
  }

  public get partials(): PartialType[] {
    const partials = [];
    this.main && partials.push(this.main);
    // TODO Implement initialization code
    // this.initialization && partials.push(this.initialization);
    this.description && partials.push(this.description);
    return [...partials, ...this.usages];
  }

  public apply(replacement: PartialType): Variable[] {
    const { variables, code } = replacement.generate();
    const prefix = this.source.substr(0, replacement.start);
    const suffix = this.source.substr(replacement.end);
    this.source = `${prefix}${code}${suffix}`;
    return variables;
  }

  public define(variables: Variable[]) {
    const variablesClone = [...variables];

    // sort variables by placeholders goes first
    variablesClone.sort((left, right) => {
      if (left.asPlaceholder && right.asPlaceholder) {
        return 0;
      } else if (left.asPlaceholder) {
        return -1;
      } else if (right.asPlaceholder) {
        return 1;
      }

      return 0;
    });

    // merge variables with the same names
    const variablesHash = variablesClone.reduce((stack: { [key: string]: Variable }, variable) => {
      if (stack[variable.name]) { // if variable with the same name already exists
        if (!stack[variable.name].asPlaceholder) {
          throw new Error(`Variable with name '${variable.name} already exists in the hash`);
        }
      }

      stack[variable.name] = variable;
      return stack;
    }, {});

    // create variables definitions string
    const definitions = Object.values(variablesHash)
      .map((variable) => `const ${variable.name} = ${JSON.stringify(variable.value)};`);

    // append definitions to the first script
    this.source = this.source
      .replace(/(<script[^>]*>)/, `$1\n  ${definitions.join('\n  ')}`);
  }

  private static findComponentByTagsInHtml(node: TemplateNode, aliases: string[]): InlineComponent[] {
    if (!aliases.length) {
      return [];
    }

    if (node.type === 'InlineComponent' && aliases.includes(node.name)) {
      return [node as InlineComponent];
    }

    if (node.children) {
      let nodes: InlineComponent[] = [];
      for (const child of node.children) {
        nodes = [...nodes, ...Documentation.findComponentByTagsInHtml(child, aliases)];
      }

      return nodes;
    }

    return [];
  }

  private static resolveTags(that: Package, tree: Ast, name: string): string[] {
    const namePath = name.split('.');
    const moduleTags = Documentation.resolveTagsFromScript(that, tree.module, namePath);
    const instanceTags = Documentation.resolveTagsFromScript(that, tree.instance, namePath);
    return [...moduleTags, ...instanceTags];
  }

  private static resolveTagsFromScript(that: Package, script: Script, namePath: string[]): string[] {
    const importDeclarations = this.resolveRelativeImportsFromScript(script);
    const selfImportDeclarations = importDeclarations.filter((node) => node.source.value === that.name);

    let tags: string[] = [];
    for (const selfImportDeclaration of selfImportDeclarations) {
      for (const specifier of selfImportDeclaration.specifiers) {
        const model = (importsMap[specifier.type] as any) as ImportType;
        const instance = create(model).configure({ script, specifier: specifier as any });
        tags = [...tags, ...instance.resolveTags(namePath)];
      }
    }

    return tags;
  }

  private static resolveRelativeImportsFromScript(script: Script): ImportDeclaration[] {
    if (!script) {
      return [];
    }

    return script.content.body.filter((node) => node.type === 'ImportDeclaration') as ImportDeclaration[];
  }

  private static resolveTagNodes(documentation: Documentation, partial: PartialClassType): PartialType[] {
    const tags = Documentation.resolveTags(documentation.package, documentation.tree, partial.alias);
    const nodes = Documentation.findComponentByTagsInHtml(documentation.tree.html, tags);
    return nodes.map((node) => create(partial).configure({ path: documentation.path, node, documentation: documentation }));
  }

  private static resolveTagNode(documentation: Documentation, partial: PartialClassType): PartialType | undefined {
    const partials = Documentation.resolveTagNodes(documentation, partial);

    if (partials.length > 1) {
      throw new Error(`There should be only one declaration component usage inside the documentation file (${documentation.path})`);
    } else if (!partials.length) {
      return undefined;
    }

    return partials[0];
  }
}
