'use client';

import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════════════════════════════════════════

const MISIONES = [
  {
    id: 1,
    titulo: 'Humanizar Buenos Aires',
    subtitulo: 'Derecho a la ciudad para todos y todas',
    icon: '🏠',
    descripcion:
      'Garantizar que cada porteño y porteña acceda a una vivienda digna, educación de calidad y salud sin barreras. Buenos Aires debe ser humana antes que eficiente.',
    temas: [
      {
        nombre: 'Vivienda',
        icon: '🏘️',
        datos: [
          { label: 'Déficit habitacional', valor: '~180.000 hogares', color: 'red' },
          { label: 'Aumento promedio alquiler anual', valor: '+250%', color: 'red' },
          { label: 'Familias en situación de calle', valor: '2.500+', color: 'red' },
          { label: 'Inquilinos sin acceso a crédito', valor: '85%', color: 'yellow' },
        ],
        fuente: 'GCBA / INDEC / Relevamiento ACIJ 2024',
      },
      {
        nombre: 'Educación',
        icon: '📚',
        datos: [
          { label: 'Chicos sin vacante escolar', valor: '35.000+', color: 'red' },
          { label: 'Escuelas con infraestructura deficiente', valor: '42%', color: 'yellow' },
          { label: 'Aumento salarial docente (5 años)', valor: '-15% real', color: 'red' },
          { label: 'Tasa de abandono escolar', valor: '8,5%', color: 'yellow' },
        ],
        fuente: 'Ministerio de Educación CABA / CIPPEC 2024',
      },
      {
        nombre: 'Salud',
        icon: '🏥',
        datos: [
          { label: 'CESAC con servicio 24/7', valor: '45%', color: 'yellow' },
          { label: 'Tiempo de espera en urgencias', valor: '4–6 hs', color: 'red' },
          { label: 'Cobertura pública efectiva', valor: '38%', color: 'red' },
          { label: 'Centros con falta de medicamentos', valor: '25%', color: 'yellow' },
        ],
        fuente: 'Ministerio de Salud GCBA / Auditoría General CABA 2024',
      },
    ],
  },
  {
    id: 2,
    titulo: 'Agilizar la Ciudad',
    subtitulo: 'Moverse por Buenos Aires no puede ser un calvario',
    icon: '🚇',
    descripcion:
      'Reducir los tiempos de viaje, modernizar el transporte público y mejorar la infraestructura vial para que la ciudad fluya y sea accesible para todos.',
    temas: [
      {
        nombre: 'Transporte Público',
        icon: '🚌',
        datos: [
          { label: 'Tiempo promedio de viaje diario', valor: '65 min', color: 'yellow' },
          { label: 'Extensión de subte (2024)', valor: '0 km/año', color: 'red' },
          { label: 'Buses accesibles para discapacitados', valor: '28%', color: 'red' },
          { label: 'Viajeros diarios transporte público', valor: '6,5 millones', color: 'green' },
        ],
        fuente: 'Ministerio de Transporte GCBA / CNRT 2024',
      },
      {
        nombre: 'Infraestructura Vial',
        icon: '🛣️',
        datos: [
          { label: 'Calles con bacheos pendientes', valor: '+40%', color: 'yellow' },
          { label: 'Siniestros viales anuales', valor: '28.000+', color: 'red' },
          { label: 'Intersecciones sin semáforo LED', valor: '35%', color: 'yellow' },
          { label: 'Inversión vial (sobre presupuesto)', valor: '4,2%', color: 'yellow' },
        ],
        fuente: 'GCBA Presupuesto 2024 / Luchemos por la Vida',
      },
    ],
  },
  {
    id: 3,
    titulo: 'Progresar en Común',
    subtitulo: 'Empleo genuino y economía local para crecer juntos',
    icon: '💼',
    descripcion:
      'Fomentar el empleo de calidad, proteger el comercio de barrio y garantizar que el crecimiento económico llegue a todas las familias porteñas.',
    temas: [
      {
        nombre: 'Empleo',
        icon: '👷',
        datos: [
          { label: 'Desempleo en CABA', valor: '9,2%', color: 'yellow' },
          { label: 'Subempleo', valor: '18,5%', color: 'yellow' },
          { label: 'Trabajadores en economía informal', valor: '42%', color: 'red' },
          { label: 'Caída ingresos reales (2 años)', valor: '-18%', color: 'red' },
        ],
        fuente: 'EPH-INDEC / Observatorio Social GCBA 2024',
      },
      {
        nombre: 'Comercio Local',
        icon: '🏪',
        datos: [
          { label: 'Comercios cerrados (2023–2024)', valor: '12.000+', color: 'red' },
          { label: 'Incremento en costos operativos', valor: '+320%', color: 'red' },
          { label: 'PYMES con acceso a crédito', valor: '22%', color: 'yellow' },
          { label: 'Reducción consumo minorista', valor: '-8% real', color: 'yellow' },
        ],
        fuente: 'Federación Económica CABA / CAC 2024',
      },
    ],
  },
  {
    id: 4,
    titulo: 'Proteger con Eficacia',
    subtitulo: 'Seguridad real con derechos humanos garantizados',
    icon: '🛡️',
    descripcion:
      'Una ciudad segura se construye con presencia estatal, justicia social y respeto irrestricto a los derechos humanos. La seguridad no es represión.',
    temas: [
      {
        nombre: 'Seguridad Pública',
        icon: '🚔',
        datos: [
          { label: 'Homicidios (2024)', valor: '280+', color: 'red' },
          { label: 'Robos a personas por día', valor: '400+', color: 'red' },
          { label: 'Sensación de inseguridad', valor: '72%', color: 'red' },
          { label: 'Denuncias resueltas', valor: '15%', color: 'red' },
        ],
        fuente: 'SNIC / Ministerio de Seguridad GCBA 2024',
      },
      {
        nombre: 'Derechos Humanos',
        icon: '✊',
        datos: [
          { label: 'Juicios de lesa humanidad en curso', valor: '23 causas', color: 'green' },
          { label: 'Sitios de memoria activos', valor: '14', color: 'green' },
          { label: 'Denuncias por violencia institucional', valor: '+35%', color: 'red' },
          { label: 'Presupuesto DDHH sobre total', valor: '0,4%', color: 'yellow' },
        ],
        fuente: 'GCBA / CELS / Ministerio de DDHH Nación 2024',
      },
    ],
  },
  {
    id: 5,
    titulo: 'Ordenar la Ciudad',
    subtitulo: 'Ambiente sano y planificación urbana inteligente',
    icon: '🌿',
    descripcion:
      'Reducir la contaminación, ampliar los espacios verdes y planificar el crecimiento urbano con criterio ambiental y participación ciudadana.',
    temas: [
      {
        nombre: 'Medio Ambiente',
        icon: '♻️',
        datos: [
          { label: 'Días con alerta de calidad de aire', valor: '45+/año', color: 'yellow' },
          { label: 'Espacios verdes per cápita', valor: '7,3 m²/hab', color: 'yellow' },
          { label: 'Residuos diarios generados', valor: '18.000 ton', color: 'red' },
          { label: 'Reciclaje efectivo', valor: '5–8%', color: 'red' },
        ],
        fuente: 'APRA / CEAMSE / Ministerio de Ambiente GCBA 2024',
      },
      {
        nombre: 'Planificación Urbana',
        icon: '🏙️',
        datos: [
          { label: 'Torres sin EIA aprobado', valor: '35%', color: 'red' },
          { label: 'Participación ciudadana en POT', valor: '12%', color: 'red' },
          { label: 'Barrios con Plan Urbano Activo', valor: '8 de 48', color: 'yellow' },
          { label: 'Densificación sin infraestructura', valor: '+22%', color: 'yellow' },
        ],
        fuente: 'SSPLAN GCBA / ACIJ / FADU-UBA 2024',
      },
    ],
  },
];

