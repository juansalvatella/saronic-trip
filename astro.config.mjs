// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// IMPORTANTE: Cambia 'TU-USUARIO' por tu usuario de GitHub
// y 'saronico' por el nombre de tu repositorio si es diferente.
// Si despliegas en un dominio raíz (no en /repo/), borra la línea `base`.
export default defineConfig({
  site: 'https://juansalvatella.github.io',
  base: '/saronic-trip/',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
});
