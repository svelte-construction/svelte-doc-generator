import * as path from 'path';
import resolvePackagePath from './helpers/resolvePackagePath';

export const PATH_ROOT = resolvePackagePath(__dirname);
export const PATH_TEMPLATE = path.resolve(PATH_ROOT, 'template');