const REDES = [
  { nombre: 'X / Twitter', usuario: '@SantoroLeandro', url: 'https://x.com/SantoroLeandro', icon: '𝕏' },
  { nombre: 'Instagram', usuario: '@leandrosantorook', url: 'https://www.instagram.com/leandrosantorook', icon: '📸' },
  { nombre: 'TikTok', usuario: '@santoroleandro', url: 'https://www.tiktok.com/@santoroleandro', icon: '🎵' },
];

const TEMAS_NOTICIAS = [
  { key: 'vivienda', label: 'Vivienda', emoji: '🏘️' },
  { key: 'educacion', label: 'Educación', emoji: '📚' },
  { key: 'salud', label: 'Salud', emoji: '🏥' },
  { key: 'transporte', label: 'Transporte', emoji: '🚌' },
  { key: 'empleo', label: 'Empleo', emoji: '👷' },
  { key: 'seguridad', label: 'Seguridad', emoji: '🚔' },
  { key: 'ambiente', label: 'Ambiente', emoji: '♻️' },
];

const TIPOS_CONTACTO = [
  { key: 'Reclamo', icon: '🔴', desc: 'Algo que no funciona en tu barrio' },
  { key: 'Propuesta', icon: '💡', desc: 'Una idea para mejorar la ciudad' },
  { key: 'Consulta', icon: '❓', desc: 'Información o consulta general' },
  { key: 'Denuncia', icon: '🚨', desc: 'Irregularidades o corrupción' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

// Usamos objetos con strings completas para que Tailwind JIT nunca las purgue
const COLOR_TEXT = { green: 'text-emerald-400', yellow: 'text-yellow-400', red: 'text-red-400' };
const COLOR_DOT  = { green: 'bg-emerald-500',   yellow: 'bg-yellow-400',   red: 'bg-red-500'   };

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#misiones', label: 'Misiones' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#redes', label: 'Redes' },
    { href: '#institucional', label: 'Noticias' },
    { href: '#contacto', label: 'Contacto' },
    { href: '#videos', label: 'Videos' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-2 border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <a href="#" className="text-emerald-400 font-black text-2xl tracking-tighter">LS</a>
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="px-3 py-2 text-sm font-medium text-zinc-300 rounded hover:text-emerald-400 hover:bg-emerald-500/10 transition-all">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden p-2 text-emerald-400 text-xl leading-none" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-zinc-950 border-t border-emerald-500/20">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center px-6 py-3 text-sm text-zinc-300 border-b border-zinc-800/60 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="pt-14 min-h-[65vh] flex items-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(16,185,129,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,.12) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/30 to-black" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-3xl section-anim anim-d0">
          <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-4 uppercase">
            Es Ahora Buenos Aires · 2025
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-6 tracking-tight">
            Leandro<br /><span className="text-emerald-400">Santoro</span>
          </h1>
          <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
            Transformar Buenos Aires es posible. Con propuestas concretas, datos reales y compromiso con cada barrio porteño.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#misiones" className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 active:scale-95 transition-all text-sm sm:text-base">
              Ver Misiones →
            </a>
            <a href="#contacto" className="px-6 py-3 border-2 border-emerald-500 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/10 active:scale-95 transition-all text-sm sm:text-base">
              Dejá tu reclamo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MISIONES
// ═══════════════════════════════════════════════════════════════════════════════

// TemaCard: acordeón independiente con stopPropagation
function TemaCard({ tema }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-700 rounded-xl overflow-hidden">
      {/* Botón del acordeón — stopPropagation evita que el clic llegue al padre */}
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900/80 hover:bg-zinc-800 transition-colors text-left"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      >
        <span className="font-semibold text-sm flex items-center gap-2 min-w-0">
          <span className="text-base leading-none flex-shrink-0">{tema.icon}</span>
          <span className="truncate">{tema.nombre}</span>
        </span>
        <span className={`text-emerald-400 text-xs flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 py-4 bg-zinc-950/70 border-t border-zinc-700/40 space-y-3">
          {tema.datos.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${COLOR_DOT[d.color] || 'bg-red-500'}`} />
              <span className="text-zinc-400 text-sm flex-1 leading-snug">{d.label}</span>
              <span className={`text-sm font-bold tabular-nums flex-shrink-0 ${COLOR_TEXT[d.color] || 'text-red-400'}`}>{d.valor}</span>
            </div>
          ))}
          <p className="text-zinc-600 text-xs pt-2 border-t border-zinc-800">Fuente: {tema.fuente}</p>
        </div>
      )}
    </div>
  );
}

