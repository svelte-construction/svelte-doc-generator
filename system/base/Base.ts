export default class Base<C> {

  public constructor(config: C) {
    this.configure(config);
  }

  public configure(config: C): void {
    if (config) {
      for (const name in config) {
        if (typeof config[name] !== 'undefined') {
          (this as any)[name] = config[name];
        }
      }
    }
  }
};
