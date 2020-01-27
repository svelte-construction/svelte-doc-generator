import convertCamelToCode from './convertCamelToCode';

export default function resolveMenuFromLibrary(index, basePath = '/') {
  const menu = index.map(({ name, title }) => ({
    path: basePath + convertCamelToCode(name) + '/',
    label: title,
  }));

  menu.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));

  return menu;
}
