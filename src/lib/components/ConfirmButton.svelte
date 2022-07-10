<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
	}
</script>

<button class='confirm' on:click={handleClick}>
  Confirm
</button>

<style>
  .confirm {
    background-color: #007ACC;
    color: white;
    border: none;
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
</style>