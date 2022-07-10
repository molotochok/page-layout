<script lang="ts">
  import { onMount } from 'svelte';

  let circle;
  let value: number = 24;

  const STEP = 1;
  const DELAY = 45;
  const MAX_STROKE_DASHOFFSET: number = 880;
  const SIDE: number = 300;
  const COLOR: string = "rgba(48,152,219, 1)";

  onMount(() => {
    initCircle();
  });

  export function updateProgress(progress: number) {
    const circleStepSize = calcCircleStepSize(progress);
    updateValue(progress, circleStepSize);
  }

  function initCircle(): void {
    const circleStepSize = calcCircleStepSize(value);
    circle.style.strokeDashoffset = (100 - value) / STEP * circleStepSize;
  }

  function calcCircleStepSize(progress: number): number {
    const target = MAX_STROKE_DASHOFFSET * (1 - progress / 100);
    const steps = progress / STEP;
    return (MAX_STROKE_DASHOFFSET - target) / steps;
  }

  function updateValue(progress: number, circleStepSize: number) {
    if(value >= progress) return;

    setTimeout(function(){
      value += STEP;
      circle.style.strokeDashoffset -= circleStepSize;
      updateValue(progress, circleStepSize);
    }, DELAY);
  }

</script>

<div class="progress" style="--side: {SIDE}px; --color: {COLOR}; --stroke-offset: {MAX_STROKE_DASHOFFSET}">
  <span class="text">
    {value.toFixed(0)} %
  </span>
  <svg xmlns="http://www.w3.org/2000/svg" class="svg">
    <circle 
      cx={ SIDE / 2 } 
      cy={ SIDE / 2 } 
      r={ SIDE / 2 - 10 } 
      stroke-linecap="round" 
      bind:this={circle}
    />
  </svg>
</div>

<style>
  .progress {
    width: var(--side);
    height: var(--side);
    display: flex; 
    align-items: center; 
    justify-content: center; 
    position: relative;
  }

  .text {
    font-size: 3rem;
  }

  .svg {
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(-90deg);
    width: var(--side);
    height: var(--side);
  }

  circle {
    fill: none;
    stroke: var(--color);
    stroke-width: 10px;
    stroke-dasharray: var(--stroke-offset);
    stroke-dashoffset: var(--stroke-offset);
  }
</style>