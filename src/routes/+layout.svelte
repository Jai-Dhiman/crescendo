<script lang="ts">
  import "../app.css";
  import Sidebar from "$lib/components/sidebar.svelte";

  let { children } = $props();
  let sidebarOpen = false;
</script>

<div class="flex h-screen w-full bg-white dark:bg-zinc-900">
  <Sidebar isOpen={sidebarOpen} />

  <main class="flex-1 overflow-hidden ml-16">
    {@render children()}
  </main>
</div>
