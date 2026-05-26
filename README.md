# Leandro Santoro — Es Ahora Buenos Aires

Página web oficial con propuestas, misiones y datos reales de CABA.

## Stack

- **Next.js 14** con App Router
- **Tailwind CSS**
- **NewsAPI** para noticias automáticas
- Deploy en **Vercel** (gratis)

## Inicio rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editá `.env.local` y agregá tu clave de NewsAPI:

```
NEWSAPI_KEY=tu_clave_aqui
```

Obtén una clave gratuita en [newsapi.org](https://newsapi.org/).

### 3. Correr en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

### 4. Build de producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Subí el proyecto a GitHub
2. Conectá el repo en [vercel.com](https://vercel.com)
3. En **Settings → Environment Variables**, agregá:
   - `NEWSAPI_KEY` → tu clave de NewsAPI
4. Deploy automático en cada push

## Secciones

| Sección | Descripción |
|---------|-------------|
| Hero | Presentación de Leandro Santoro |
| Misiones | 5 misiones con datos duros expandibles |
| Proyectos | Links a buscadores HCDN y Legislatura CABA |
| Redes | X, Instagram, TikTok |
| Institucional | Noticias automáticas filtradas por tema |
| Videos | Entrevistas en YouTube |

## API

`GET /api/noticias?tema=vivienda`

Temas disponibles: `vivienda`, `educacion`, `salud`, `transporte`, `empleo`, `seguridad`, `ambiente`.

Requiere `NEWSAPI_KEY` configurada.
