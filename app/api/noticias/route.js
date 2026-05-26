import { NextResponse } from 'next/server';

// ─── Palabras clave por tema ───────────────────────────────────────────────────
// Cada tema incluye términos específicos + "CABA" o "Buenos Aires" como contexto
const QUERIES = {
  vivienda:    'vivienda CABA OR alquiler "Buenos Aires" OR déficit habitacional porteño',
  educacion:   'educación CABA OR vacantes escolares "Buenos Aires" OR docentes porteños',
  salud:       'salud CABA OR hospital "Buenos Aires" OR CESAC porteño',
  transporte:  'transporte CABA OR subte "Buenos Aires" OR colectivo porteño',
  empleo:      'empleo CABA OR trabajo "Buenos Aires" OR desempleo porteño',
  seguridad:   'seguridad CABA OR delito "Buenos Aires" OR policía porteña',
  ambiente:    'ambiente CABA OR contaminación "Buenos Aires" OR reciclaje porteño',
};

// ─── GNews API (recomendado — funciona en Vercel gratis, 100 req/día) ─────────
async function fetchGNews(tema, apiKey) {
  const q = encodeURIComponent(QUERIES[tema] || tema);
  const url = `https://gnews.io/api/v4/search?q=${q}&lang=es&country=ar&max=9&sortby=publishedAt&token=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();

  if (data.errors) {
    return NextResponse.json({ error: data.errors.join(', '), noticias: [] });
  }

  const noticias = (data.articles || []).map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    source: a.source?.name || 'Desconocido',
    publishedAt: a.publishedAt,
    image: a.image || null,
  }));

  return NextResponse.json({ noticias, source: 'gnews' });
}

// ─── NewsAPI (solo funciona en localhost, no en producción) ───────────────────
async function fetchNewsAPI(tema, apiKey) {
  const palabras = QUERIES[tema]?.split(' ').slice(0, 3) || [tema];
  const q = encodeURIComponent(`(${palabras.join(' OR ')}) AND ("Buenos Aires" OR "CABA")`);
  const url = `https://newsapi.org/v2/everything?q=${q}&language=es&sortBy=publishedAt&pageSize=9&apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  const data = await res.json();

  if (data.status === 'error') {
    return NextResponse.json({ error: data.message, noticias: [] });
  }

  const noticias = (data.articles || []).map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    source: a.source?.name || 'Desconocido',
    publishedAt: a.publishedAt,
    image: null,
  }));

  return NextResponse.json({ noticias, source: 'newsapi' });
}

// ─── Handler principal ────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tema = searchParams.get('tema') || 'vivienda';

  const gnewsKey  = process.env.GNEWS_KEY;
  const newsapiKey = process.env.NEWSAPI_KEY;

  try {
    // 1. GNews tiene prioridad — funciona en Vercel sin restricciones
    if (gnewsKey) {
      return await fetchGNews(tema, gnewsKey);
    }

    // 2. NewsAPI como fallback (solo útil en localhost)
    if (newsapiKey) {
      return await fetchNewsAPI(tema, newsapiKey);
    }

    // 3. Sin API configurada
    return NextResponse.json({
      error: 'API de noticias no configurada. Agregá GNEWS_KEY en las variables de entorno de Vercel (gratis en gnews.io).',
      noticias: [],
    });
  } catch (err) {
    return NextResponse.json({
      error: `Error al cargar noticias: ${err.message}`,
      noticias: [],
    });
  }
}
