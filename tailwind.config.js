/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Piano-inspired color palette
				'piano-black': '#1E1E24',
				'piano-white': '#F5F5F7',
				'piano-ivory': '#F8F4E3',
				'accent-blue': '#4A6FA5', // Primary accent
				'accent-gold': '#C8963E' // Secondary accent
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Georgia', 'serif'],
				mono: ['Roboto Mono', 'monospace']
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
};
