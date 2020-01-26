export default class Base<C> {
    constructor(config: C);
    configure(config: C): void;
}
