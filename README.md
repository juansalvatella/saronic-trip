# Golfo Sarónico · Cuaderno de Bitácora

Web interactiva para la tripulación de la travesía de 5 días por el Golfo Sarónico desde Marina Alimos (Atenas), julio 2026.

Incluye ruta día a día, minicurso de navegación, roles de tripulación, equipaje, glosario náutico, protocolos VHF, ocio, pesca y checklists de seguridad — todo con progreso guardado en `localStorage`.

## Stack

- **Astro 4** — generador estático
- **React 18** como isla interactiva
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía
- Deploy a **GitHub Pages** vía Actions

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321/saronic-trip` (el `base` del path está configurado en `astro.config.mjs`).

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages

### 1. Crear el repositorio

```bash
# Desde dentro de esta carpeta
git init
git add .
git commit -m "Cuaderno de bitácora inicial"
git branch -M main
git remote add origin https://github.com/juansalvatella/saronic-trip.git
git push -u origin main
```

### 2. Configurar el path en `astro.config.mjs`

Edita `astro.config.mjs` y reemplaza:

```js
site: 'https://juansalvatella.github.io',
base: '/saronic-trip',
```

- `juansalvatella` → tu usuario de GitHub
- `/saronic-trip` → nombre del repositorio (si lo llamas distinto, cámbialo aquí)

Si lo despliegas en un dominio raíz (no en `/repo/`), borra la línea `base`.

### 3. Activar GitHub Pages

En el repo en GitHub → **Settings → Pages**:
- Source: **GitHub Actions**

Con el primer push a `main` se lanzará el workflow `.github/workflows/deploy.yml` y desplegará en `https://juansalvatella.github.io/saronic-trip/`.

## Estructura

```
saronic-trip/
├── .github/workflows/deploy.yml   # CI/CD a GitHub Pages
├── public/favicon.svg             # Icono (ancla)
├── src/
│   ├── components/SaronicoTrip.jsx   # Componente React principal
│   ├── layouts/Layout.astro          # Layout base
│   └── pages/index.astro             # Página única
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Personalización rápida

- **Datos de la ruta, nudos, glosario, etc.** → todo en `src/components/SaronicoTrip.jsx` como arrays al principio del componente.
- **Estilo (colores, tipografía)** → variables CSS y clases inline al principio del componente. Paleta actual: tinta `#1a3147`, papel `#f1e8d4`, acento rojo `#8b2a14`.
- **Reparto de roles para 10 tripulantes** → busca `rolesData` en el componente y ajusta nombres.

## Compartir con la tripulación

Una vez desplegado, compártelo como URL o como código QR en el grupo de WhatsApp del viaje. Cada uno marcará su progreso desde su móvil (se guarda local).

---

Hecho con prisa marítima, julio MMXXVI.
