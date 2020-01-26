import { Script as SvelteScript, TemplateNode, Var } from 'svelte/types/compiler/interfaces';
import SvelteSource from '../base/SvelteSource';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import AttributeNode from 'svelte/types/compiler/compile/nodes/Attribute';
import Documentation from '../models/Documentation';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';

export namespace BasePartialSpace {
  export type Config = {
    node: InlineComponent;
    documentation: Documentation;
  }

  export type Generated = {
    variables: Variable[];
    code: string,
  }
}

export default abstract class BasePartial<C> extends SvelteSource<BasePartialSpace.Config & C> {

  public static alias: string;

  public node: InlineComponent;

  public documentation: Documentation;

  public get start() {
    return this.node.start;
  }

  public get end() {
    return this.node.end;
  }

  public get code(): string {
    if (!this.node.children.length) {
      return '';
    }

    const start = this.node.children[0].start;
    const end = this.node.children[this.node.children.length - 1].end;
    return this.source.substr(start, end - start);
  }

  public generate(): BasePartialSpace.Generated {
    return {
      variables: [],
      code: this.tag(this.code)
    };
  }

  public tag(content: string = '', customAttributes: Attribute[] = []): string {
    const sourceAttributesCompiled = this.node.attributes
      .map((attribute) => this.extractNativeAttribute(attribute.name));
    const customAttributesCompiled = customAttributes
      .map((attribute) => attribute.raw);

    const attributesString = [
      ...sourceAttributesCompiled,
      ...customAttributesCompiled
    ].join(' ');

    return content
      ? `<${this.node.name} ${attributesString}>${content}</${this.node.name}>`
      : `<${this.node.name} ${attributesString} />`;
  }

  public extractNativeAttribute(name: string) {
    const attribute = this.getNativeAttribute(name);
    if (!attribute) {
      return undefined;
    }

    return this.source
      .substr(attribute.start, attribute.end - attribute.start);
  }

  public getNativeAttribute(name: string): AttributeNode | undefined {
    return this.node.attributes
      .find((attribute) => attribute.name === name);
  }

  public getNativeAttributeAsString(name: string) {
    const attribute = this.getNativeAttribute(name) as any;
    return attribute && attribute.value && attribute.value.length
      ? attribute.value[0].data : undefined;
  }
}
