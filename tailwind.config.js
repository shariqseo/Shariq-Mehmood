/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0C0C0C",
          raised: "#111111",
          card: "#131313",
          hover: "#171717",
        },
        hairline: "rgba(255,255,255,0.08)",
        hairlineStrong: "rgba(255,255,255,0.16)",
        chrome: {
          low: "#646973",
          high: "#BBCCD7",
        },
        accent: {
          from: "#4ADE80",
          to: "#14B8A6",
          soft: "rgba(74,222,128,0.10)",
        },
        muted: "#8A8F98",
        subtle: "#6B7078",
      },
      fontFamily: {
        sans: ["Kanit", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        display: "-0.03em",
        label: "0.18em",
      },
      maxWidth: {
        shell: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
