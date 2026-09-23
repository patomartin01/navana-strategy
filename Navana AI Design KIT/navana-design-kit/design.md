# Navana — Sistema de diseño

Documento de referencia. Para reglas rápidas, lee `AGENTS.md`. Para código listo, `components.md`.

---

## 1. La marca

Navana convierte terrenos subutilizados en cabañas de diseño operadas como una red de hospedaje. El producto habla a dos públicos: **propietarios de terreno / inversionistas** (racional, cifras, retorno) y **viajeros** (sensorial, naturaleza, desconexión).

**Personalidad:** editorial, oscuro, material, pausado.
**No es:** startup tecnológica, marketplace ruidoso, catálogo inmobiliario.

Tres principios que rigen cada pantalla:

1. **Una idea dominante por viewport.** Un titular, una imagen, una acción. Si compiten dos, divide en dos pantallas.
2. **El espacio negativo es contenido.** El aire comunica calma y precio. Nunca lo rellenes.
3. **Material antes que gráfico.** Fotografía real, textura, grano. Nunca ilustración vectorial inventada ni iconografía multicolor.

---

## 2. Color

### 2.1 Paleta de marca

Constantes de identidad. Se usan en dosis pequeñas: acentos, datos, categorías, impresos.

| Token | Hex | Uso |
|---|---|---|
| Terracota | `#8B2E1B` | Acento primario en impresos y superficies claras. Tierra cocida. |
| Olivo | `#6B6826` | Vegetación, estados positivos. |
| Arena | `#A8956A` | Datos, métricas, barras de progreso. |
| Pizarra | `#607384` | Información neutra, cielo, agua. |
| Tierra | `#5C4C32` | Madera, base cálida. |
| Crema | `#DED9CB` | Tinta sobre oscuro, papel sobre claro. |

Cada uno tiene variantes `-light` y `-dark` en los tokens.

### 2.2 Superficies de producto (tema oscuro — default)

Es lo que ve el usuario en web y app.

| Token | Hex | Uso |
|---|---|---|
| `--nv-bg` | `#1A1410` | Superficie base. Carbón cálido, nunca gris neutro ni negro puro. |
| `--nv-bg-deep` | `#16130F` | Secciones a plena sangre, pie de página. |
| `--nv-bg-elevated` | `#1E1C18` | Cards, paneles, popovers, barra flotante. |
| `--nv-bg-raised` | `#232119` | Hover sobre superficie elevada. |

### 2.3 Tinta

| Token | Hex | Contraste sobre `#1A1410` | Uso |
|---|---|---|---|
| `--nv-ink-hi` | `#E8E2D6` | 14.0:1 | Títulos. |
| `--nv-ink` | `#DCD7C9` | 12.1:1 | Texto principal. |
| `--nv-ink-muted` | `#8A7B65` | 4.9:1 | Secundario, captions, etiquetas. Mínimo legal para texto. |
| `--nv-ink-faint` | 58% crema | ~7:1 | Texto de apoyo sobre superficies elevadas. |
| `--nv-ink-ghost` | 22% crema | — | **Sólo decorativo:** separadores, marcas de agua. Nunca texto. |

### 2.4 Acción

| Token | Hex | Uso |
|---|---|---|
| `--nv-accent` | `#84724D` | Bronce. Iconos, puntos, bordes activos, cifras destacadas. |
| `--nv-accent-hover` | `#B8AE9C` | Piedra. Estado hover y segundo punto de gradiente. |
| Gradiente de acción | `#DCD7C9 → #B8AE9C` | Fondo de botón primario, texto `#1A1410`. |
| Gradiente de texto | `#DCD7C9 → #84724D` | Una o dos palabras dentro de un título. Máximo una vez por sección. |

### 2.5 Reglas de contraste

- Texto normal **4.5:1** mínimo. Títulos grandes (≥28px) **3:1**.
- **La terracota `#8B2E1B` no es color de texto sobre carbón** — da 3.4:1. Úsala sólo para puntos, bordes y acentos. Para texto de aviso sobre oscuro usa `#D67A62` (5.6:1).
- Texto sobre fotografía siempre lleva velo: `linear-gradient(to top, #1A1410, rgba(26,20,16,.4) 45%, transparent)`.
- Nunca escribas texto en color con opacidad reducida para "suavizarlo". Usa el token de tinta que corresponde.

### 2.6 Tema claro (papel)

Para documentos, contratos, correo y material impreso: `.nv-light` o `[data-nv-theme="light"]`. Fondo `#FAFAF7`, tinta `#2A2722`, acento terracota `#8B2E1B`. En este tema la terracota **sí** funciona como texto (7.6:1).

---

