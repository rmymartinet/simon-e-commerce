import Link from "next/link";

function Button({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="h-max w-max rounded-full border border-foreground px-6 py-2 text-white transition-all duration-200 ease-linear hover:border-violet-400 hover:bg-violet-400"
    >
      <button>Découvrir</button>
    </Link>
  );
}

export default Button;
