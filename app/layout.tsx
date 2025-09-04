import './globals.css'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const metadata = {
  title: 'Zoo Club',
  description: 'Staff availability portal for Zoo Club',
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen">
        {/* Navbar transparente para mantener el fondo uniforme */}
        <nav className="sticky top-0 z-50 w-full border-b border-zoo-border/60 bg-transparent backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-zoo-cyan font-semibold text-2xl sm:text-3xl drop-shadow-neon">Zoo</div>
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Contenedor más ancho para que las tarjetas “respiren” */}
        <main className="mx-auto max-w-7xl px-4 pb-20">{children}</main>
      </body>
    </html>
  )
}
