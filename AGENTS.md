# AGENTS.md — Reglas fijas del proyecto disoca.com

## Navegador (REGLAs FIJAS)

- **Siempre usar Google Chrome** (`chrome.exe`) como navegador para:
  - Cargar/inspeccionar páginas locales y de prueba.
  - Capturar screenshots (`--headless=new --screenshot`).
  - Verificar responsive y comportamiento del DOM.
- **NUNCA usar el tool `pencil_browser`** ni ninguna herramienta MCP de Pencil.
- Ruta típica de Chrome en este equipo:
  - `C:\Program Files\Google\Chrome\Application\chrome.exe`
  - `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
- Uso headless estándar:
  ```pwsh
  & $chrome --headless=new --disable-gpu --user-data-dir="$env:TEMP\opencode\edge-$w" `
    --screenshot="out.png" --window-size="1440,4000" --hide-scrollbars `
    --virtual-time-budget=9000 "http://localhost:4325/v2/"
  ```

## Responsive (REGLAs FIJAS)

- Breakpoints: **360px (base) · 768px (md) · 1024px (lg) · 1440px (xl)**.
- **Menú:** nav de escritorio desde `>=1024px`; menú responsive (hamburguesa/overlay) por debajo de `1024px`.
- Detalle completo en `RESPONSIVE.md`.

## Stack

- Astro (estático) + Tailwind CSS 4 + TypeScript.
- Dev server: `npx astro dev --port 4325`.
- Página principal v2: `/v2` (`src/pages/v2.astro`); v1 en `/`.
