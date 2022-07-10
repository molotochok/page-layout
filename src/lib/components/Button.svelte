<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let text;
  export let color: string = "#007ACC";

  const dispatch = createEventDispatcher();

  function onClicked() {
    dispatch('click');
	}
</script>

<button 
  class="button"
  style="--color: {color}"
  on:click={onClicked}
>
  {text}
</button>

<style>
  .button {
    background: none;
    color: var(--color);
    font-size: 1.2rem;
    border: 1px solid var(--color);
    padding: 0.5rem 1.2rem;
    border-radius: 13px;
    cursor: pointer;
    min-width: 7.8rem;
    margin: 0 1rem;
  }

  .button:hover {
    background: var(--color);
    color: white;
  }
</style>