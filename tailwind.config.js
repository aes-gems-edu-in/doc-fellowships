// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        letterReveal: {
          '0%': { opacity: '0', transform: 'translateY(100px) rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotateX(0deg)' }
        },
        subtitleReveal: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(30px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
        }
      },
      animation: {
        letterReveal: 'letterReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        subtitleReveal: 'subtitleReveal 1s ease 0.5s forwards',
      }
    }
  }
}