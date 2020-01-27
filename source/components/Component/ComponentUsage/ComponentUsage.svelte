<script>
  import decodeSpecialChars from './../../../helpers/decodeSpecialChars';
  import Source from './../../Source';
  import { COMPONENT_USAGE_THEME_LIGHT, COMPONENT_USAGE_ACCEPTABLE_THEMES } from './consntants';

  export let title = 'Usage example';
  export let badge = false;
  export let theme = COMPONENT_USAGE_THEME_LIGHT;
  export let source = '';
  export let padding = true;
  export let overflow = true;

  if (!COMPONENT_USAGE_ACCEPTABLE_THEMES.includes(theme)) {
    console.error(`Invalid theme '${theme}' passed: should be ${COMPONENT_USAGE_ACCEPTABLE_THEMES.join(' or ')}`);
  }

  $: badgeCompiled = badge ? `<span class="badge badge-secondary badge-dark">${badge}</span>` : '';
  $: decoded = decodeSpecialChars(source);
</script>

<style src="./styles.pcss">

</style>

<section class="component-usage">
  <div class="title">{title} {@html badgeCompiled}</div>

  <div class="content">
    <div class="preview theme_{theme}" class:with-padding={padding} class:with-overflow={overflow}>
      <slot />
    </div>

    {#if decoded}
      <div class="source">
        <Source source={decoded} />
      </div>
    {/if}
  </div>
</section>
