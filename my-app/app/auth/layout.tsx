export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="px-4 md:px-10 lg:px-20">{children}</main>;
}
