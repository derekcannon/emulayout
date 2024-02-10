<script>
  import { onMount } from "svelte";
  import { formatLayoutParam } from "./lib/formatLayoutParam.js";
  import {
    createKeyMap,
    ansiAmericanLayout,
    qwertyKeyMap,
  } from "./lib/createKeyMap.js";

  let layout = $state("");

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const layoutParam = urlParams.get("layout");

    if (layoutParam) {
      layout = formatLayoutParam(decodeURIComponent(layoutParam));
    } else {
      layout =
        "y l w k q  j f o u , \nc r s t v  b h a e i \nx g d m z  p n ' / .";
    }
  });

  let words = [
    "the",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "the",
    "lazy",
    "dog",
  ];

  let keyMap = $derived(createKeyMap(layout));

  let value = $state("");

  function updateUrlWithLayout() {
    console.log("called update url");
    const layoutString = layout.replaceAll(" ", "");
    const encodedLayout = encodeURIComponent(layoutString);
    const newUrl = `/?layout=${encodedLayout}`;

    history.pushState({}, "", newUrl);
  }

  function handleKeyDown(event) {
    if (event.metaKey) return;
    if (event.ctrlKey) return;
    if (event.altKey) return;

    event.preventDefault();

    if (event.key === "Backspace") {
      value = value.slice(0, -1);
      return;
    }

    const code = event.code;
    const isShiftPressed = event.shiftKey;

    if ((isShiftPressed && code === "ShiftLeft") || code === "ShiftRight")
      return;

    let remappedChar = keyMap[code] || event.key;

    if (isShiftPressed) {
      // TODO: Adjust remappedChar based on Shift being pressed (e.g. for numbers, punctuation, etc.)
      // remappedChar = adjustForShiftState(remappedChar, code);
      value += /^[a-z]$/.test(remappedChar)
        ? remappedChar.toUpperCase()
        : remappedChar;
    } else {
      value += remappedChar;
    }
  }
</script>

<h1 class="title">Emulayout</h1>

<div class="what-to-type">
  {#each words as word}
    <span class="word">{word}</span>
  {/each}
</div>

<div class="type-container">
  <input autofocus {value} class="input-field" onkeydown={handleKeyDown} />
</div>

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

<div class="layout-area">
  <div class="layout-content">
    <label class="layout-label" for="layout">Layout:️</label>
    <textarea
      id="layout"
      cols="22"
      rows="3"
      bind:value={layout}
      onchange={updateUrlWithLayout}
    />
  </div>
</div>

<style>
  .layout-area {
    padding-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .layout-label {
    padding-bottom: 0.25rem;
  }

  .layout-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
  }

  .home {
    filter: sepia(1);
  }

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

  .title {
    text-align: center;
    margin: 0;
    background: -webkit-linear-gradient(#8800b6, #ff4646);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .word {
    padding-right: 0.5rem;
  }

  .what-to-type {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    padding-top: 3rem;
    padding-bottom: 1rem;
  }

  .type-container {
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
  }

  .input-field {
    font-size: 2rem;
  }
</style>
