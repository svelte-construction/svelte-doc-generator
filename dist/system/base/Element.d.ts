export default abstract class Element {
    static create(config: {
        [key: string]: any;
    }): Element;
}
