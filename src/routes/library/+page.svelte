<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { ChevronLeft, Check } from "@lucide/svelte";
</script>

<div class="flex flex-col h-screen bg-white dark:bg-zinc-900">
  <!-- Header -->
  <header class="border-b border-zinc-200 dark:border-zinc-800 py-3 px-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <a
          href="/"
          class="flex items-center text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 mr-3"
        >
          <ChevronLeft class="h-5 w-5" />
        </a>
        <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Sheet Music</h1>
      </div>
      <div class="flex items-center space-x-2">
        <select
          class="text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-zinc-600 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Recently practiced</option>
          <option>Title A-Z</option>
          <option>Composer A-Z</option>
        </select>
      </div>
    </div>
  </header>

  <!-- Sheet Music Library -->
  <div class="flex-1 overflow-y-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Active Sheet Music Item -->
      <a href="/library/bach-invention-4" class="relative group">
        <div
          class="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border-2 border-indigo-500 dark:border-indigo-400"
        >
          <div class="absolute top-2 right-2">
            <div class="bg-indigo-500 dark:bg-indigo-400 rounded-full p-1">
              <Check class="h-3 w-3 text-white" />
            </div>
          </div>
          <div class="h-full flex flex-col justify-end">
            <div class="p-3 bg-gradient-to-t from-zinc-200/80 dark:from-zinc-800/80 to-transparent">
              <h3 class="font-medium text-zinc-900 dark:text-zinc-50">Invention No. 4</h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">J.S. Bach</p>
            </div>
          </div>
        </div>
      </a>

      <!-- Regular Sheet Music Items -->
      {#each Array(8) as _, i}
        <a href={`/library/item-${i}`} class="relative group">
          <div class="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
            <div class="h-full flex flex-col justify-end">
              <div class="p-3 bg-gradient-to-t from-zinc-200/80 dark:from-zinc-800/80 to-transparent">
                <h3 class="font-medium text-zinc-900 dark:text-zinc-50">
                  {i % 3 === 0 ? "Nocturne Op. 9 No. 2" : i % 3 === 1 ? "Moonlight Sonata" : "Für Elise"}
                </h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">
                  {i % 3 === 0 ? "F. Chopin" : i % 3 === 1 ? "L.V. Beethoven" : "L.V. Beethoven"}
                </p>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>
