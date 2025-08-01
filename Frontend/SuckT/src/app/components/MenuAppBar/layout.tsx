import './globals.css'

export const metadata = {
  title: 'My App',
  description: 'Font from Google Fonts',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}