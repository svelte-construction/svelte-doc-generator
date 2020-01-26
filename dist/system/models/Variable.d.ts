import Base from '../base/Base';
export declare namespace VariableSpace {
    type Config = {
        value: any;
    };
}
export default class Variable extends Base<VariableSpace.Config> {
    private _name;
    value: any;
    get name(): string;
}
