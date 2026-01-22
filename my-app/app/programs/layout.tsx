export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mt-[20vh] flex min-h-screen w-screen flex-col items-center justify-center gap-20 px-4">
      {children}
    </main>
  );
}
