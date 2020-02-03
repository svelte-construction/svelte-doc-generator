export default abstract class Element {

  public static create(config: { [key: string]: any }): Element {
    throw new ReferenceError('Not implemented yet');
  };
};
