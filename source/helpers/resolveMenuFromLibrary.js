import convertCamelToCode from './convertCamelToCode';

export default function resolveMenuFromLibrary(index, basePath = '/') {
  return index.map(({name, title}) => ({
    path: basePath + convertCamelToCode(name) + '/',
    label: title,
  }));
}
