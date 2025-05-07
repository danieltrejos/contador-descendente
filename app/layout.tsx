import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rumbo a la libertad',
  description: 'Contador regresivo para la salida del Sena',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
