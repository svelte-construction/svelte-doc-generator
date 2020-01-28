<script>
  import decodeSpecialChars from './../../helpers/decodeSpecialChars';
  import ComponentDeclaration from './ComponentDeclaration';
  import ComponentDescription from './ComponentDescription';
  import ComponentUsages from './ComponentUsages';
  import ComponentInitialization from './ComponentInitialization';
  import { source as sourceStore, line as lineStore } from './../../stores';

  export let title = 'Component';
  export let initialization;
  export let declaration;
  export let source;

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
      <ComponentDescription>
        <slot name="description" />
      </ComponentDescription>
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

    {#if withUsages}
      <br/>
      <br/>
      <hr/>
    {/if}

    <!-- <div class="initialization"> -->
      <!-- <ComponentInitialization {...initialization} /> -->
    <!-- </div> -->

    <div class="declaration">
      <ComponentDeclaration {...declaration} on:source={onSource} />
    </div>
  </div>
</section>
