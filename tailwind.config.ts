const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			backgroundImage: {
				'gallerease-gradient': 'linear-gradient(135deg, #4caf50 0%, #f7c442 25%, #2196f3 50%, #ff9800 75%, #4caf50 100%)',
				'gallerease-gradient-soft': 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(247, 196, 66, 0.8) 25%, rgba(33, 150, 243, 0.8) 50%, rgba(255, 152, 0, 0.8) 75%)',
				'hero-gradient': 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(247, 196, 66, 0.1) 25%, rgba(33, 150, 243, 0.1) 50%, rgba(255, 152, 0, 0.1) 75%)',
			},
			colors: {
				gallerease: {
					green: '#4caf50',      // Primary green from logo
					yellow: '#f7c442',     // Bright yellow from logo  
					blue: '#2196f3',       // Vibrant blue from logo
					orange: '#ff9800',     // Orange from logo
					// Variations for different use cases
					'green-light': '#81c784',
					'green-dark': '#388e3c',
					'yellow-light': '#fff176',
					'yellow-dark': '#f57f17',
					'blue-light': '#64b5f6',
					'blue-dark': '#1976d2',
					'orange-light': '#ffb74d',
					'orange-dark': '#f57c00',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			transitionProperty: {
				'height': 'height'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

export default config