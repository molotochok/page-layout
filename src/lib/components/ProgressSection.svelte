<script lang="ts">
  import Button from './Button.svelte';
  import Progress from './Progress.svelte';

  let progress : Progress;

  export function updateProgress(value: number) {
    progress.updateProgress(value);
  }

  function tryAgainClicked(): void {
    window.location.reload();
  }

  function nextClicked(): void {
    console.log("nextClicked");
  }
</script>

<div class="progress-section">
  <Progress bind:this={progress}/>
  <div class="buttons">
    <Button color="#facd34" text="Try again" on:click={tryAgainClicked} />
    <Button color="#34bafa" text="Next" on:click={nextClicked} />
  </div>
</div>

<style>
  .progress-section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .buttons {
    margin-top: 1.25rem;
  }
</style>