<script lang="ts">
	let { type = 'ai', content = '', class: className = '' } = $props();
</script>

<div class="flex {type === 'user' ? 'justify-end' : 'justify-start'} mb-4 {className}">
	<div 
		class="max-w-[80%] rounded-2xl px-4 py-2 {type === 'user' 
			? 'bg-accent-blue text-white' 
			: 'bg-piano-black/5 text-piano-black'
		}"
	>
		{content}
	</div>
</div>
