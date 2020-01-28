export default interface BaseInterface {
    configure(config: {
        [key: string]: any;
    }): void;
}
