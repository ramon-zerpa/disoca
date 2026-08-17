# Plan de Refactorización — disoca.com

## Objetivo
Refrescar y modernizar el sitio one-page de DISOCA, migrando de WordPress a Astro 5, manteniendo el contenido e imágenes originales del sitio legacy (capturado en Wayback Machine el 24 de marzo de 2025).

## Stack Tecnológico
- **Framework:** Astro 5 (modo estático)
- **Estilos:** Tailwind CSS 4
- **Tipado:** TypeScript
- **Formulario:** Web3Forms o Formspree (integración sin backend)
- **Despliegue:** Por definir (Cloudflare Pages, Netlify o Vercel)

## Estructura del Proyecto

```
disoca/
├── astro.config.mjs          # Configuración del sitio
├── public/                   # favicon, robots.txt, sitemap
├── src/
│   ├── assets/images/        # Imágenes procesadas por Astro
│   ├── content/              # Contenido textual (opcional, en data/site.ts)
│   ├── data/
│   │   └── site.ts           # ✏️ Nav, servicios, áreas, proceso, oficinas, contadores
│   ├── layouts/
│   │   └── BaseLayout.astro  # Meta SEO, Open Graph, fuentes, smooth scroll
│   ├── components/
│   │   ├── TopBar.astro      # Países, email, Instagram, WhatsApp
│   │   ├── Header.astro      # Navegación + menú móvil
│   │   ├── Hero.astro        # Banner principal con CTAs
│   │   ├── ServiceCards.astro # 3 tarjetas de servicios
│   │   ├── About.astro       # Visión/Misión + contadores
│   │   ├── History.astro     # Historia de la empresa
│   │   ├── Skills.astro      # 5 barras de habilidades animadas
│   │   ├── Areas.astro       # 5 tarjetas con imágenes
│   │   ├── Process.astro     # 4 pasos del proceso
│   │   ├── Portfolio.astro   # Galería de obras destacadas
│   │   ├── Contact.astro     # Tabs por país + formulario
│   │   └── Footer.astro
│   └── pages/
│       └── index.astro       # Página principal (compone todos los componentes)
└── PLAN.md                   # Este archivo
```

## Fases de Ejecución

### Fase 1 — Recuperación de Assets
**Estado:** ✅ Completada (28/28 imágenes)

Descargadas directamente del servidor original (162.241.148.86) — mejor calidad que Wayback:
- ✅ `logo-disoca.jpg`, `hero-bg.jpg`, `bg-16.jpg`, `bg-44.jpg`
- ✅ `servicio-obras-electricas.jpg`, `servicio-metalmecanica.jpg`, `servicio-construccion-civil.jpg`
- ✅ `empresa-pic.jpg`, `historia-img.jpg`, `habilidades-img.jpg`
- ✅ `area-electrica.jpg`, `area-metalmecanica.jpg`, `area-construccion-civil.jpg`, `area-geotecnica.jpg`, `area-asfaltado.jpg`
- ✅ `obra-01.jpg` a `obra-13.jpg` (13 imágenes de galería)

**Valores reales extraídos del HTML legacy:**
- Contadores: 27+ años, 146+ obras, 101+ equipos, 18+ ingenieros
- Habilidades: Eléctricas 100%, Metalmecánica 80%, Civil 90%, Geotécnica 80%, Asfaltado 70%

### Fase 2 — Setup del Proyecto
**Estado:** ✅ Completada
1. Inicializar proyecto Astro 5 con TypeScript
2. Instalar y configurar Tailwind CSS 4
3. Crear estructura de directorios y archivos base
4. Configurar `data/site.ts` con contenido extraído del legacy

### Fase 3 — Construcción de Secciones
**Estado:** ✅ Completada
1. Construir `BaseLayout.astro` con meta SEO, Open Graph y smooth scroll
2. Construir `Header.astro` y `Footer.astro`
3. Construir secciones en orden:
   - TopBar (países, contacto, redes)
   - Hero (banner principal)
   - ServiceCards (3 servicios)
   - About (Visión/Misión + contadores)
   - History (historia + CTA)
   - Skills (5 barras animadas)
   - Areas (5 tarjetas con imagen)
   - Process (4 pasos)
   - Portfolio (galería 13 obras)
   - Contact (tabs + formulario)
4. Implementar `Counters` y `Skills` con Intersection Observer (script inline ~30 líneas)
5. Galería con `<Picture>` de Astro → AVIF/WebP + lazy loading
6. Responsive completo + accesibilidad (anclas, alt texts, focus states)

