# Navana — Recetas de componentes

Código listo para copiar. Tailwind v4 con los tokens de `tokens/navana.tailwind.css`. Los equivalentes en CSS plano usan las variables de `tokens/navana.css`.

---

## Botones

**Primario** — píldora crema con gradiente, texto carbón. Uno por sección.

```tsx
<button className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 bg-gradient-to-r from-nv-cream to-nv-stone text-nv-bg font-semibold text-nv-sm transition-shadow duration-[420ms] ease-nv hover:shadow-nv-glow">
  Agenda una llamada
  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
</button>
```

**Secundario** — contorno sobre vidrio.

```tsx
<button className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 border border-nv-line-strong text-nv-ink text-nv-sm transition-colors duration-[220ms] ease-nv hover:bg-white/[0.06]">
  Ver el terreno
</button>
```

**Terciario** — texto con subrayado que crece en hover.

```tsx
<button className="group inline-flex items-center gap-1.5 text-nv-ink-muted text-nv-sm transition-colors hover:text-nv-ink">
  Conocer más
  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-[220ms] ease-nv group-hover:translate-x-0.5" strokeWidth={1.5} />
</button>
```

Todos: `min-height: 44px` en móvil, foco `focus-visible:outline-2 focus-visible:outline-nv-accent focus-visible:outline-offset-2`.

---

## Encabezado de sección

El patrón más repetido del sistema: overline con raya, titular Ranade con una palabra en gradiente, párrafo de apoyo.

```tsx
<div className="flex items-center gap-3 mb-6">
  <span className="w-8 h-px bg-nv-ink/40" />
  <span className="text-nv-xs font-semibold tracking-overline uppercase text-nv-ink/60">
    El modelo
  </span>
</div>

<h2 className="font-display text-h2 font-medium leading-[1.1] tracking-display text-nv-ink-hi text-balance max-w-[18ch]">
  Tierra, diseño y operación en una{' '}
  <span className="bg-gradient-to-r from-nv-cream to-nv-bronze bg-clip-text text-transparent">
    sola red
  </span>
</h2>

<p className="mt-6 max-w-[68ch] text-nv-base leading-relaxed text-nv-ink-muted text-pretty">
  Aportas el terreno. Nosotros diseñamos, fabricamos, instalamos y operamos.
</p>
```

Regla: **una sola palabra o frase corta en gradiente**, y sólo una vez por sección.

---

## Card de vidrio

```tsx
<div className="group relative overflow-hidden rounded-nv-lg border border-nv-line-soft bg-white/[0.03] p-8 transition-all duration-[420ms] ease-nv hover:border-nv-ink/20 hover:bg-white/[0.06]">
  <span className="block text-nv-xs font-semibold tracking-overline uppercase text-nv-accent">01</span>
  <h3 className="mt-4 text-nv-md font-bold text-nv-ink-hi">Entorno natural</h3>
  <p className="mt-2 text-nv-sm leading-relaxed text-nv-ink-muted">
    Rodeado de paisaje, vegetación o vistas privilegiadas.
  </p>
</div>
```

Variante con icono: `<Icon className="w-5 h-5 text-nv-accent" strokeWidth={1.5} />` sobre el título, sin contenedor circular de color.

---

## Métrica

```tsx
<div className="flex flex-col gap-1.5">
  <span className="text-nv-xs font-semibold tracking-overline uppercase text-nv-ink-muted">
    Retorno estimado
  </span>
  <span className="font-body text-nv-2xl font-medium tracking-tight text-nv-ink-hi tabular-nums">
    26.6%
  </span>
  <span className="text-nv-sm text-nv-ink-muted">TIR a 10 años · recuperación en 3.8 años</span>
</div>
```

Nunca una cifra sin su etiqueta y su contexto debajo.

---

## Input

