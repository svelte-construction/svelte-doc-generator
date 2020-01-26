<script>
  import ComponentContext from '../ComponentContext';
  import isDeclarationContext from './../../../helpers/isDeclarationContext';

  export let title = 'Component declaration';
  export let module;
  export let instance;
</script>

<style src="./styles.pcss">

</style>

<div class="component-declaration">
  <div class="title">{title}</div>

  <ComponentContext type="module" title="Module context" {...module} on:source />

  {#if module && instance}
    <br/>
  {/if}

  <ComponentContext type="instance" title="Instance context" {...instance} on:source />
</div>
