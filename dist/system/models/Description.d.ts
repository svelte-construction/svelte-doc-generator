import Base from '../base/Base';
export declare namespace DescriptionSpace {
    type Config = {
        data: Data;
    };
    type Data = {
        type: string;
        value: string;
    };
}
export default class Description extends Base<DescriptionSpace.Config> {
    data: DescriptionSpace.Data;
    get markdown(): string;
}
