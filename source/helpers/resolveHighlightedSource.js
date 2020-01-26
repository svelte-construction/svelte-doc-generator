import hljs from 'highlight.js';

// import highlight styles
import 'highlight.js/styles/atom-one-dark.css';

export default function resolveHighlightedSource(source) {
  const highlighted = hljs.highlight('html', source).value;
  return highlighted.split('\n').map((line) => {
    const match = line.match(/^([\t\s]*)(.*?)$/);
    const indent = match[1].length;
    const source = match[2];
    return { indent, source };
  });
}
