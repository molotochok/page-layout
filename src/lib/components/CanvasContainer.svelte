<script lang='ts'>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let canvasContainer;
  let animationSteps = [
    {
      active: false,
      startDelayMs: 0,
      action: () => dispatch('shown')
    },
    {
      active: false,
      startDelayMs: 500,
      action: () => dispatch('moved')
    },
    {
      active: false,
      startDelayMs: 125,
      action: () => {
        canvasContainer.style.display = 'none';
        dispatch('hid');
      }
    }
  ];
  let animationIndex = 0;

  export function update(width, height, canvas) {
    canvasContainer.style.width = `${width}px`;
    canvasContainer.style.height = `${height}px`;
    
    const img = document.createElement('img');
    img.src = canvas.toDataURL();

    canvasContainer.appendChild(img);
  }

  export function animate() {
    animationIndex = 0;
    processAnimation();
  }

  function processAnimation() {
    if(animationIndex < 0 || animationIndex >= animationSteps.length) 
      return;

    const step = animationSteps[animationIndex];

    setTimeout(function() {
      if(animationIndex > 0) {
        animationSteps[animationIndex - 1].active = false;
      }
      
      animationSteps[animationIndex].active = true;
    }, step.startDelayMs);
  }

  function animationEnded() {
    if(animationIndex < 0 || animationIndex >= animationSteps.length) 
      return;

    const step = animationSteps[animationIndex];
    step.action();

    animationIndex++;
    processAnimation();
  }
</script>

<div class="canvas-container"
  bind:this={canvasContainer}
  class:show="{animationSteps[0].active}"
  class:move="{animationSteps[1].active}"
  class:hide="{animationSteps[2].active}"
  on:animationend={animationEnded}
>
</div>

<style>
  .canvas-container {
    overflow: auto;
    position: absolute;
    top: 1rem;
    opacity: 0;
  }

  .show {
    animation: show 1s ease-in-out forwards;
  }

  @keyframes show {
		from { opacity: 0%; }
		to { opacity: 100%; }
	}

  .move {
    animation: move 1.5s ease-in-out forwards;
  }

  @keyframes move {
		from {
      left: 1rem;
      opacity: 100%;
		}
		
		to {
      left: calc(100% - 1rem);
      transform: translateX(-100%);
      opacity: 50%;
		}
	}

  .hide {
    animation: hide 1s ease-in-out forwards;
  }

  @keyframes hide {
		from {
      opacity: 50%;
      right: 1rem;
		}
		
		to {
      opacity: 100%;
      right: 1rem;
		}
	}
</style>