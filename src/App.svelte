<script lang='ts'>
  import ReferenceImage from './lib/ReferenceImage.svelte';
  import { ImageProcessor } from './lib/services/image-processor';

  import CanvasContainer from './lib/components/CanvasContainer.svelte';
  import PlaygroundProgress from './lib/components/PlaygroundProgress.svelte';
  
  const imageProcessor: ImageProcessor = new ImageProcessor();
  
  let reference, canvasContainer, playground, difference;

  function addCanvasToDom(canvas) {
    const width = playground.getWidth();
    const height = playground.getHeight();

    canvasContainer.update(width, height, canvas);
  }

  async function compare(data) {
    const width = reference.getWidth();
    const height = reference.getHeight();

    const canvas = await imageProcessor.generateCanvas(data);
    console.log(canvas.toDataURL());
    addCanvasToDom(canvas);

    difference = imageProcessor.compare(
      canvas.getContext('2d').getImageData(0, 0, width, height), 
      reference.getImageData(), 
      width, 
      height
    );

    canvasContainer.animate();
  }

  function canvasContainerShown() {
    if(!difference) return;
    playground.hide(difference.quality);
  }

  function canvasContainerHid() {
    if(!difference) return;
    playground.updateProgress(difference.quality);
  }

  function canvasContainerMoved() {
    if(!difference) return;
    reference.updateCanvas(difference.src);
  }
</script>

<main class="main">
  <PlaygroundProgress on:finish={compare} bind:this={playground}/>
  <ReferenceImage bind:this={reference}/> 

  <CanvasContainer 
    bind:this={canvasContainer} 
    on:shown={canvasContainerShown}
    on:hid={canvasContainerHid}
    on:moved={canvasContainerMoved}
  />
</main>

<style>
  .main {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: space-between;
    grid-column-gap: 1.4rem;
    height: 100vh;
    padding: 1rem 2.5rem 1rem 1rem;
  }
</style>
