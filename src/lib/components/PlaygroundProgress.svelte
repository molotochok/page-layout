<script lang='ts'>
  import { createEventDispatcher } from 'svelte';
  import ProgressSection from './ProgressSection.svelte';
  import Playground from './Playground.svelte';

  let playground;
  let isProgressSectionHidden: boolean = true;
  let progressSection: ProgressSection;

  const dispatch = createEventDispatcher();

  export function getWidth() {
    return playground.getWidth();
  }

  export function getHeight() {
    return playground.getHeight();
  }

  export function hide() {
    isProgressSectionHidden = false;
  }

  export function updateProgress(value: number) {
    progressSection.updateProgress(value);
  }

  function finished(event) {
    dispatch('finish', event.detail);
  }
</script>
  
<div class='playground-progress'>
  <div class:hidden="{isProgressSectionHidden}" class="h-100p">
    <ProgressSection bind:this={progressSection}></ProgressSection>
  </div> 

  <div class:hidden="{!isProgressSectionHidden}" class="h-100p">
    <Playground bind:this={playground} on:finish={finished}></Playground>
  </div>
</div>
  
<style>
  .playground-progress {
    position: relative;
  }
</style>