// Panel de detalle de misión — aparece en ancho completo DEBAJO del grid
function MisionDetalle({ mision, onClose }) {
  return (
    <div className="mt-5 border-2 border-emerald-500 rounded-2xl overflow-hidden bg-emerald-950/20 section-anim anim-d0">
      <div className="flex items-start justify-between gap-4 px-5 sm:px-7 py-5 border-b border-emerald-500/25">
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none mt-0.5 flex-shrink-0">{mision.icon}</span>
          <div>
            <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">Misión {mision.id} de 5</p>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">{mision.titulo}</h3>
            <p className="text-zinc-400 text-sm mt-1">{mision.subtitulo}</p>
          </div>
        </div>
        <button type="button" onClick={onClose}
          className="flex-shrink-0 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-lg leading-none"
          aria-label="Cerrar">✕</button>
      </div>
      <div className="px-5 sm:px-7 py-4 border-b border-zinc-800/50">
        <p className="text-zinc-300 leading-relaxed">{mision.descripcion}</p>
      </div>
      <div className="px-5 sm:px-7 py-5">
        <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
          Datos por tema — tocá para expandir
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mision.temas.map((t) => <TemaCard key={t.nombre} tema={t} />)}
        </div>
      </div>
    </div>
  );
}

function Misiones() {
  const [activeId, setActiveId] = useState(null);
  const misionActiva = MISIONES.find((m) => m.id === activeId) || null;

  const handleSelect = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="misiones" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="section-anim anim-d1">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Programa</p>
        <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
          5 Misiones para <span className="text-emerald-400">Buenos Aires</span>
        </h2>
        <p className="text-zinc-400 mb-10 max-w-2xl text-sm sm:text-base">
          Cada misión responde a un problema real de la ciudad.{' '}
          <span className="text-zinc-200 font-medium">Tocá una tarjeta</span> para ver los datos y propuestas.
        </p>

        {/* Grid de 5 tarjetas — tamaño uniforme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {MISIONES.map((m) => {
            const isActive = activeId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelect(m.id)}
                className={`text-left p-4 sm:p-5 rounded-xl border-2 w-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.2)]'
                    : 'border-zinc-700 bg-zinc-900/50 hover:border-emerald-500/50 hover:bg-zinc-900/70 hover:-translate-y-1 card-lift'
                }`}
              >
                <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3 leading-none">{m.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  Misión {m.id}
                </span>
                <span className={`text-sm sm:text-base font-bold block leading-snug ${isActive ? 'text-emerald-300' : 'text-white'}`}>
                  {m.titulo}
                </span>
                <span className="text-zinc-500 text-xs block mt-1 leading-snug hidden sm:block">{m.subtitulo}</span>
                {isActive && (
                  <span className="mt-2 text-emerald-400 text-xs font-semibold block">Ver datos ↓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Panel de detalle — ancho completo, aparece debajo del grid */}
        {misionActiva && (
          <MisionDetalle mision={misionActiva} onClose={() => setActiveId(null)} />
        )}

        {!activeId && (
          <p className="text-center text-zinc-700 text-sm mt-6">
            ↑ Seleccioná una misión para ver los datos
          </p>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROYECTOS
// ═══════════════════════════════════════════════════════════════════════════════

function Proyectos() {
  const links = [
    {
      titulo: 'Proyectos en Diputados (Nación)',
      descripcion: 'Buscador oficial de proyectos — filtrá por autor: "Santoro, Leandro"',
      url: 'https://www.hcdn.gob.ar/proyectos/buscarPorAutor.html?apellido=SANTORO&nombre=Leandro',
      urlVotaciones: 'https://votaciones.hcdn.gob.ar/diputado/1849',
      icon: '🏛️',
      badge: 'Nación',
      badgeColor: 'border-blue-400 text-blue-400',
      extra: 'Ver votaciones de Santoro →',
    },
    {
      titulo: 'Proyectos en Legislatura CABA',
      descripcion: 'Búsqueda de expedientes — filtrá por autor: "Santoro Leandro"',
      url: 'https://parlamentaria.legislatura.gob.ar/pages/ExpedienteBusqueda.aspx',
      icon: '🗂️',
      badge: 'CABA',
      badgeColor: 'border-emerald-500 text-emerald-400',
    },
  ];

  return (
    <section id="proyectos" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 section-anim anim-d2">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Legislativo</p>
        <h2 className="text-4xl font-black mb-3 leading-tight">
          Proyectos de <span className="text-emerald-400">Ley</span>
        </h2>
        <p className="text-zinc-400 mb-10 text-sm sm:text-base">
          Accedé a los buscadores oficiales con la búsqueda lista para Santoro.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {links.map((l) => (
            <div key={l.url} className="border-2 border-zinc-700 hover:border-emerald-500 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/70 card-lift transition-all duration-200 overflow-hidden">
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="flex gap-4 items-start p-6 group">
                <span className="text-4xl leading-none mt-0.5 flex-shrink-0">{l.icon}</span>
                <div className="min-w-0">
                  <span className={`text-xs font-bold border rounded px-2 py-0.5 mb-2 inline-block ${l.badgeColor}`}>{l.badge}</span>
                  <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-emerald-300 transition-colors leading-snug">{l.titulo}</h3>
                  <p className="text-zinc-400 text-sm leading-snug">{l.descripcion}</p>
                  <p className="text-emerald-500 text-xs mt-3 font-medium">Abrir buscador →</p>
                </div>
              </a>
              {l.urlVotaciones && (
                <div className="px-6 pb-4 border-t border-zinc-800/60 pt-3">
                  <a href={l.urlVotaciones} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors font-medium">
                    🗳️ {l.extra}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// REDES
// ═══════════════════════════════════════════════════════════════════════════════

function Redes() {
  return (
    <section id="redes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="section-anim anim-d3">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Seguime</p>
        <h2 className="text-4xl font-black mb-10 leading-tight">
          Redes <span className="text-emerald-400">Sociales</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {REDES.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 rounded-xl border-2 border-zinc-700 hover:border-emerald-500 bg-zinc-900/40 hover:bg-zinc-900/70 card-lift transition-all duration-200 group">
              <span className="text-5xl mb-4 leading-none">{r.icon}</span>
              <p className="font-black text-xl group-hover:text-emerald-300 transition-colors">{r.nombre}</p>
              <p className="text-emerald-400 mt-1 text-sm font-semibold">{r.usuario}</p>
              <p className="text-zinc-600 text-xs mt-3">Seguir →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTICIAS — usa /api/noticias con GNews o NewsAPI según configuración
// ═══════════════════════════════════════════════════════════════════════════════

function Noticias() {
  const [tema, setTema] = useState('vivienda');
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchNoticias = (t) => {
    setLoading(true);
    setError(null);
    setNoticias([]);
    fetch(`/api/noticias?tema=${t}`)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((data) => {
        if (data.error) { setError(data.error); setNoticias([]); }
        else setNoticias(data.noticias || []);
        setFetched(true);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  const handleTema = (t) => {
    setTema(t);
    fetchNoticias(t);
  };

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TEMAS_NOTICIAS.map((t) => (
          <button key={t.key} type="button" onClick={() => handleTema(t.key)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border-2 transition-all active:scale-95 ${
              tema === t.key
                ? 'bg-emerald-500 border-emerald-500 text-black'
                : 'border-zinc-600 text-zinc-400 hover:border-emerald-500/70 hover:text-emerald-300'
            }`}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {!fetched && !loading && (
        <div className="text-center py-12 text-zinc-600">
          <p className="text-3xl mb-3">📰</p>
          <p className="text-sm">Seleccioná un tema para ver noticias de CABA</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-3 text-zinc-400 py-8">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          Cargando noticias sobre {tema} en CABA...
        </div>
      )}

      {!loading && error && (
        <div className="border border-yellow-500/40 bg-yellow-500/10 rounded-xl p-5 text-yellow-300 text-sm space-y-2">
          <p className="font-semibold">⚠️ {error}</p>
          <p className="text-zinc-400 text-xs">
            Configurá <code className="bg-zinc-800 px-1 py-0.5 rounded">GNEWS_KEY</code> en Vercel para habilitar las noticias automáticas.
            Obtené tu clave gratuita en{' '}
            <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="underline text-emerald-400">gnews.io</a>.
          </p>
        </div>
      )}

      {!loading && !error && fetched && noticias.length === 0 && (
        <p className="text-zinc-500 py-6 text-sm">No se encontraron noticias recientes sobre &quot;{tema}&quot; en CABA.</p>
      )}

      {!loading && noticias.length > 0 && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {noticias.map((n, i) => (
            <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-xl border border-zinc-700 hover:border-emerald-500 bg-zinc-900/40 hover:bg-zinc-900/70 hover:-translate-y-1 transition-all duration-200 group">
              <span className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wider truncate">{n.source}</span>
              <h4 className="font-semibold text-sm leading-snug mb-2 flex-1 group-hover:text-emerald-200 transition-colors">{n.title}</h4>
              {n.description && (
                <p className="text-zinc-500 text-xs leading-relaxed mb-3 line-clamp-2">{n.description}</p>
              )}
              <span className="text-zinc-600 text-xs">
                {new Date(n.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INSTITUCIONAL
// ═══════════════════════════════════════════════════════════════════════════════

function Institucional() {
  return (
    <section id="institucional" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 section-anim anim-d4">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Información oficial</p>
        <h2 className="text-4xl font-black mb-2 leading-tight">
          Noticias <span className="text-emerald-400">CABA</span>
        </h2>
        <p className="text-zinc-400 mb-6 text-sm sm:text-base">
          Noticias filtradas por las misiones de la campaña — temáticas de CABA.
        </p>

        {/* Links institucionales */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a href="https://boletinoficial.buenosaires.gob.ar/buscador"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-emerald-500 rounded-lg text-emerald-400 font-semibold hover:bg-emerald-500/10 active:scale-95 transition-all text-sm">
            📋 Boletín Oficial CABA
          </a>
          <a href="https://boletinoficial.buenosaires.gob.ar/buscador#multas"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-600 rounded-lg text-zinc-400 hover:border-emerald-500/60 hover:text-emerald-400 transition-all text-sm">
            🔍 Buscar &quot;multas&quot; en BO
          </a>
          <a href="https://data.buenosaires.gob.ar/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-600 rounded-lg text-zinc-400 hover:border-emerald-500/60 hover:text-emerald-400 transition-all text-sm">
            📊 Datos Abiertos CABA
          </a>
        </div>

        <Noticias />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACTO / RECLAMOS
// ═══════════════════════════════════════════════════════════════════════════════

function Contacto() {
  const [tipo, setTipo] = useState('Reclamo');
  const [nombre, setNombre] = useState('');
  const [barrio, setBarrio] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) return;

    // Abre el cliente de mail con los datos pre-cargados
    const subject = encodeURIComponent(`[${tipo}] ${nombre}${barrio ? ` — ${barrio}` : ''}`);
    const body = encodeURIComponent(
      `Tipo: ${tipo}\nNombre: ${nombre}\nBarrio: ${barrio || '—'}\nEmail: ${email || '—'}\n\n${mensaje}`
    );
    window.open(`mailto:contacto@leandrosantoro.com.ar?subject=${subject}&body=${body}`, '_blank');
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setNombre(''); setBarrio(''); setEmail(''); setMensaje('');
    }, 5000);
  };

  const inputCls = 'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors';

  return (
    <section id="contacto" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="section-anim anim-d5">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Tu voz importa</p>
        <h2 className="text-4xl font-black mb-3 leading-tight">
          Dejá tu <span className="text-emerald-400">Reclamo</span> o Propuesta
        </h2>
        <p className="text-zinc-400 mb-10 max-w-2xl text-sm sm:text-base">
          Este espacio es una plataforma directa de ciudadanos hacia el equipo de Leandro. Leemos y respondemos cada mensaje.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tipos de contacto */}
          <div className="space-y-3">
            <p className="text-zinc-400 text-sm font-semibold mb-4">¿Qué querés comunicar?</p>
            {TIPOS_CONTACTO.map((t) => (
              <button key={t.key} type="button" onClick={() => setTipo(t.key)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  tipo === t.key
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-zinc-700 bg-zinc-900/40 hover:border-zinc-600'
                }`}>
                <span className="font-bold text-sm block">
                  {t.icon} {t.key}
                </span>
                <span className="text-zinc-500 text-xs">{t.desc}</span>
              </button>
            ))}
            <div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
              <p className="text-zinc-500 text-xs leading-relaxed">
                ✅ Leemos cada mensaje<br />
                ✅ Respondemos en 48hs<br />
                ✅ Tus datos se usan solo para responder<br />
                🚨 Denuncias: tratadas con confidencialidad
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            {enviado ? (
              <div className="h-full flex items-center justify-center border-2 border-emerald-500 rounded-2xl p-10 text-center bg-emerald-500/5">
                <div>
                  <p className="text-5xl mb-4">✅</p>
                  <h3 className="text-2xl font-black text-emerald-400 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-zinc-400 text-sm">
                    Se abrió tu cliente de correo con el mensaje listo. Revisá que se haya enviado correctamente.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                      Nombre *
                    </label>
                    <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre" className={inputCls} />
                  </div>
                  <div>
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                      Barrio / Comuna
                    </label>
                    <input type="text" value={barrio} onChange={(e) => setBarrio(e.target.value)}
                      placeholder="Ej: Palermo, Boca, Mataderos..." className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                    Email (opcional — para poder responderte)
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com" className={inputCls} />
                </div>
                <div>
                  <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                    Tu {tipo} *
                  </label>
                  <textarea required value={mensaje} onChange={(e) => setMensaje(e.target.value)}
                    rows={5} placeholder={
                      tipo === 'Reclamo' ? 'Describí el problema: ¿dónde?, ¿hace cuánto?, ¿qué pasó?...'
                      : tipo === 'Propuesta' ? 'Contanos tu idea para mejorar Buenos Aires...'
                      : tipo === 'Denuncia' ? 'Describí la irregularidad con la mayor cantidad de detalles posible...'
                      : 'Escribí tu consulta...'
                    }
                    className={`${inputCls} resize-none`} />
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit"
                    className="px-7 py-3 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 active:scale-95 transition-all text-sm">
                    Enviar {tipo} →
                  </button>
                  <p className="text-zinc-600 text-xs">
                    Se abrirá tu cliente de correo con el mensaje listo.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEOS
// ═══════════════════════════════════════════════════════════════════════════════

function Videos() {
  const [showMore, setShowMore] = useState(false);
  const videos = [
    { id: 'aO4QmLoCg40', titulo: 'Leandro Santoro — Entrevista principal', descripcion: 'Propuestas y visión para transformar Buenos Aires' },
  ];

  return (
    <section id="videos" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 section-anim anim-d6">
        <p className="text-emerald-400 font-bold tracking-widest text-xs sm:text-sm mb-2 uppercase">Multimedia</p>
        <h2 className="text-4xl font-black mb-10 leading-tight">
          Entrevistas y <span className="text-emerald-400">Videos</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((v) => (
            <div key={v.id}>
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-zinc-700 hover:border-emerald-500 transition-colors">
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.titulo} style={{ border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
              <h3 className="font-bold mt-3">{v.titulo}</h3>
              <p className="text-zinc-400 text-sm mt-1">{v.descripcion}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setShowMore(!showMore)}
          className="mt-8 px-5 py-2.5 border border-zinc-600 rounded-lg text-sm text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 active:scale-95 transition-all">
          {showMore ? 'Ver menos ▲' : 'Ver más videos ▼'}
        </button>
        {showMore && (
          <div className="mt-5 border border-zinc-700 rounded-xl p-8 bg-zinc-900/30 text-center text-zinc-500 text-sm">
            Próximamente más entrevistas y contenido audiovisual.
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="border-t-2 border-emerald-500/30 py-10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-emerald-400 font-black text-2xl tracking-tighter">LS</p>
          <p className="text-zinc-500 text-sm mt-0.5">Leandro Santoro · Es Ahora Buenos Aires</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {REDES.map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">
              {r.usuario}
            </a>
          ))}
          <a href="#contacto" className="text-zinc-500 hover:text-emerald-400 transition-colors text-sm font-medium">
            Contacto
          </a>
        </div>
        <p className="text-zinc-700 text-xs text-center md:text-right">
          © {new Date().getFullYear()} · Datos de fuentes públicas CABA
        </p>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />
      <Misiones />
      <Proyectos />
      <Redes />
      <Institucional />
      <Contacto />
      <Videos />
      <Footer />
    </main>
  );
}
