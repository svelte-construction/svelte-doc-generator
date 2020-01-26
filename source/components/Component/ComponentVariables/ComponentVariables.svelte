<script>
  import ComponentDefinitions from './../ComponentDefinitions';
  import ComponentVariablesTable from './ComponentVariablesTable';

  export let data = {};

  $: mapped = Object.keys(data).map((name) => ({ name, ...data[name] }));
  $: sorted = mapped.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  $: constants = mapped.filter((value) => value.constant);
  $: changable = mapped.filter((value) => !value.constant);
</script>

<style src="./styles.pcss">

</style>

<div class="component-variables">
  <ComponentDefinitions title="Exported variables" visible={constants.length || changable.length}>
    {#if constants.length}
      <ComponentVariablesTable type="const" title="Constants" data={constants} on:source />
    {/if}

    {#if constants.length && changable.length}
      <br/>
    {/if}

    {#if changable.length}
      <ComponentVariablesTable type="let" title="Changable" data={changable} on:source />
    {/if}
  </ComponentDefinitions>
</div>
