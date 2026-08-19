# DISOCA — Ingeniería y Construcción desde 1992

Sitio web de **DISOCA**, empresa de soluciones integradas de ingeniería, procura y construcción (obras eléctricas, metalmecánica, construcción civil, geotécnica y vialidad/asfaltado), con presencia en Venezuela, Panamá, República Dominicana y Colombia.

## Stack

- [Astro](https://astro.build) 7 (estático)
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript

## Estructura del sitio

Versión única: **V3** en `/v3` (tema claro "Juego de planos" — láminas de dibujo técnico, Anton + IBM Plex). `/` redirige a `/v3`. Versiones v1/v2 descartadas.

- `src/components/v3/` — componentes de la versión
- `src/layouts/V3Layout.astro` — layout
- `src/data/site.ts` — todo el contenido (servicios, contadores, oficinas, proceso)
- `public/images/` — assets reales del sitio legacy + `public/images/stock/` (fotos Magnific/Freepik)

## Desarrollo

```bash
npm install
npm run dev      # dev server en http://localhost:4325
npm run build    # build estático en dist/
npm run preview  # previsualizar el build
```

## Regla responsive (fija)

Breakpoints: **360px (base) · 768px (md) · 1024px (lg) · 1440px (xl)**.
Menú de escritorio desde `>=1024px`; menú hamburguesa/overlay por debajo de `1024px`. Detalle en `RESPONSIVE.md`.

## Deploy

Build estático de Astro — compatible con Vercel, Netlify, Cloudflare Pages, etc.

## Licencia

Contenido y assets © DISOCA. Uso interno del proyecto.
