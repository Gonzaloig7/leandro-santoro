import './globals.css';

export const metadata = {
  title: 'Leandro Santoro | Es Ahora Buenos Aires',
  description:
    'Propuestas, misiones y proyectos de Leandro Santoro para transformar Buenos Aires. Vivienda, educación, salud, transporte, empleo, seguridad y ambiente.',
  keywords:
    'Leandro Santoro, Buenos Aires, CABA, diputado, legislatura, propuestas, misiones',
  openGraph: {
    title: 'Leandro Santoro | Es Ahora Buenos Aires',
    description:
      'Propuestas y misiones de Leandro Santoro para transformar Buenos Aires.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
