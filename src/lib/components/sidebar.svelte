<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Music, Menu, X, AudioWaveform } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let isOpen = false;

  const sidebarOpen = writable(isOpen);

  $: isOpen = $sidebarOpen;

  function toggleSidebar() {
    $sidebarOpen = !$sidebarOpen;
  }
</script>

<div class="relative h-full">
  {#if !$sidebarOpen}
    <div
      class="fixed left-0 top-0 h-full w-16 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-4 z-10"
    >
      <button
        on:click={toggleSidebar}
        class="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
      >
        <Menu class="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
      </button>

      <div class="mt-6 flex flex-col items-center">
        <a href="/" class="mb-8">
          <img src="/CrescendoLogo.png" alt="Crescendo" class="w-8 h-8" />
        </a>

        <nav class="flex flex-col items-center gap-6 mt-4">
          <a
            href="/library"
            class="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Sheet Music Library"
          >
            <Music class="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </a>
        </nav>
      </div>
    </div>
  {:else}
    <!-- Expanded sidebar -->
    <div
      class="fixed left-0 top-0 h-full w-64 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col py-4 px-3 z-10"
    >
      <button
        on:click={toggleSidebar}
        class="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors absolute top-4 left-4"
      >
        <X class="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
      </button>

      <nav class="flex flex-col gap-1 mt-16">
        <a
          href="/"
          class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors mb-4"
        >
          <img src="/CrescendoLogo.png" alt="Crescendo" class="w-8 h-8" />
          <span class="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Crescendo</span>
        </a>

        <a
          href="/library"
          class="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <Music class="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          <span class="text-zinc-800 dark:text-zinc-200">Library</span>
        </a>
      </nav>
    </div>
  {/if}
</div>
