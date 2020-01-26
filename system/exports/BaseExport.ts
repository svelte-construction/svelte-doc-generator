import Base from '../base/Base';
import { Declaration, ExportNamedDeclaration, Node, SourceLocation } from 'estree';
import Location from '../models/Location';

export namespace BaseExportSpace {
  export type Config = {
    data: ExportNamedDeclaration;
  }

  export type Result = {};
}

export default abstract class BaseExport<C> extends Base<BaseExportSpace.Config & C> {

  public data: ExportNamedDeclaration;

  public abstract get declaration(): Declaration;

  public abstract get name(): string;

  public abstract get result(): BaseExportSpace.Result;

  public get location(): Location {
    const data = this.data.loc as SourceLocation;
    return new Location({ data });
  }
}
