<script>
  import { ansiAmericanLayout, qwertyKeyMap } from "./createKeyMap.js";

  const { keyMap } = $props();
</script>

<div class="keyboard">
  {#each ansiAmericanLayout as keyRow, rowIndex}
    <div class="key-row">
      {#each keyRow as keyCode, columnIndex}
        {#if rowIndex === 0 && columnIndex === 12}
          <div class="long-key">
            {keyMap[keyCode] || qwertyKeyMap[keyCode]}
          </div>
        {:else}
          <div
            class="key"
            class:home={rowIndex == 1 &&
              ((columnIndex >= 0 && columnIndex <= 3) ||
                (columnIndex >= 6 && columnIndex <= 9))}
          >
            {keyMap[keyCode] || qwertyKeyMap[keyCode]}
          </div>
          {#if rowIndex === 1 && columnIndex === 10}
            <div class="long-key">Enter</div>
          {/if}
          {#if rowIndex === 2 && columnIndex === 9}
            <div class="long-key">shift</div>
          {/if}
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .key-row {
    display: flex;
  }

  .key {
    background-image: url("/key.png");
    color: black;
    background-size: cover;
    font-family: monospace;
    text-transform: uppercase;
    font-size: 1.2rem;
    text-align: center;
    width: 30px;
    padding: 8px;
  }

  .long-key {
    background-image: url("/long-key.png");
    background-size: cover;
    font-family: monospace;
    text-transform: uppercase;
    font-size: 1.2rem;
    text-align: center;
    width: 90px;
    padding: 8px;
  }
</style>
