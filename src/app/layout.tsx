export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: '0',
          padding: '0',
          boxSizing: 'border-box',
          background: 'var(--tg-theme-secondary-bg-color)',
          color: 'var(--tg-theme-text-color)'
        }}
      >
        {children}
      </body>
    </html>
  )
}
