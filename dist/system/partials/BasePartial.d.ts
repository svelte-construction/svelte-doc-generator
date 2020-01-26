import SvelteSource from '../base/SvelteSource';
import InlineComponent from 'svelte/types/compiler/compile/nodes/InlineComponent';
import AttributeNode from 'svelte/types/compiler/compile/nodes/Attribute';
import Documentation from '../models/Documentation';
import Variable from '../models/Variable';
import Attribute from '../models/Attribute';
export declare namespace BasePartialSpace {
    type Config = {
        node: InlineComponent;
        documentation: Documentation;
    };
    type Generated = {
        variables: Variable[];
        code: string;
    };
}
export default abstract class BasePartial<C> extends SvelteSource<BasePartialSpace.Config & C> {
    static alias: string;
    node: InlineComponent;
    documentation: Documentation;
    get start(): number;
    get end(): number;
    get code(): string;
    generate(): BasePartialSpace.Generated;
    tag(content?: string, customAttributes?: Attribute[]): string;
    extractNativeAttribute(name: string): string | undefined;
    getNativeAttribute(name: string): AttributeNode | undefined;
    getNativeAttributeAsString(name: string): any;
}
