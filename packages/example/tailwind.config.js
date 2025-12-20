// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 确保包含你的组件路径
  ],
  theme: {
    extend: {
      animation: {
        // 自定义入场/退场动画
        'toast-in': 'toastIn 0.3s ease-out forwards',
        'toast-out': 'toastOut 0.3s ease-in forwards'
      },
      keyframes: {
        toastIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        toastOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}