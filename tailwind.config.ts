import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors'; // Ensure this is correctly imported

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
		},
		colors: {
			white: colors.white,
			'blue-primary': 'hsl(220, 98%, 61%)',
			'light-blue': {
				100: 'hsl(0, 0%, 98%)', // Very Light Gray
				200: 'hsl(236, 33%, 92%)', // Very Light Grayish Blue
				300: 'hsl(233, 11%, 84%)', // Light Grayish Blue
				400: 'hsl(236, 9%, 61%)', // Dark Grayish Blue
				500: 'hsl(235, 19%, 35%)', // Very Dark Grayish Blue
			},
			'dark-blue': {
				100: 'hsl(235, 21%, 11%)', // Very Dark Blue
				200: 'hsl(235, 24%, 19%)', // Very Dark Desaturated Blue
				300: 'hsl(234, 39%, 85%)', // Light Grayish Blue
				400: 'hsl(236, 33%, 92%)', // Light Grayish Blue (hover)
				500: 'hsl(234, 11%, 52%)', // Dark Grayish Blue
				600: 'hsl(233, 14%, 35%)', // Very Dark Grayish Blue
				700: 'hsl(237, 14%, 26%)', // Very Dark Grayish Blue
			},
			'accent-left': 'hsl(192, 100%, 67%)',
			'accent-right': 'hsl(280, 87%, 65%)',
		},
		extend: {
			backgroundImage: {
				'mobile-dark': 'url("/images/bg-mobile-dark.jpg")',
				'desktop-dark': 'url("/images/bg-desktop-dark.jpg")',
				'mobile-light': 'url("/images/bg-mobile-light.jpg")',
				'desktop-light': 'url("/images/bg-desktop-light.jpg")',
			},
		},
	},
	plugins: [],
};

export default config;
