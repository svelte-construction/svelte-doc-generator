<script>
  import { Router, Route, links } from 'svelte-routing';
  import Preview from './ApplicationSource';
  import { source, line } from './../../stores';

  export let menu = [];
  export let routes = [];

  let contentEl;

  let current = window.location.pathname;
  function onNavigate(e) {
    contentEl.scrollTo({ top: 0 });
    const url = new URL(e.target.href);
    current = url.pathname;
  }
</script>

<style src="./styles.pcss">

</style>

<Router>
  <div class="documentation">
    <aside class="menu">
      <nav>
        <ul use:links class="menu__content">
          {#each menu as { path, label } (path)}
            <li class="menu__item">
              <a
                href={path}
                class="menu__link {current === path && 'active'}"
                on:click={onNavigate}>
                {label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <main class="content" bind:this={contentEl}>
      {#each routes as route}
        <Route {...route} />
      {/each}
    </main>
  </div>
</Router>

{#if $source}
  <Preview bind:source={$source} bind:line={$line} />
{/if}
