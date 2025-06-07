export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="lg:px-[10vw]">{children}</main>;
}
