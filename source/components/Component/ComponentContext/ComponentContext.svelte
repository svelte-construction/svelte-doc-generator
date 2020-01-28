<script>
  import { createEventDispatcher } from 'svelte';
  import ComponentVariables from './../ComponentVariables';
  import ComponentFunctions from './../ComponentFunctions';
  import ComponentClasses from './../ComponentClasses';

  const dispatch = createEventDispatcher();

  export let title;
  export let type = 'instance';
  export let variables;
  export let functions;
  export let classes;
  export let start;
  export let end;

  function onSourceClick({ detail }) {
    const { line } = detail;
    dispatch('source', { line: start.line + line - 1 });
  }

  $: tag = `<script${type !== 'instance' ? ` context="${type}"` : ''} />`;
</script>

<style src="./styles.pcss">

</style>

<div class="component-declaration-context">
  <div class="title">{title}</div>
  <div class="code"><kbd>{tag}</kbd></div>

  <br/>
  <br/>
  <ComponentVariables data={variables} on:source={onSourceClick} />
  <br/>
  <ComponentFunctions data={functions} on:source={onSourceClick} />
  <br/>
  <ComponentClasses data={classes} on:source={onSourceClick} />
</div>
