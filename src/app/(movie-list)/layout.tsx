export default function MovieListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col gap-4 p-4 sm:gap-12 sm:p-0">{children}</div>;
}
