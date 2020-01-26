import * as path from 'path';

export default function resolveRelativeImports(source: string, originalPath: string, targetPath: string) {
  const { dir: originalDir } = path.parse(originalPath);
  const { dir: targetDir } = path.parse(targetPath);
  const relative = path.relative(targetDir, originalDir);
  const relativeDir = path.dirname(relative);

  return source
    .replace(/(from\s*["'])(\.\/)/g, `$1${relative}/`)
    .replace(/(from\s*["'])(\.\.\/)/g, `$1${relativeDir}/`);
}
