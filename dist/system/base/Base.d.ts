import Element from './Element';
export default class Base<C> extends Element {
    private _defaults;
    config: C;
    constructor(config: C);
    get defaults(): C;
    set defaults(config: C);
    private configure;
}
