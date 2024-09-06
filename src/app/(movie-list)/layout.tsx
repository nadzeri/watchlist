export default function MovieListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid min-h-screen items-center p-4 sm:p-0">{children}</div>;
}
