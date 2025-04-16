<script lang="ts">
	import { HomeIcon, BookOpenIcon, MusicIcon } from 'lucide-svelte';
	let { title = 'Crescendo', showNav = true } = $props();
</script>

<header class="flex items-center justify-between p-4 border-b border-piano-black/10 bg-piano-white">
	<div class="flex items-center gap-2">
		<div class="text-accent-blue">
			<MusicIcon size={24} />
		</div>
		<h1 class="text-lg font-semibold text-piano-black">{title}</h1>
	</div>
	
	{#if showNav}
	<nav class="flex items-center gap-4">
		<a href="/coach" class="text-piano-black/70 hover:text-accent-blue transition-colors" aria-label="AI Coach">
			<HomeIcon size={20} />
		</a>
		<a href="/sheet-music" class="text-piano-black/70 hover:text-accent-blue transition-colors" aria-label="Sheet Music">
			<BookOpenIcon size={20} />
		</a>
	</nav>
	{/if}
</header>
