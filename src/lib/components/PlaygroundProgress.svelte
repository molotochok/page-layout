<script lang='ts'>
  import { createEventDispatcher, onMount } from 'svelte';
  import ProgressSection from './ProgressSection.svelte';
  import Playground from './Playground.svelte';

  let playground, iframe;
  let isProgressSectionHidden: boolean = true;
  let progressSection: ProgressSection;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    setupIframe();
  });

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
    event.detail.iframe = iframe;
    dispatch('finish', event.detail);
  }

  function getIframeBody() {
    return iframe.contentWindow.document.body;
  }

  function setupIframe() {
    const iframeBody = getIframeBody();
    iframeBody.style.margin = 0;
    iframeBody.style.padding = 0;
  }
</script>
  
<div class='playground-progress'>
  <div class:hidden="{isProgressSectionHidden}" class="h-100p">
    <ProgressSection bind:this={progressSection}></ProgressSection>
  </div> 

  <div class:hidden="{!isProgressSectionHidden}" class="h-100p">
    <Playground bind:this={playground} on:finish={finished}></Playground>
  </div>

  <iframe title="iframe" bind:this={iframe} class="iframe">
  </iframe>
</div>
  
<style>
  .iframe {
    visibility: hidden; 
    position: absolute; 
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
  }

  .playground-progress {
    position: relative;
  }
</style>