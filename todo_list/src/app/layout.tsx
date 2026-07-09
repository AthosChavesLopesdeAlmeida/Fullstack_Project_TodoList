import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="bg-[#313338] text-[#f2f3f5] min-h-full font-sans antialiased">
        <header className="bg-[#1e1f22] border-b border-[#232428] px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
            <span className="text-[#5865f2]">✓</span> Todo List
          </h1>
        </header>
        {children}
      </body>
    </html>
  )
}