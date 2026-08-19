# Regla Responsive — disoca.com

## Breakpoints fijos (no modificar)

| Breakpoint | Ancho       | Uso                                                              |
|------------|-------------|------------------------------------------------------------------|
| `360px`    | ≤ 360       | Móvil compacto (base). Todo diseño parte desde aquí.             |
| `768px`    | ≥ 768 (md)  | Tablet / móvil horizontal. Ajustes de spacing y grillas.          |
| `1024px`   | ≥ 1024 (lg) | **Desktop.** El menú de navegación completo se muestra desde aquí.|
| `1440px`   | ≥ 1440 (xl) | Escritorio amplio / pantallas grandes. Contenido centrado.       |

## Regla del menú
- **Menú responsive (hamburguesa / overlay):** se usa desde `1024px` hacia abajo (`lg`).
- En `≥ 1024px` (`lg` y superiores) se muestra siempre la navegación completa de escritorio.
- Clases Tailwind a usar: `hidden lg:flex` (nav desktop), `lg:hidden` (botón + menú móvil).

## Implementación en Tailwind (ya aplicada)
- `src/components/v3/Header.astro` — botón y menú móvil con `lg:hidden`; nav con `hidden lg:flex`.

## Convenciones por sección
- Tipografía display: usar `clamp(min, vw, max)` para titulares (ya definido en componentes v3).
- Padding de sección: `px-5 md:px-10` (móvil compacto → tablet/desktop).
- Grillas: partir de `grid-cols-1` o `grid-cols-2` en móvil, expandir en `md`/`lg`/`xl`.
- Imágenes: siempre `object-cover` + `w-full`; nunca fijas en px.
- Test de cada componente: 360px → 768px → 1024px → 1440px.