## 3. Tipografía

Dos familias. Sin excepciones.

**Ranade** (Fontshare) — display. Grotesca humanista con carácter editorial.
**Space Grotesk** (Google Fonts) — cuerpo y UI. Neogrotesca técnica.

### 3.1 Escala

| Rol | Fuente | Tamaño | Peso | Line-height | Tracking |
|---|---|---|---|---|---|
| Display / hero | Ranade | `clamp(2.3rem, 5.8vw, 5.2rem)` | 400 | 1.05 | `-0.025em` |
| H2 sección | Ranade | `clamp(2rem, 4vw, 3.2rem)` | 500 | 1.1 | `-0.02em` |
| H3 card | Space Grotesk | 17–20px | 700 | 1.3 | `0` |
| H4 / label | Space Grotesk | 15px | 600 | 1.4 | `0` |
| Cuerpo | Space Grotesk | 15–16px | 400 | 1.7 | `0` |
| Caption | Space Grotesk | 13px | 400 | 1.6 | `0` |
| Overline | Space Grotesk | 12px | 600 | 1.5 | `0.15em` MAYÚSCULAS |
| Cifra grande | Space Grotesk | 38–67px | 500 | 1.0 | `-0.02em` |

### 3.2 Reglas

- **Ranade en 400–500.** El peso 300 se lee frágil junto al resto de los activos de marca — no lo uses en títulos. Ranade 700 sólo en piezas impresas grandes.
- **Títulos con tracking negativo** (`-0.02` a `-0.025em`). Es la firma tipográfica de Navana.
- `text-wrap: balance` en títulos, `text-wrap: pretty` en párrafos.
- Ancho máximo de párrafo **68ch**. Un párrafo que cruza toda la pantalla está mal.
- **Máximo dos pesos visibles por pantalla.** Jerarquiza con tamaño y color, no con peso.
- Números en tablas y métricas: `font-variant-numeric: tabular-nums`.
- Nunca uses `system-ui`, Inter, Roboto o Arial como fuente visible.

### 3.3 Carga

```css
@import url('https://api.fontshare.com/v2/css?f[]=ranade@300,400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

Con archivos locales, usa los `@font-face` de `tokens/navana.css` y coloca los `.otf`/`.ttf` en `navana-design-kit/fonts/`.

---

## 4. Espacio y retícula

Escala base **4px**: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.

| Token | Valor | Uso |
|---|---|---|
| `--nv-gutter` | `clamp(20px, 5vw, 88px)` | Margen lateral de página. Siempre este, nunca un padding fijo. |
| `--nv-section-y` | `clamp(88px, 14vh, 168px)` | Aire vertical entre secciones. Generoso a propósito. |
| `--nv-container` | `1280px` | Ancho máximo de contenido centrado. |
| `--nv-measure` | `68ch` | Ancho máximo de texto corrido. |

**Retícula de 12 columnas** con `gap: 24px` en escritorio, colapsando a 6 en tablet y 1 en móvil. Los bloques importantes ocupan 7–8 columnas; el espacio restante es aire, no un widget de relleno.

**Ritmo dentro de una sección:** overline → 24px → titular → 28px → párrafo → 48px → contenido. No inventes espaciados intermedios.

---

## 5. Forma

| Elemento | Radio |
|---|---|
| Input, chip pequeño, badge | `12px` |
| Card, panel, imagen | `16px` |
| Contenedor grande, modal, hero media | `24–32px` |
| Botón, píldora, avatar, chip de filtro | `9999px` |

Bordes de **1px** con `rgba(255,255,255,0.05–0.14)`. Nunca bordes de color saturado.

Sombras cálidas, nunca negro puro: `rgba(12,9,6,α)`. En tema oscuro la elevación se comunica con **color de superficie y borde**, no con sombra — la sombra sólo en elementos flotantes reales (nav, modal, tooltip).

---

## 6. Movimiento

| Token | Valor |
|---|---|
| Curva estándar | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Curva de salida | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Rápido (hover, focus) | `220ms` |
| Base (entradas, cambios de estado) | `420ms` |
| Lento (revelado de sección) | `620ms` |
| Cinemático (portada, transición de capítulo) | `800ms` |

**Reglas:**

- Sin rebotes, sin `spring` energético, sin `ease-in-out` corto. El movimiento Navana es una cortina, no un resorte.
- Entradas: `opacity 0→1` + `translateY(16px→0)`. Nada de escala ni rotación en contenido.
- Escalonado (`stagger`) de 60–90ms entre hermanos, máximo 5 elementos.
- Ken Burns lento (22s, `scale 1.04→1.17`) en fondos fotográficos de sección.
- Grano de película fijo sobre superficies cinemáticas: `opacity .05`, `mix-blend-mode: soft-light`.
- **Toda animación decorativa se desactiva en `prefers-reduced-motion: reduce`.**
- En dispositivos táctiles, anula los efectos hover para evitar estados pegados.

Con `motion` / framer-motion:

```tsx
transition={{ duration: 0.62, ease: [0.22, 0.61, 0.36, 1] }}
```

---

## 7. Imagen

- **Fotografía real siempre.** Cabañas, paisaje, materiales, personas en el entorno. Nada de renders genéricos de stock corporativo.
- Formato preferido **3:2 horizontal** o **4:5 vertical** en cards; **16:9** o pantalla completa en hero.
- Tratamiento: contraste medio, sombras cálidas, sin saturación alta. La imagen debe convivir con el carbón `#1A1410`.
- Toda imagen con texto encima lleva velo degradado.
- `loading="lazy"` y `decoding="async"` fuera del primer viewport.
- Bordes `16px` salvo a plena sangre.

