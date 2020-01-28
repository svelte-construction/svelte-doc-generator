export default class Base<C> extends Object {

  public configure(config: C): this {
    if (config) {
      for (const name in config) {
        if (typeof config[name] !== 'undefined') {
          (this as any)[name] = config[name];
        }
      }
    }

    return this;
  }
};
