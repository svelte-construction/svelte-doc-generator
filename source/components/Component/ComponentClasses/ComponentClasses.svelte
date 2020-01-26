<script>
  import ComponentDefinitions from './../ComponentDefinitions';

  export let data = {};

  $: visible = Object.values(data).length;
</script>

<style src="./styles.pcss">

</style>

<div class="component-classes">
  <ComponentDefinitions title="Exported classes" {visible}>

  </ComponentDefinitions>
</div>
