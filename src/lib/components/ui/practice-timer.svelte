<script lang="ts">
	import { ClockIcon, PauseIcon, PlayIcon } from 'lucide-svelte';
	import Button from './button.svelte';
	
	let timerActive = false;
	let timerDisplay = '00:00';
</script>

<div class="flex items-center gap-2 px-3 py-2 bg-piano-black/5 rounded-lg">
	<ClockIcon size={16} class="text-accent-blue" />
	<span class="font-mono text-piano-black">{timerDisplay}</span>
	<Button 
		variant="ghost" 
		size="sm" 
		class="h-7 w-7 p-0 rounded-full"
		on:click={() => timerActive = !timerActive}
	>
		{#if timerActive}
			<PauseIcon size={14} />
		{:else}
			<PlayIcon size={14} />
		{/if}
	</Button>
</div>