```tsx
<label htmlFor="email" className="block mb-2.5 text-nv-sm font-semibold text-nv-ink">
  Correo
</label>
<input
  id="email"
  type="email"
  placeholder="tu@correo.com"
  className="w-full rounded-nv-md border border-nv-line bg-white/[0.04] px-5 py-4 text-nv-base text-nv-ink placeholder:text-nv-ink-muted/40 transition-all duration-[300ms] ease-nv focus:border-nv-ink/40 focus:bg-white/[0.06] focus:outline-none focus:shadow-[0_0_20px_rgba(132,114,77,0.08)]"
/>
```

Error: borde `border-nv-danger` + texto `text-nv-danger` de 13px debajo. Nunca sólo color.

---

## Barra de navegación

Fija, translúcida, con desenfoque. Isotipo + logotipo a la izquierda, enlaces al centro-derecha, CTA píldora al final.

```tsx
<nav className="fixed inset-x-0 top-0 z-[90]">
  <div className="absolute inset-0 bg-nv-bg/70 backdrop-blur-2xl border-b border-white/[0.04]" />
  <div className="relative mx-auto flex max-w-nv items-center justify-between px-gutter py-4">
    <a href="/" className="flex items-center gap-2.5 text-nv-ink">
      <NavanaIsotipo className="h-3 w-auto" />
      <NavanaLogotype className="h-3.5 w-auto" />
    </a>
    <div className="hidden items-center gap-1 lg:flex">
      {links.map(l => (
        <a key={l.href} href={l.href}
           className="rounded-full px-5 py-2 text-nv-sm text-nv-ink/60 transition-all duration-[300ms] ease-nv hover:bg-white/[0.08] hover:text-nv-ink">
          {l.label}
        </a>
      ))}
    </div>
  </div>
</nav>
```

Las secciones ancladas necesitan `scroll-margin-top: 80px`.

---

## Sección con fondo fotográfico

```tsx
<section className="relative isolate min-h-screen overflow-hidden">
  <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover nv-kenburns" />
  <div className="absolute inset-0 bg-gradient-to-t from-nv-bg via-nv-bg/40 to-transparent" />
  <div className="nv-film-grain absolute inset-0" />
  <div className="relative z-10 flex min-h-screen flex-col justify-end px-gutter pb-section">
    <h1 className="font-display text-display font-normal leading-[1.05] tracking-display text-nv-ink-hi text-balance max-w-[16ch]">
      Tu terreno ya vale más de lo que produce.
    </h1>
  </div>
</section>
```

El velo (`gradient-to-t`) no es opcional: sin él el texto pierde contraste.

---

## Glow de fondo

Ambiente, nunca decoración visible. Uno o dos por sección, jamás más.

```tsx
<div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-nv-accent/[0.05] blur-[120px]" />
```

---

## Revelado al hacer scroll

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.62, ease: [0.22, 0.61, 0.36, 1], delay: i * 0.07 }}
>
  {children}
</motion.div>
```

`delay` escalonado de 70ms, máximo 5 elementos. Nunca `scale` ni `rotate` en contenido.

---

## Lista en vez de tabla

Navana prefiere listas con aire sobre tablas densas. Si necesitas tabla, dale respiración:

```tsx
<div className="divide-y divide-nv-line-soft">
  {rows.map(r => (
    <div key={r.id} className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-5">
      <span className="text-nv-base text-nv-ink">{r.label}</span>
      <span className="text-nv-base text-nv-ink-hi tabular-nums">{r.value}</span>
    </div>
  ))}
</div>
```

`py-5` mínimo por fila. Sin bordes verticales, sin rayado de fondo alterno.

---

## Componentes de logo

```tsx
export function NavanaLogotype({ className = '', height = 14 }) {
  return (
    <svg viewBox="0 0 323 49" height={height} fill="currentColor"
         className={className} role="img" aria-label="Navana">
      {/* paths de assets/navana-logotype.svg */}
    </svg>
  );
}
```

Hereda color con `currentColor`. Nunca pases un hex fijo salvo que el contexto lo exija.
