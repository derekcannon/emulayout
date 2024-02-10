<script>
  import { onMount } from "svelte";
  import { formatLayoutParam } from "./lib/formatLayoutParam.js";
  import { createKeyMap } from "./lib/createKeyMap.js";
  import Keyboard from "./lib/Keyboard.svelte";

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

  let timer;
  let wmp = $state(0);

  const sentence = [
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

  let words = $state([...sentence]);
  let keyMap = $derived(createKeyMap(layout));

  let value = $state("");

  function updateUrlWithLayout() {
    const layoutString = layout.replaceAll(" ", "");
    const encodedLayout = encodeURIComponent(layoutString);
    const newUrl = `/?layout=${encodedLayout}`;

    history.pushState({}, "", newUrl);
  }

  function handleKeyDown(event) {
    if (wmp) {
      event.preventDefault();
      wmp = 0;
      value = "";
      return;
    }

    if (!timer) {
      timer = new Date().getTime();
      wmp = 0;
    }

    if (event.key === " ") {
      if (words[0] === value) {
        event.preventDefault();
        value = "";
        words.shift();

        if (words.length === 0) {
          const timeDifference = new Date().getTime() - timer;
          const timeInMinutes = timeDifference / 60000; // 60,000 milliseconds in a minute
          const wordsPerMinute = sentence.length / timeInMinutes;
          wmp = Math.round(wordsPerMinute / 10) * 10;
          timer = null;
          words = [...sentence];
        }
      }

      return;
    }

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
  {#if wmp}
    <span class="word">Words per minute: {wmp}</span>
  {:else}
    {#each words as word}
      <span class="word">{word}</span>
    {/each}
  {/if}
</div>

<div class="type-container">
  <input
    placeholder={timer
      ? ""
      : wmp
        ? "Press any key to restart"
        : "Type to begin"}
    autofocus
    {value}
    class="input-field"
    onkeydown={handleKeyDown}
  />
</div>

<Keyboard {keyMap} />

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
    width: 350px;
  }
</style>
