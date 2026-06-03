import './globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen bg-zinc-950 text-slate-300">
        {children}
      </body>
    </html>
  );
}