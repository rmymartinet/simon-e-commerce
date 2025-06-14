"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {  useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useCart } from "@/app/context/CartContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { cart } = useCart();

  const searchParams = useSearchParams()
  const addToCart = useAddToCart()
  const from = searchParams.get("from");
  const productRaw = searchParams.get("product");
  const { refreshSession } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => setLoading(true),
          onResponse: () => {},
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setErrorMessage(ctx.error.message);
            setLoading(false);
          },
          onSuccess: async () => {
            try {
              await refreshSession();
              router.refresh();
              if (from && productRaw) {
                const product = JSON.parse(decodeURIComponent(productRaw));
                if (!cart.some(item => item.priceId === product.priceId)) {
                  addToCart(product);
                }
                await router.push("/checkout");
              } else {
                await router.push("/auth/portal");
              }
            } finally {
              setLoading(false);
            }
          },
        }
      );

      if (error) {
        setErrorMessage(error.message || "Mot de passe ou email incorrect");
        toast.error(error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMessage("Une erreur est survenue");
      toast.error("Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Connexion</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Entrez votre email pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4" aria-busy={loading}>
            <fieldset disabled={loading} className="contents">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href="/auth/forget-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="mot de passe"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember">Se souvenir de moi</Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex flex-row items-center justify-center gap-x-2">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Connexion en cours...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </fieldset>

            <div className={cn("flex w-full items-center gap-2", "flex-col justify-between")}>
              <Button
                type="button"
                variant="outline"
                className="w-full flex flex-row items-center justify-center gap-x-2"
                disabled={loading}
                onClick={async () => {
                  try {
                    setLoading(true);
                    await signIn.social({
                      provider: "google",
                      callbackURL: "/auth/portal",
                    });
                  } catch (error) {
                    toast.error("Erreur lors de la connexion avec Google");
                    console.error(error);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
          <div className="flex flex-row items-center justify-center gap-x-2">
          <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 262"
                  className="flex-shrink-0"
                >
                  <path
                    fill="#4285F4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  ></path>
                  <path
                    fill="#EB4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
                <span className="font-medium">Se connecter avec Google</span>
          </div>
              </Button>
              <p className="text-sm text-center mt-4">
                Pas encore de compte ?{" "}
                <Link href="/auth/signup" className="text-violet-500 hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        style={{ cursor: "wait" }}
>
          
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="animate-spin text-white" />
            <span className="text-white font-semibold">Connexion en cours...</span>
          </div>
        </div>
      )}
    </main>
  );
}
