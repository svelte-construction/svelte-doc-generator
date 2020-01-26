import Component from './Component';
import SvelteSource from '../base/SvelteSource';
import Package from './Package';
import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import { PartialType } from '../types/PartialType';
import Variable from './Variable';
export declare namespace DocumentationSpace {
    type Config = {
        package: Package;
        component: Component;
    };
}
export default class Documentation extends SvelteSource<DocumentationSpace.Config> {
    package: Package;
    component: Component;
    get title(): string | undefined;
    get main(): MainPartial | undefined;
    get usages(): UsagePartial[];
    get partials(): PartialType[];
    apply(replacement: PartialType): Variable[];
    define(variables: Variable[]): void;
    private static findComponentByTagsInHtml;
    private static resolveTags;
    private static resolveTagsFromScript;
    private static resolveRelativeImportsFromScript;
    private static resolveTagNodes;
    private static resolveTagNode;
}
