<script>
  import { createEventDispatcher } from 'svelte';
  import MarkdownIt from 'markdown-it';

  const dispatch = createEventDispatcher();
  const md = new MarkdownIt();

  export let type;
  export let title;
  export let data = [];

  function onClickDefinition(e) {
    e.preventDefault();
    const line = parseInt(e.target.dataset.line, 10);
    dispatch('source', { line });
  }
</script>

<style src="./styles.pcss">

</style>

<div class="component-variables-table">
  <div class="title">{title} <kbd>export {type}</kbd></div>
  <div class="content">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
          <th scope="col">Note</th>
        </tr>
      </thead>

      <tbody>
        {#each data as item}
          <tr>
            <td scope="row">
              <kbd>{item.name}</kbd>
              (<a href="/" on:click={onClickDefinition} data-line={item.location.start.line}>definitions</a>)
            </td>
            <td><code>{typeof item.default}</code></td>
            <td><code>{JSON.stringify(item.default)}</code></td>
            <td>{@html md.render(item.description || '')}</td>
            <td>{@html md.render(item.note || '')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
