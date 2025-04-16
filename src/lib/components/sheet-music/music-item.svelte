<script lang="ts">
	import { StarIcon } from 'lucide-svelte';
	
	let { title = 'Untitled', composer = 'Unknown', isActive = false, id = '1' } = $props();
</script>

<a 
	href="/sheet-music/{id}" 
	class="group flex flex-col p-4 bg-piano-white border border-piano-black/10 rounded-lg hover:shadow-md transition-all"
>
	<div class="flex justify-between items-start mb-2">
		<div class="w-full">
			<h3 class="font-medium text-piano-black group-hover:text-accent-blue transition-colors line-clamp-1">{title}</h3>
			<p class="text-sm text-piano-black/70">{composer}</p>
		</div>
		{#if isActive}
			<div class="text-accent-gold">
				<StarIcon size={16} />
			</div>
		{/if}
	</div>
	
	<div class="mt-auto w-full h-[120px] bg-piano-black/5 rounded flex items-center justify-center">
		<span class="text-piano-black/40 text-sm">Sheet Preview</span>
	</div>
</a>
