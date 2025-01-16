import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

export default function Cancel() {
  return (
    <main className="min-w-screen flex h-screen flex-col items-center justify-center gap-10">
      <div className="w-max rounded-full bg-red-300 p-8">
        <div className="w-max rounded-full bg-red-400 p-8">
          <div className="grid w-max place-content-center rounded-full bg-red-500 p-2">
            <IoCloseOutline size={40} color="white" />
          </div>
        </div>
      </div>
      <h1 className="mb-3 scroll-m-20 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Payment Cancelled 😢
      </h1>
      <p className="leading-7">
        La bonne nouvelle, c&apos;est que vous pouvez réessayer 😊
      </p>
      <div className="mt-5">
        <Link href="/pricing">
          <button className="rounded-md bg-button px-4 py-1 font-semibold text-white">
            Retourner à la page de paiement
          </button>
        </Link>
      </div>
    </main>
  );
}
