<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Music, Timer, Send, AudioWaveform } from "@lucide/svelte";
</script>

<div class="flex flex-col h-screen">
  <!-- Main Chat Area similar to Claude -->
  <div class="flex-1 overflow-y-auto px-4 py-6" id="chat-messages">
    <div class="mx-auto max-w-2xl space-y-4">
      <!-- Greeting Header, similar to Claude's "Good afternoon, Jai" -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-light text-zinc-800 dark:text-zinc-200">
          <span class="text-indigo-600 dark:text-indigo-400"></span>
          Hello [User]
        </h1>
      </div>

      <!-- AI Coach Message -->
      <div class="flex items-start">
        <div
          class="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mr-3"
        >
          <AudioWaveform class="h-4 w-4" />
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
          <AudioWaveform class="h-4 w-4" />
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

  <!-- Message Input - Made to look more like Claude's design -->
  <div class="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center space-x-2">
        <input
          type="text"
          placeholder="How can I help you today?"
          class="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-zinc-100"
        />
        <Button size="icon" class="rounded-full h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
          <Send class="h-4 w-4 text-white" />
        </Button>
      </div>

      <!-- Quick action buttons like in Claude's interface -->
      <div class="flex gap-2 mt-3 flex-wrap justify-center">
        <Button variant="outline" size="sm" class="rounded-full">
          <span>Write</span>
        </Button>
        <Button variant="outline" size="sm" class="rounded-full">
          <span>Learn</span>
        </Button>
        <Button variant="outline" size="sm" class="rounded-full">
          <span>Code</span>
        </Button>
        <Button variant="outline" size="sm" class="rounded-full">
          <span>Life stuff</span>
        </Button>
      </div>
    </div>
  </div>
</div>
