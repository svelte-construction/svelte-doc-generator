import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';
import DescriptionPartial from '../partials/DescriptionPartial';
import InitializationPartial from '../partials/InitializationPartial';

export type PartialType = UsagePartial | MainPartial | DescriptionPartial | InitializationPartial;

export type PartialClassType = typeof UsagePartial | typeof MainPartial | typeof DescriptionPartial | typeof InitializationPartial;
