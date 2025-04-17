<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, ChevronRight, MessageCircle, Timer, X } from "@lucide/svelte";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  // Get the slug parameter from the URL
  $: slug = $page.params.slug;

  // Simulate piece information based on the slug
  $: title =
    slug === "bach-invention-4"
      ? "Invention No. 4 in D minor"
      : slug === "item-0"
        ? "Nocturne Op. 9 No. 2"
        : "Piano Piece";

  $: composer = slug === "bach-invention-4" ? "J.S. Bach" : slug === "item-0" ? "F. Chopin" : "Composer";

  // Chat sidebar state
  let isChatOpen = false;

  // Timer overlay state
  let isTimerOpen = false;
  let practiceMinutes = 20;
  let timerActive = false;

  function toggleChat() {
    isChatOpen = !isChatOpen;
  }

  function toggleTimer() {
    isTimerOpen = !isTimerOpen;
  }

  function startTimer() {
    timerActive = true;
  }
</script>

<div class="flex h-screen bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col h-full overflow-hidden relative">
    <!-- Header -->
    <header
      class="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 py-3 px-4 flex items-center justify-between"
    >
      <div class="flex items-center">
        <a
          href="/library"
          class="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 mr-3"
        >
          <ChevronLeft class="h-5 w-5" />
        </a>
        <div>
          <h1 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">{composer}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <Button variant="outline" size="sm" on:click={toggleTimer}>
          <Timer class="h-4 w-4 mr-1" />
          <span class="sr-only sm:not-sr-only">Timer</span>
        </Button>
        <Button variant="outline" size="sm" on:click={toggleChat}>
          <MessageCircle class="h-4 w-4 mr-1" />
          <span class="sr-only sm:not-sr-only">AI Coach</span>
        </Button>
      </div>
    </header>

    <!-- Sheet Music Display Area -->
    <div class="flex-1 flex items-center justify-center overflow-auto bg-white dark:bg-zinc-900 relative">
      <!-- Placeholder for PDF Viewer -->
      <div
        class="max-w-4xl w-full h-[85%] mx-auto bg-white dark:bg-zinc-800 shadow-md border border-zinc-200 dark:border-zinc-700 rounded flex items-center justify-center"
      >
        <div class="text-center p-4">
          <p class="text-zinc-500 dark:text-zinc-400 text-sm">Sheet music placeholder</p>
          <p class="text-zinc-400 dark:text-zinc-500 text-xs mt-2">PDF viewer would be integrated here</p>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4">
        <Button variant="outline" size="icon" class="bg-white/80 dark:bg-zinc-800/80 rounded-full">
          <ChevronLeft class="h-5 w-5" />
        </Button>
        <div class="bg-white/80 dark:bg-zinc-800/80 px-3 py-1 rounded-full text-sm">
          <span class="text-zinc-700 dark:text-zinc-300">Page 1 of 4</span>
        </div>
        <Button variant="outline" size="icon" class="bg-white/80 dark:bg-zinc-800/80 rounded-full">
          <ChevronRight class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>

  <!-- Chat Sidebar - Conditionally rendered -->
  {#if isChatOpen}
    <div class="w-80 border-l border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex flex-col h-full">
      <div class="p-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h2 class="font-semibold text-zinc-900 dark:text-zinc-50">AI Coach</h2>
        <Button variant="ghost" size="icon" on:click={toggleChat}>
          <X class="h-4 w-4" />
        </Button>
      </div>

      <div class="flex-1 overflow-y-auto p-3 space-y-3">
        <div class="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-3 text-sm">
          <p class="text-zinc-800 dark:text-zinc-100">
            I notice you're working on {title}. Would you like me to help you with any specific passages?
          </p>
        </div>
      </div>

      <div class="p-3 border-t border-zinc-200 dark:border-zinc-700">
        <div class="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Message your AI coach..."
            class="flex-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-zinc-100"
          />
        </div>
      </div>
    </div>
  {/if}

  <!-- Timer Overlay - Conditionally rendered -->
  {#if isTimerOpen}
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-zinc-800 rounded-lg shadow-lg max-w-md w-full p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-zinc-900 dark:text-zinc-50">Practice Timer</h3>
          <Button variant="ghost" size="icon" on:click={toggleTimer}>
            <X class="h-4 w-4" />
          </Button>
        </div>

        {#if !timerActive}
          <div class="mb-4">
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Practice duration (minutes)
            </label>
            <input type="range" min="5" max="60" step="5" bind:value={practiceMinutes} class="w-full" />
            <div class="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              <span>5 min</span>
              <span>{practiceMinutes} min</span>
              <span>60 min</span>
            </div>
          </div>

          <Button class="w-full" on:click={startTimer}>Start Practice Session</Button>
        {:else}
          <div class="text-center py-6">
            <div class="text-4xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              {practiceMinutes}:00
            </div>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Focus on articulation and dynamics</p>
          </div>

          <div class="flex space-x-2">
            <Button variant="outline" class="flex-1">Pause</Button>
            <Button variant="destructive" class="flex-1" on:click={() => (timerActive = false)}>End Session</Button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>
