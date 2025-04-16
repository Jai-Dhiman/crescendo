<script lang="ts">
	let { class: className, variant = 'default', size = 'default', type = 'button', disabled = false } = $props();
	
	const variants = {
		default: 'bg-accent-blue hover:bg-accent-blue/90 text-white',
		secondary: 'bg-piano-black hover:bg-piano-black/90 text-white',
		outline: 'border border-piano-black hover:bg-piano-black/10 text-piano-black',
		ghost: 'hover:bg-piano-black/10 text-piano-black',
		link: 'text-accent-blue underline-offset-4 hover:underline'
	};
	
	const sizes = {
		default: 'h-10 px-4 py-2',
		sm: 'h-8 px-3 text-sm',
		lg: 'h-12 px-6 text-lg',
		icon: 'h-9 w-9'
	};
</script>

<button
	type={type}
	class="inline-flex items-center justify-center rounded-md font-medium transition-colors 
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue 
	disabled:pointer-events-none disabled:opacity-50 {variants[variant]} {sizes[size]} {className}"
	{disabled}
	{...$$restProps}
>
	<slot />
</button>
