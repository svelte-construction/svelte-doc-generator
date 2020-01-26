import UsagePartial from '../partials/UsagePartial';
import MainPartial from '../partials/MainPartial';

export type PartialType = UsagePartial | MainPartial;

export type PartialClassType = typeof UsagePartial | typeof MainPartial;
