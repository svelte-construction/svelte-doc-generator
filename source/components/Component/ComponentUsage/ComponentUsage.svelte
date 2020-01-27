<script>
  import decodeSpecialChars from './../../../helpers/decodeSpecialChars';
  import Source from './../../Source';

  export let title;
  export let source = '';

  $: decoded = decodeSpecialChars(source);
</script>

<style src="./styles.pcss">

</style>

<section class="component-usage">
  <div class="title">{title}</div>

  <div class="content">
    <div class="preview">
      <slot />
    </div>

    {#if decoded}
      <div class="source">
        <Source source={decoded} />
      </div>
    {/if}
  </div>
</section>
