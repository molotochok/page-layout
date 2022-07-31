<script>
  import imgSrc from '../assets/reference.png';

  const ANIMATION_DELAY = 1;

  let img;

  export function getImageData(){
    const width = getWidth();
    const height = getHeight();

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    context.drawImage(img, 0, 0, width, height);

    return context.getImageData(0, 0, width, height);
  }

  export const getWidth = () => img.offsetWidth;
  export const getHeight = () => img.offsetHeight;

  let animationSequence = [false, false];
  let newSrc;

  export function updateCanvas(src) {
    animationSequence[0] = true;
    newSrc = src;
  }

  let animationStep = 0;
  function animationEnded() {
    animationStep++;
    
    setTimeout(function() {
      if (animationStep >= animationSequence.length)
        return;

      if (animationStep == 1)
        img.src = newSrc;

      animationSequence[animationStep] = true;
    }, ANIMATION_DELAY);
  }
</script>

<div class="reference-image"
  class:hide={animationSequence[0]}
  class:show-diff={animationSequence[1]}
  on:animationend={animationEnded}
>
  <img alt="Reference" src={imgSrc} class='img' bind:this={img}>
</div>

<style>
  .reference-image {
    overflow: auto; 
  }

  .hide {
    animation: hide 500ms ease-in-out forwards;
  }

  @keyframes hide {
		from { opacity: 100%; }
		to { opacity: 0%;}
	}

  .show-diff {
    animation: show-diff 500ms ease-in-out forwards;
  }

  @keyframes show-diff {
		from { opacity: 0%; }
		to { opacity: 100%; }
	}
</style>