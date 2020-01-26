<script>
  import {convertCodeToComponent} from 'svelte-doc-generator/helpers';
  import library from './../library';

  export let code;

  $: component = ((code) => {
    const name = convertCodeToComponent(code);
    return library.find((item) => item.name === name).component;
  })(code);
</script>

<svelte:component this={component} />
