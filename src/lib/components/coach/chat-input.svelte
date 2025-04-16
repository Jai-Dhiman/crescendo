<script lang="ts">
	import { SendIcon } from 'lucide-svelte';
	import Button from '../ui/button.svelte';
	
	let message = '';
</script>

<div class="flex items-center gap-2 w-full px-4 py-3 border-t border-piano-black/10 bg-white">
	<input
		type="text"
		bind:value={message}
		placeholder="Ask your AI coach..."
		class="flex-1 py-2 px-3 rounded-lg border border-piano-black/20 focus:outline-none focus:ring-1 focus:ring-accent-blue"
	/>
	<Button variant="default" size="icon" class="rounded-full">
		<SendIcon size={18} />
	</Button>
</div>
