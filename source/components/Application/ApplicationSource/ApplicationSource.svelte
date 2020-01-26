<script>
  import Source from '../../Source';

  export let source;
  export let line;

  function onCloseClick(e) {
    e.preventDefault();
    source = false;
    line = false;
  }
</script>

<style src="./styles.pcss">

</style>

<div class="application-source">
  <div class="overlay" on:click={onCloseClick} />

  <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document" style="display: block;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" on:click={onCloseClick}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body content">
        <Source {source} {line} />
      </div>
    </div>
  </div>
</div>
