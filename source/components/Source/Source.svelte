<script>
  import resolveHighlightedSource from './../../helpers/resolveHighlightedSource';

  export let source;
  export let line;
  export let lang = 'html';

  function getLineIndent(count) {
    return '&nbsp;&nbsp;'.repeat(count);
  }

  function isActiveLine(index) {
    return line === index + 1;
  }

  $: lines = resolveHighlightedSource(source, lang);
</script>

<style src="./styles.pcss">

</style>

<div class="bootstrap code">
  <div class="numbers">
    {#each lines as {indent, source}, index}
      <div class="number" class:active={isActiveLine(index)}>{index + 1}</div>
    {/each}
  </div>

  <div class="lines">
    {#each lines as {indent, source}, index}
      <div class="line" class:active={isActiveLine(index)} class:empty={!source} data-line="true" data-number={index + 1}>
        {@html getLineIndent(indent)}{@html source}
      </div>
    {/each}
  </div>
</div>
