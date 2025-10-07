// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#1A1A1A',
        accent: '#00D4FF',
        meme: {
          yellow: '#FFD93D',
          orange: '#FF6B35',
          purple: '#9B5DE5',
          pink: '#F15BB5'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'typewriter': 'typewriter 2s steps(11) forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FF6B35' },
          '100%': { boxShadow: '0 0 20px #FF6B35, 0 0 30px #FF6B35' }
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '11ch' }
        }
      }
    },
  },
  plugins: [],
}
