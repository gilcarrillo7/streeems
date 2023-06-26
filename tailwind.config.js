/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`./src/pages/**/*.{js,jsx,ts,tsx}`,
		`./src/components/**/*.{js,jsx,ts,tsx}`,
	],
	theme: {
		container: {
			center: true,
			padding: {
				lg: "2rem",
				DEFAULT: "15px",
			},
		},
		fontFamily: {
			sans: ["Lato", "sans-serif"],
			zen: ["Zen Dots", "sans-serif"],
		},
		extend: {
			colors: {
				primary: "#227E66",
				secundary: "#6CC8C3",
				terciary: "#286082",
				comp1: "#605F5F",
				tab01: "#62CABE",
				tab02: "#021F15",
				tab03: "#234C67",
				tab04: "#C0EFEA",
				tab05: "#1F5D46",
				tab06: "#3AABBE",
				tab07: "#3A8175",
				tab08: "#28727F",
				tab09: "#708B8E",
				error: "#EE695D",
			},
			opacity: {
				85: ".85",
			},
		},
	},
	plugins: [],
};
