/**
 * NAVANA — Design tokens (TypeScript)
 * Fuente de verdad compartida con tokens/navana.css y tokens/navana.tokens.json.
 */

export const navana = {
  brand: {
    terracotta: '#8B2E1B',
    terracottaLight: '#B5563F',
    terracottaDark: '#5E1E11',
    /** Única variante de terracota legible sobre carbón (5.6:1). */
    terracottaText: '#D67A62',
    olive: '#6B6826',
    oliveLight: '#8E8C45',
    oliveDark: '#474518',
    sand: '#A8956A',
    sandLight: '#C4B892',
    sandDark: '#7A6C4C',
    slate: '#607384',
    slateLight: '#8A9DAD',
    slateDark: '#3E4D5A',
    earth: '#5C4C32',
    earthLight: '#8A7555',
    earthDark: '#3A3020',
    cream: '#DED9CB',
    creamLight: '#EDEAE2',
    creamDark: '#B8B3A5',
    bronze: '#84724D',
    stone: '#B8AE9C',
  },

  dark: {
    bg: '#1A1410',
    bgDeep: '#16130F',
    bgElevated: '#1E1C18',
    bgRaised: '#232119',
    ink: '#DCD7C9',
    inkHi: '#E8E2D6',
    inkMuted: '#8A7B65',
    inkFaint: 'rgba(220,215,201,0.58)',
    inkGhost: 'rgba(220,215,201,0.22)',
    accent: '#84724D',
    accentHover: '#B8AE9C',
    accentContrast: '#1A1410',
    line: 'rgba(255,255,255,0.08)',
    lineSoft: 'rgba(255,255,255,0.05)',
    lineStrong: 'rgba(255,255,255,0.14)',
    veil: 'rgba(255,255,255,0.03)',
    veilHover: 'rgba(255,255,255,0.06)',
  },

  light: {
    bg: '#FAFAF7',
    bgDeep: '#F2EFE8',
    bgElevated: '#FFFFFF',
    bgRaised: '#F6F4EE',
    ink: '#2A2722',
    inkHi: '#1F1D1A',
    inkMuted: '#6B6660',
    inkFaint: 'rgba(42,39,34,0.62)',
    inkGhost: 'rgba(42,39,34,0.18)',
    accent: '#8B2E1B',
    accentHover: '#B5563F',
    accentContrast: '#FFFFFF',
    line: '#D1CCC3',
    lineSoft: '#E6E2DA',
    lineStrong: '#A8A39A',
    veil: 'rgba(42,39,34,0.03)',
    veilHover: 'rgba(42,39,34,0.06)',
  },

  state: {
    success: '#6B6826',
    warning: '#A8956A',
    danger: '#D67A62',
    info: '#607384',
  },

  gradient: {
    /** Botón primario y superficies de acción. */
    action: 'linear-gradient(to right, #DCD7C9, #B8AE9C)',
    /** Sólo para 1–2 palabras dentro de un título, con background-clip: text. */
    text: 'linear-gradient(to right, #DCD7C9, #84724D)',
    /** Velo para legibilidad de texto sobre fotografía. */
    scrim: 'linear-gradient(to top, #1A1410 0%, rgba(26,20,16,0.4) 45%, transparent 100%)',
  },

  font: {
    display: "'Ranade', 'Gill Sans', Optima, sans-serif",
    body: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  },

  /** Escala tipográfica en px. Fluidas aparte, en `fluid`. */
  size: { xs: 12, sm: 13, base: 15, md: 17, lg: 20, xl: 28, '2xl': 38, '3xl': 50, '4xl': 67 },
  fluid: {
    display: 'clamp(2.3rem, 5.8vw, 5.2rem)',
    h2: 'clamp(2rem, 4vw, 3.2rem)',
    gutter: 'clamp(20px, 5vw, 88px)',
    section: 'clamp(88px, 14vh, 168px)',
  },

  leading: { tight: 1.05, snug: 1.3, normal: 1.6, relaxed: 1.7 },
  tracking: { display: '-0.025em', tight: '-0.01em', normal: '0', wide: '0.05em', overline: '0.15em', widest: '0.2em' },

  /** Escala de 4px. */
  space: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96, 10: 128 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, '2xl': 32, full: 9999 },
  container: { max: 1280, measure: '68ch' },

  shadow: {
    sm: '0 1px 3px rgba(12,9,6,0.24)',
    md: '0 4px 14px rgba(12,9,6,0.32)',
    lg: '0 12px 40px rgba(12,9,6,0.44)',
    xl: '0 24px 70px rgba(12,9,6,0.55)',
    glow: '0 0 20px rgba(132,114,77,0.18)',
  },

  motion: {
    ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    /** Curva equivalente para `motion` / framer-motion. */
    easeArray: [0.22, 0.61, 0.36, 1] as const,
    fast: 220,
    base: 420,
    slow: 620,
    cinematic: 800,
  },

  z: { base: 0, sticky: 40, nav: 90, overlay: 120, modal: 150, toast: 200 },

  breakpoint: { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
} as const;

export type NavanaTokens = typeof navana;
export default navana;
