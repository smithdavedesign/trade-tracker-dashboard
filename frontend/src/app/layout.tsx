export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Insider Trading Tracker</title>
      </head>
      <body>
        <header>
          <h1>Insider Trading Tracker</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
