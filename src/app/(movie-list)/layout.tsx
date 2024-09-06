export default function MovieListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      {children}
    </div>
  );
}
