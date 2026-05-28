# Portfolio Setup Guide

## 1. Scaffold the project

```bash
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Replace `src/App.jsx` with `Portfolio.jsx`

Copy `Portfolio.jsx` into `src/App.jsx`.

## 3. `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0c0c0e',
          50: '#111113',
          100: '#161618',
          200: '#1e1e21',
        },
        stone: {
          DEFAULT: '#2a2825',
          300: '#3a3530',
          400: '#4a4540',
          500: '#5a5550',
          600: '#6b6660',
          700: '#8a8580',
          800: '#b0aaa0',
          900: '#c8bfad',
        },
        gold: {
          DEFAULT: '#c8a882',
          light: '#d4b892',
          dark: '#a0845e',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## 4. `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  cursor: none;
}

body {
  background: #0c0c0e;
  color: #e8e4dc;
  -webkit-font-smoothing: antialiased;
}
```

## 5. Add to `index.html` `<head>`

```html
<meta name="theme-color" content="#0c0c0e">
<meta name="description" content="Computer Engineering Student — Systems, AI, and Design">
```

## 6. Personalize

Edit the `DATA` object at the top of `Portfolio.jsx`:
- Replace `name`, `initials`, `email`, `github`, `linkedin`
- Update `projects` array with real repos and demo links
- Update `timeline` with your real milestones
- Replace gallery placeholder `<div>` cells with actual `<img src="..." alt="..." />` elements
- Remove the `— Replace placeholder cells…` note in the Gallery section

## 7. Add your sketch images

In the `GalleryItem` component, replace:
```jsx
<div aria-hidden="true" style={{ ... }}>
  <Pen size={14} ... />
</div>
```

with:
```jsx
<img
  src={item.src}         // add a `src` field to DATA.gallery items
  alt={item.title}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    inset: 0,
    opacity: hov ? 0.7 : 0.5,
    transition: 'opacity 0.3s',
  }}
/>
```

## 8. Run

```bash
npm run dev
```

## Design decisions

| Choice | Rationale |
|---|---|
| Playfair Display (serif display) + DM Mono | Scholarly/editorial — unusual in dev portfolios, immediately memorable |
| Warm-dark palette (#0c0c0e + gold #c8a882) | Cinematic and refined, avoids the cold-blue cliché |
| 0.5px borders everywhere | Precision detail borrowed from luxury product design |
| Grid-gap: 1px / background = border color | Creates seamless "inset" grid look without individual card borders |
| Framer Motion spring parallax on hero | Depth without distraction — scroll reveal feels physical |
| Custom cursor with spring ring | Microinteraction that signals intentionality immediately |
| Film grain via SVG feTurbulence | Adds texture and warmth; makes the dark bg feel analog not digital |
| Loading screen with numeric counter | Sets cinematic tone before anything else loads |
| Vertical "Est. 2022" decorative text | Editorial magazine detail, creates visual rhythm |
