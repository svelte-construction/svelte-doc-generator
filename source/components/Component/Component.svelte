<script>
  import decodeSpecialChars from './../../helpers/decodeSpecialChars';
  import ComponentDeclaration from './ComponentDeclaration';
  import ComponentUsages from './ComponentUsages';
  import { source as sourceStore, line as lineStore } from './../../stores';

  export let title = 'Component';
  export let source;
  export let declaration;

  const withDeclaration = !!declaration;
  const withDescription = !!$$props.$$slots.description;
  const withUsages = !!$$props.$$slots.usages;

  function onSource({ detail }) {
    $sourceStore = decodeSpecialChars(source);
    $lineStore = detail.line;
  }
</script>

<style src="./styles.pcss">

</style>

<section class="component">
  <div class="title">{title}</div>

  {#if withDescription}
    <div class="description">
      <slot name="description" />
    </div>
  {/if}

  <br/>
  <br/>
  <hr/>

  <div class="content">

    {#if withUsages}
      <div class="usages">
        <ComponentUsages>
          <slot name="usages" />
        </ComponentUsages>
      </div>
    {/if}

    {#if withUsages && withDeclaration}
      <br/>
      <br/>
      <hr/>
    {/if}

    {#if withDeclaration}
      <div class="declaration">
        <ComponentDeclaration {...declaration} on:source={onSource} />
      </div>
    {/if}
  </div>
</section>
