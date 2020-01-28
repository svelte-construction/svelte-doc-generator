<script>
  import ComponentProperties from './../ComponentProperties';

  export let data = {};

  $: visible = Object.values(data).length;
</script>

<style src="./styles.pcss">

</style>

<div class="component-classes">
  <ComponentProperties title="Exported classes" {visible}>

  </ComponentProperties>
</div>
