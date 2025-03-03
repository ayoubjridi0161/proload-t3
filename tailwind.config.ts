import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  plugins: [nextui()],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|dropdown|button|ripple|spinner|input|listbox|divider|popover|scroll-shadow|menu).js",
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
  			'hero-image': "url('/gym2.jpeg')",
  			'yellowGym': "url('/gymYellow.jpg')",
  			's3gym': "url('//s3.eu-north-1.amazonaws.com/proload.me/widegym.png')"
  		},
  		boxShadow: {
  			bottom: '0 4px 6px  rgba(0,0,0,0.2)',
  			left: '-4px 0 6px -1px rgba(0,0,0,0.1), -2px 0 4px -1px rgba(0,0,0,0.06)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			dashboardBackground: 'hsl(var(--dashboard-background))',
  			foreground: 'hsl(var(--foreground))',
  			card: 'hsl(var(--card))',
  			'card-foreground': 'hsl(var(--card-foreground))',
  			popover: 'hsl(var(--popover))',
  			'popover-foreground': 'hsl(var(--popover-foreground))',
  			primary: 'hsl(var(--primary))',
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: 'hsl(var(--secondary))',
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			muted: 'hsl(var(--muted))',
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			accent: 'hsl(var(--accent))',
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			destructive: 'hsl(var(--destructive))',
  			'destructive-foreground': 'hsl(var(--destructive-foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
			xtraLight: 'hsl(var(--xtra-light))',
			xtraDark:'hsl(var(--xtra-dark))',
			xtraGreen:'hsl(var(--xtra-green))',
			xtraGray:'hsl(var(--xtra-gray))',
			xtraText:'hsl(var(--xtra-text))',
			xtraBG:'hsl(var(--xtra-bg))',
			xtraContainer:'hsl(var(--xtra-container))',
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
  			},
  			grid: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			grid: 'grid 15s linear infinite'
  		}
  	}
  },
} satisfies Config;

export default config;
