<script>
  import { Application } from 'svelte-doc-generator';
  import { resolveMenuFromLibrary } from 'svelte-doc-generator/helpers';
  import ComponentPage from './pages/ComponentPage.svelte';
  import DefaultPage from './pages/DefaultPage.svelte';
  import library from './library';
  import { URI_TO_COMPONENTS } from './constants';

  const menu = [
    { path: '/', label: 'Home' },
    ...resolveMenuFromLibrary(library, `${URI_TO_COMPONENTS}/`)
  ];

  const routes = [
    {path: `${URI_TO_COMPONENTS}/:code/`, component: ComponentPage },
    {path: '/', component: DefaultPage },
  ];
</script>

<Application {menu} {routes} />
