import { NextResponse } from 'next/server';

const PALABRAS_CLAVE = {
  vivienda: ['vivienda', 'alquiler', 'inquilino', 'habitacional', 'propiedad'],
  educacion: ['educación', 'escuela', 'docente', 'estudiante', 'vacante escolar'],
  salud: ['salud', 'hospital', 'CESAC', 'médico', 'sanitario'],
  transporte: ['transporte', 'subte', 'colectivo', 'tránsito', 'metrobus'],
  empleo: ['empleo', 'trabajo', 'desempleo', 'laboral', 'PYME'],
  seguridad: ['seguridad', 'delito', 'robo', 'policía', 'crimen'],
  ambiente: ['ambiente', 'reciclaje', 'contaminación', 'espacios verdes', 'residuos'],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tema = searchParams.get('tema') || 'vivienda';

  const apiKey = process.env.NEWSAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'NEWSAPI_KEY no configurada. Obtené tu clave gratuita en newsapi.org y agregala como variable de entorno.',
        noticias: [],
      },
      { status: 200 }
    );
  }

  const palabras = PALABRAS_CLAVE[tema] || [tema];
  const query = encodeURIComponent(
    `(${palabras.join(' OR ')}) AND ("Buenos Aires" OR "CABA")`
  );

  const url = `https://newsapi.org/v2/everything?q=${query}&language=es&sortBy=publishedAt&pageSize=9&apiKey=${apiKey}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.status === 'error') {
      return NextResponse.json({ error: data.message, noticias: [] }, { status: 200 });
    }

    const noticias = (data.articles || []).map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      source: a.source?.name || 'Desconocido',
      publishedAt: a.publishedAt,
    }));

    return NextResponse.json({ noticias });
  } catch {
    return NextResponse.json(
      { error: 'Error al conectar con NewsAPI.', noticias: [] },
      { status: 200 }
    );
  }
}
