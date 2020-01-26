<script>
  export let title;
  export let visible = false;
</script>

<style src="./styles.pcss">

</style>

<div class="component-classes">
  <div class="title">{title}</div>

  {#if visible}
    <slot />
  {:else}
    <div class="alert alert-secondary" role="alert">
      There is no exported definitions for this context.
    </div>
  {/if}
</div>
