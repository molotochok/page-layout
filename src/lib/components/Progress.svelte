<script lang="ts">
  import { onMount } from 'svelte';
  import { SyncLoader } from 'svelte-loading-spinners'

  let circle;
  let value: number = 0;
  let isValueHidden: boolean = true;

  const STEP = 0.1;
  const DELAY = 1;
  const MAX_STROKE_DASHOFFSET: number = 880;
  const SIDE: number = 300;
  const COLOR: string = "rgba(48,152,219, 1)";
  const PROGRESS_VALUE_MARGIN = 0.0001;

  onMount(() => {
    initCircle();
  });

  export function updateProgress(progress: number) {
    const circleStepSize = calcCircleStepSize(progress);
    isValueHidden = false;
    updateValue(progress, circleStepSize);
  }

  function initCircle(): void {
    const circleStepSize = calcCircleStepSize(value);
    circle.style.strokeDashoffset = Math.min(
      (100 - value) / STEP * circleStepSize,
      MAX_STROKE_DASHOFFSET
    );
  }

  function calcCircleStepSize(progress: number): number {
    if(progress == 0) 
      return MAX_STROKE_DASHOFFSET / 100;

    const target = MAX_STROKE_DASHOFFSET * (1 - progress / 100);
    const steps = progress / STEP;
    return (MAX_STROKE_DASHOFFSET - target) / steps;
  }

  function updateValue(progress: number, circleStepSize: number) {
    if(progress - value <= PROGRESS_VALUE_MARGIN) 
      return;

    setTimeout(function(){
      value += STEP;
      circle.style.strokeDashoffset -= circleStepSize;
      updateValue(progress, circleStepSize);
    }, DELAY);
  }

</script>

<div class="progress" style="--side: {SIDE}px; --color: {COLOR}; --stroke-offset: {MAX_STROKE_DASHOFFSET}">
  <div class:hidden={!isValueHidden}>
    <SyncLoader size="5" color={COLOR} unit="rem" duration="1s" />
  </div>
  <span class="text" class:hidden={isValueHidden}>{value.toFixed(1)} %</span>
  <svg xmlns="http://www.w3.org/2000/svg" class="svg">
    <circle 
      cx={ SIDE / 2 } 
      cy={ SIDE / 2 } 
      r={ SIDE / 2 - 10 } 
      bind:this={circle}
    />
  </svg>

  <svg xmlns="http://www.w3.org/2000/svg" class="svg">
    <circle 
      cx={ SIDE / 2 } 
      cy={ SIDE / 2 } 
      r={ SIDE / 2 - 10 } 
      class="bd-circle"
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
  }

  .bd-circle {
    opacity: 0.1;
    stroke-dashoffset: 0;
  }
</style>