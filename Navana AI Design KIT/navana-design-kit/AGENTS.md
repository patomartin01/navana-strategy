# Navana — Reglas para agentes de código

Lee esto antes de escribir o modificar cualquier UI. Detalle completo en `design.md`, recetas en `components.md`.

## Identidad en una línea

Navana convierte terrenos en cabañas de diseño operadas como red de hospedaje. La interfaz debe sentirse **editorial, oscura, material y pausada** — no SaaS, no startup genérica.

## Reglas duras

1. **Nunca uses el azul/gris por defecto de shadcn ni Tailwind (`slate`, `zinc`, `blue`).** Todo color sale de los tokens Navana.
2. **Fondo oscuro por defecto.** `--nv-bg: #1A1410`. El tema claro sólo para documentos, impresos y correo.
3. **Dos fuentes, sin excepción.** Ranade para display/títulos, Space Grotesk para cuerpo y UI. Nunca Inter, Roboto, Arial o system-ui.
4. **Ranade se usa en 400–500 con `letter-spacing: -0.025em`.** El peso 300 se ve frágil — no lo uses en títulos.
5. **Sin emoji.** No es parte de la marca.
6. **Radios grandes y consistentes:** `12px` en cards, `16–24px` en contenedores grandes, `9999px` en botones y chips. Nunca esquinas vivas en superficies interactivas.
7. **Movimiento lento: 400–800 ms, `cubic-bezier(0.22, 0.61, 0.36, 1)`, sin rebotes.** Nada de `bounce`, `spring` energético o `ease-in-out` corto.
8. **Respeta `prefers-reduced-motion: reduce`** en toda animación decorativa.
9. **Toque mínimo 44×44 px** en móvil.
10. **Una idea dominante por viewport.** Si dudas, quita.

## Paleta operativa (memoriza esto)

```
Fondo         #1A1410   carbón cálido       ← superficie base
Fondo elev.   #1E1C18   card / panel
Fondo hondo   #16130F   secciones a plena sangre
Tinta         #DCD7C9   crema — texto principal
Tinta alta    #E8E2D6   títulos
Tinta suave   #8A7B65   texto secundario, captions
Acento        #84724D   bronce — CTA, iconos, datos
Acento claro  #B8AE9C   piedra — hover, gradientes
Línea         rgba(255,255,255,0.08)
```

Acentos de marca, en dosis pequeñas: terracota `#8B2E1B`, olivo `#6B6826`, arena `#A8956A`, pizarra `#607384`.

> Sobre carbón, la terracota `#8B2E1B` **no alcanza contraste para texto** (3.4:1). Para texto de aviso usa `#D67A62`.

## Jerarquía tipográfica

| Rol | Fuente | Tamaño | Peso | Tracking |
|---|---|---|---|---|
| Display / hero | Ranade | `clamp(2.3rem, 5.8vw, 5.2rem)` | 400 | `-0.025em` |
| H2 sección | Ranade | `clamp(2rem, 4vw, 3.2rem)` | 500 | `-0.02em` |
| H3 card | Space Grotesk | 17–20px | 700 | `0` |
| Cuerpo | Space Grotesk | 15–16px / 1.7 | 400 | `0` |
| Caption | Space Grotesk | 13px / 1.6 | 400 | `0` |
| Overline | Space Grotesk | 12px | 600 | `0.15em` MAYÚSCULAS |

## Firmas visuales que debes reproducir

- **Overline con línea:** una raya de 8–12px (`bg-nv-ink/40`) + etiqueta en mayúsculas antes de cada título de sección.
- **Gradiente de texto:** en una o dos palabras del título, `linear-gradient(to right, #DCD7C9, #84724D)` con `background-clip: text`. Máximo una vez por sección.
- **Cards de vidrio:** `bg-white/[0.03]`, `border border-white/[0.05]`, `rounded-2xl`, hover a `border-nv-ink/20`.
- **Botón primario:** píldora con `linear-gradient(to right, #DCD7C9, #B8AE9C)`, texto `#1A1410`.
- **Glow de fondo:** círculo grande con `blur(100–150px)` y opacidad 0.04–0.08 en bronce o crema, `pointer-events-none`.
- **Grano de película** (`.film-grain`) sobre superficies cinemáticas, `opacity: .05`, `mix-blend-mode: soft-light`.

## Copy

Español de México, segunda persona, frases cortas. Tono sereno y concreto — nunca superlativos de marketing. Escribe "construyendo la primera red…", no "la primera red…". Números siempre con contexto y unidad.

## Antipatrones — no hagas esto

- Gradientes saturados de fondo completo (morado/azul).
- Cards blancas sobre fondo claro con sombra dura.
- Iconos multicolor o ilustraciones vectoriales inventadas: usa `lucide-react` monocromo o fotografía real.
- Bordes de acento a la izquierda tipo "callout" de documentación.
- Tablas densas sin aire; en Navana la tabla respira o se vuelve lista.
- Más de dos pesos tipográficos visibles en la misma pantalla.
