# Navana Design Kit

Carpeta portátil con **todo lo que un proyecto de código necesita para verse como Navana**: tokens, reglas, tipografía, logos y recetas de componentes.

Copia esta carpeta completa a la raíz de cualquier proyecto y apunta a ella. Un agente de código (Claude Code, Cursor, Copilot) leyendo `AGENTS.md` ya puede construir interfaces correctas sin más contexto.

## Instalación

```
tu-proyecto/
└── navana-design-kit/     ← copia esta carpeta tal cual
```

### 1. Fuentes

```css
@import url('https://api.fontshare.com/v2/css?f[]=ranade@300,400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### 2. Tokens

CSS plano — importa una vez, arriba de tus estilos:

```css
@import './navana-design-kit/tokens/navana.css';
```

Tailwind v4 — importa **después** de `@import "tailwindcss"`:

```css
@import "tailwindcss";
@import './navana-design-kit/tokens/navana.css';
@import './navana-design-kit/tokens/navana.tailwind.css';
```

JS / TS:

```ts
import { navana } from './navana-design-kit/tokens/navana';
```

### 3. Apunta al agente

Agrega a tu `CLAUDE.md`, `.cursorrules` o `AGENTS.md` raíz:

```md
El diseño de este proyecto sigue `navana-design-kit/`.
Lee `navana-design-kit/AGENTS.md` antes de escribir o modificar cualquier UI.
```

## Qué hay adentro

| Archivo | Para qué |
|---|---|
| `AGENTS.md` | **Empieza aquí.** Reglas duras y condensadas para agentes de código. |
| `design.md` | El documento completo: marca, color, tipografía, espacio, movimiento, accesibilidad. |
| `components.md` | Recetas listas: botones, cards, inputs, secciones, navegación. |
| `preview.html` | Ábrelo en el navegador para ver todos los tokens renderizados. |
| `tokens/navana.css` | Variables CSS. Tema oscuro (default) y tema claro/papel. |
| `tokens/navana.tailwind.css` | Mapeo `@theme` para Tailwind v4. |
| `tokens/navana.tokens.json` | Tokens en formato DTCG, para Style Dictionary / Figma / pipelines. |
| `tokens/navana.ts` | Los mismos tokens tipados para JS/TS. |
| `fonts/` | Ranade y Space Grotesk locales, por si no quieres depender del CDN. |
| `assets/` | Logotipo e isotipo en SVG con `currentColor`. |

## Regla de oro

Navana es **editorial, oscuro, material y pausado**. Una idea dominante por pantalla, mucho espacio negativo, imagen grande, tipografía con aire. Si una pantalla se siente llena, está mal.
