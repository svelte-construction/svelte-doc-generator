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
    node: InlineComponent;
    get code(): string;
    generate(variables?: Variable[], attributes?: Attribute[]): BasePartialSpace.Generated;
    generateSlot(content: string): string;
    generateTag(customAttributes?: Attribute[]): string;
    extractNativeAttribute(name: string): string | undefined;
    getNativeAttribute(name: string): AttributeNode | undefined;
    getNativeAttributeAsString(name: string): string;
}
