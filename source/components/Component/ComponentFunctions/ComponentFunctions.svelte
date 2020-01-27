<script>
  import { createEventDispatcher } from 'svelte';
  import MarkdownIt from 'markdown-it';
  import ComponentDefinitions from './../ComponentDefinitions'

  const dispatch = createEventDispatcher();
  const md = new MarkdownIt;

  export let data = {};

  function resolveFunctionArgumentLabel(argument) {
    const suffix = typeof argument.default !== 'undefined'
      ? ` = ${JSON.stringify(argument.default)}` : '';
    return `${argument.name}${suffix}`;
  }

  function onClickDefinition(e) {
    e.preventDefault();
    const line = parseInt(e.target.dataset.line, 10);
    dispatch('source', { line });
  }

  $: mapped = Object.keys(data).map((name) => ({ name, ...data[name] }));
  $: sorted = mapped.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
</script>

<style src="./styles.pcss">

</style>

<div class="component-functions">
  <ComponentDefinitions title="Exported functions" visible={sorted.length}>
    <div class="content">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Arguments</th>
              <th scope="col">Description</th>
              <th scope="col">Note</th>
            </tr>
          </thead>

          <tbody>
            {#each sorted as item}
              <tr>
                <td scope="row">
                  <kbd>{item.name}</kbd>
                  (<a href="#" on:click={onClickDefinition} data-line={item.location.start.line}>declaration</a>)
                </td>
                <td>
                  {#each item.arguments as argument}
                    <kbd>{@html resolveFunctionArgumentLabel(argument)}</kbd>&nbsp;
                  {/each}
                </td>
                <td>{@html md.render(item.description || '')}</td>
                <td>{@html md.render(item.note || '')}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
  </ComponentDefinitions>
</div>
