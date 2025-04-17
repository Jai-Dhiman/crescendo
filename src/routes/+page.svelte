<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Music, Timer, ChevronRight, Send } from "@lucide/svelte";
</script>

<div class="flex flex-col h-screen bg-white dark:bg-zinc-900">
  <!-- Header -->
  <header class="border-b border-zinc-200 dark:border-zinc-800 py-3 px-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Music class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <h1 class="ml-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">Crescendo</h1>
      </div>
      <a
        href="/library"
        class="flex items-center text-sm text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Music class="h-4 w-4 mr-1" />
        <span>Sheet Music</span>
        <ChevronRight class="h-4 w-4" />
      </a>
    </div>
  </header>

  <!-- Main Chat Area -->
  <div class="flex-1 overflow-y-auto px-4 py-6" id="chat-messages">
    <div class="mx-auto max-w-2xl space-y-4">
      <!-- AI Coach Message -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mr-3"
        >
          <Music class="h-4 w-4" />
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
          <p class="text-sm text-zinc-800 dark:text-zinc-100">
            Welcome to Crescendo! I'm your AI piano practice assistant. How would you like to practice today?
          </p>
        </div>
      </div>

      <!-- User Message -->
      <div class="flex items-start justify-end">
        <div class="bg-indigo-600 dark:bg-indigo-700 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
          <p class="text-sm text-white">I'd like to work on the Bach Invention I started yesterday.</p>
        </div>
      </div>

      <!-- AI Coach Message -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mr-3"
        >
          <Music class="h-4 w-4" />
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
          <p class="text-sm text-zinc-800 dark:text-zinc-100">
            Great choice! I see you were working on Bach's Invention No. 4 in D minor. Would you like to:
          </p>
          <div class="mt-3 space-y-2">
            <Button variant="outline" size="sm" class="w-full justify-start">
              <Music class="h-4 w-4 mr-2" /> Open the sheet music
            </Button>
            <Button variant="outline" size="sm" class="w-full justify-start">
              <Timer class="h-4 w-4 mr-2" /> Start a 20-minute practice session
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Message Input -->
  <div class="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Message your AI coach..."
          class="flex-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-zinc-100"
        />
        <Button size="icon" class="rounded-full h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
          <Send class="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  </div>
</div>