---

## 8. Logo

`assets/navana-logotype.svg` (palabra) y `assets/navana-isotipo.svg` (marca de tres montañas). Ambos con `fill="currentColor"` — el color lo hereda del contexto.

- Sobre oscuro: `#DCD7C9`. Sobre claro: `#1F1D1A` o terracota `#8B2E1B`.
- Altura mínima del logotipo: **14px** en barra de navegación, **22px** en cierres y portadas.
- Área de respeto: la altura del logotipo en los cuatro lados.
- **Nunca** lo deformes, rotes, le pongas sombra, contorno o degradado, ni lo coloques sobre fotografía sin velo.
- Combinación estándar: isotipo + logotipo con `gap: 8–12px`, alineados por eje vertical.

---

## 9. Accesibilidad

- Contraste según §2.5. Verifica cada par nuevo de color.
- Foco visible siempre: anillo de 2px en `--nv-accent` con `outline-offset: 2px`. Nunca `outline: none` sin reemplazo.
- Áreas táctiles **44×44px** mínimo en `pointer: coarse`.
- `scroll-margin-top: 80px` en secciones ancladas, por la barra fija.
- Formularios: `<label>` real asociado, error en texto además de color, `aria-live` en el resumen.
- Toda imagen con contenido informativo lleva `alt` descriptivo; la decorativa, `alt=""`.
- Soporte de zoom hasta 200% sin pérdida de contenido — de ahí que ningún tamaño de texto sea fijo en `px` en los títulos.

---

## 10. Voz y contenido

Español de México, segunda persona (`tú`), frases cortas y concretas.

- Sereno y preciso, nunca eufórico. "Tu terreno puede operar como hospedaje" antes que "¡Transforma tu terreno hoy!".
- **Prudencia en afirmaciones.** "Construyendo la primera red…", no "la primera red…".
- Cifras con unidad y contexto: `26.6% TIR · 3.8 años de retorno`, no `26.6%` suelto.
- Sin jerga técnica hacia el viajero; sin lenguaje aspiracional vacío hacia el inversionista.
- Títulos de sección en oración normal, no en Título Con Mayúsculas.
- Overlines en MAYÚSCULAS, dos o tres palabras máximo.
- Sin emoji.

---

## 11. Stack de referencia

El producto Navana corre sobre: **React 18 + Vite + TypeScript**, **Tailwind v4** (`@theme inline`), **Radix UI / shadcn** para primitivas, **motion** (framer-motion v12) para animación, **lucide-react** para iconos, **Supabase** para datos.

Si tu proyecto usa shadcn, aplica la clase `.nv-shadcn` (en `tokens/navana.tailwind.css`) al contenedor raíz: reviste todos los componentes con la piel Navana sin tocar sus archivos.

Iconos: `lucide-react`, trazo `1.5`, tamaño `16/20/24`, siempre monocromo en `--nv-ink-muted` o `--nv-accent`.

---

## 12. Lista de verificación

Antes de dar por buena una pantalla:

- [ ] ¿Hay una sola idea dominante?
- [ ] ¿Todos los colores salen de los tokens?
- [ ] ¿Ranade en títulos con tracking negativo, Space Grotesk en el resto?
- [ ] ¿Máximo dos pesos tipográficos visibles?
- [ ] ¿Los párrafos respetan 68ch?
- [ ] ¿Contraste ≥4.5:1 en todo texto?
- [ ] ¿Las animaciones duran 400–800ms sin rebote?
- [ ] ¿Funciona con `prefers-reduced-motion`?
- [ ] ¿Los toques miden 44px en móvil?
- [ ] ¿Se puede quitar algo más?