### Fase 4 — Formulario y Detalles
**Estado:** ⏳ Pendiente (formulario con placeholder de Formspree, listo para configurar)
1. Integrar Web3Forms o Formspree (apuntar a info@disoca.com)
2. Configurar contadores con valores estimados:
   - **30+ años** en el mercado
   - **100+ obras** ejecutadas
   - **50+ maquinarias** y equipos
   - **25+ ingenieros** y especialistas
3. SEO: meta description, Open Graph (imagen = logo/hero), sitemap con `@astrojs/sitemap`

### Fase 5 — QA y Deploy
**Estado:** ⏳ Pendiente
1. `npm run build` sin errores
2. Revisión visual sección por sección vs. captura legacy (Wayback)
3. Lighthouse ≥95 en:
   - Performance
   - SEO
   - Accesibilidad
   - Best Practices
4. Preparar configuración de deploy agnóstica (funciona en Cloudflare/Netlify/Vercel)
5. Documentar migración de DNS cuando se defina la plataforma

## Contenido Extraído del Legacy (Wayback 2025-03-24)

### Secciones
1. **Top Bar** — Venezuela, Panamá, República Dominicana, Colombia | Info@disoca.com | Instagram | WhatsApp
2. **Header/Nav** — Inicio, Nosotros, Servicios, Portafolio, Contacto
3. **Hero** — "Ingeniería y Construcción desde 1992" + 2 CTAs + imagen
4. **3 Cards de Servicios** — Obras Eléctricas, Metalmecánica, Construcción Civil
5. **Nuestra Empresa** — Visión / Misión + 4 contadores animados
6. **Nuestra Historia** — Texto + CTA
7. **Habilidades** — Barras de progreso (5 áreas)
8. **Áreas de Desempeño** — 5 cards con imagen
9. **Proceso Integrado** — 4 pasos (Evaluación, IPC, Comisionamiento, Operación)
10. **Obras Destacadas** — Galería de ~13 fotos
11. **Contacto** — Tabs por país (4 oficinas) + formulario
12. **Footer**

### Imágenes a Descargar
- Logo: `disoca-logo.jpg`
- Hero: `hero-ingenieria.jpg` (o similar del banner)
- Servicios: `ingenieria-electrica.jpg`, `metal-mecanica.jpg`, `ingenieria-civil.jpg`
- Empresa: `pic_9-1.jpg`
- Áreas: `area-electrica.jpg`, `area-metalmecanica.jpg`, `area-construccion-civil.jpg`, `servicio-geotecnica.jpg`, `asfaltado-servicio.jpg`
- Galería (13 obras): `20170201_104605.jpg`, `20161126_112449.jpg`, `IMG_0359.jpg`, `20170120_090313.jpg`, `IMG_0352.jpg`, `dominicana-galeria-2.jpg`, `dominicana-galeria-4.jpg`, `dominicana-galeria-5.jpg`, `IMG_20161118_104500.jpg`, `dominicana-galeria-1.jpg`, `IMG_20161117_145826.jpg`, `20170128_100550.jpg`, `20161220_105119.jpg`

## Datos de Contacto (Legacy)

### Oficinas
1. **Venezuela**
   - Dirección: Av. Industrial, frente a zona industrial Condibaca, galpón DISOCA, Nro 5, Barinas, estado Barinas
   - Teléfono: 0273 5420239
   - Email: info@disoca.com
   - Horario: Lunes - Viernes 8:00AM - 6:00PM

2. **Panamá**
   - Dirección: Calle 50, edificio Plaza Morica, ciudad de Panamá
   - Teléfono: +58 274 2713694
   - Email: info@disoca.com
   - Horario: Lunes - Viernes 8:00AM - 6:00PM

3. **República Dominicana**
   - Dirección: Boulevard del Este, Parque Tecnológico de Punta Cana, Punta Cana, La Altagracia
   - Teléfono: +1 809 203 1102
   - Email: info@disoca.com
   - Horario: Lunes - Viernes 8:00AM - 6:00PM

4. **Colombia**
   - Dirección: Calle 122 # 7A 69 oficina 202, Bogotá
   - Teléfono: +57 301 5350576
   - Email: info@disoca.com
   - Horario: Lunes - Viernes 8:00AM - 6:00PM

### Redes Sociales
- Instagram: @disoca_int
- WhatsApp: +1 829 550 0128 (enlace con mensaje predefinido "DISOCA")

## Fuera de Alcance (Por Ahora)
- Cambios de contenido o diseño
- i18n multi-idioma
- Blog o CMS headless
- Funcionalidades adicionales no presentes en el legacy

---

**Última actualización:** 15 de agosto de 2026
