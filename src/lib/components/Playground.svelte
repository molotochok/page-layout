<script lang='ts'>
  import { createEventDispatcher } from 'svelte';

  import Editor from './Editor.svelte';
  import ConfirmButton from './ConfirmButton.svelte';

  let playground;
  let htmlEditor;
  let cssEditor;

  const dispatch = createEventDispatcher();

  export function getWidth() {
    return playground.offsetWidth;
  }

  export function getHeight() {
    return playground.offsetHeight;
  }

  function confirmClicked() {
    dispatch('finish', {
      html: htmlEditor.getValue(), 
      css: cssEditor.getValue()
    });
  }
</script>
  
<div class='playground' bind:this={playground}>
  <Editor language='html' defaultText='<div class="kek"></div>' bind:this={htmlEditor} />
  <Editor language='css' defaultText=".kek {'{'}background-color: yellow;width: 100px;height: 100px;{'}'}" bind:this={cssEditor} />
  <ConfirmButton on:click={confirmClicked}/>
</div>
  
<style>
  .playground {
    height: 100%;
  }
</style>