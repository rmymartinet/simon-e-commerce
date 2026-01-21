"use client";

import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";
import { CartItemProps } from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import Link from "next/link";
const { useSession } = authClient;

type GuestProps = {
  cartItems: CartItemProps[];
};

const Guest = ({ cartItems }: GuestProps) => {
  const { handlePayment } = usePayment({});
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/checkout");
    }
  }, [session, router]);

  const handleGuestCheckout = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer votre email",
      });
      return;
    }
    if (cartItems.length === 0) {
      console.error("Aucun produit sélectionné");
      return;
    }

    handlePayment(cartItems, true, email);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center md:gap-10">
      <div className="flex w-full flex-col items-center gap-4 text-center lg:mt-0">
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Button 
          variant="default"
          className="w-full"
          onClick={handleGuestCheckout}
        >
          Continuer en tant qu&apos;invité
        </Button>
        <div className="text-sm text-white/70">
          Déjà un compte ?{" "}
          <Link
            href="/auth/signin?from=checkout"
            className="text-violet-400 hover:underline"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Guest;
