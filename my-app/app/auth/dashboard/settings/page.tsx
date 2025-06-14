import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

async function updateUser(formData: FormData) {
  "use server";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) return redirect("/auth/signin");

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();

  const dataToUpdate: Partial<{ name: string; email: string }> = {};
  if (name) dataToUpdate.name = name;
  if (email) dataToUpdate.email = email;

  await prisma.user.update({
    where: { id: user.id },
    data: dataToUpdate,
  });

  redirect("/dashboard/settings?saved=1");
}

// ✅ Page principale
export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!user) return redirect("/auth/signin");

  const currentUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true },
  });

  return (
    <div className="flex w-full justify-center px-4 md:mt-40">
      <div className="w-full max-w-2xl space-y-12">
        <div className="rounded-xl bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-2 text-3xl font-semibold text-white">
            Paramètres du compte
          </h2>
          <p className="mb-6 text-muted-foreground">
            Modifiez vos informations personnelles.
          </p>

          <form action={updateUser} className="space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-white">
                  Nom
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentUser?.name || ""}
                  className="mt-2 bg-gray-800 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={currentUser?.email || ""}
                  className="mt-2 bg-gray-800 text-white"
                />
              </div>
            </div>

            <Button variant="whiteBg" className="w-full">
              Sauvegarder les modifications
            </Button>
          </form>
        </div>

        <div className="rounded-xl bg-gray-900 p-6 shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-white">
            Changer de mot de passe
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Cliquez sur le lien ci-dessous pour réinitialiser votre mot de
            passe. Un email vous sera envoyé.
          </p>
          <a
            href="/auth/forget-password"
            className="text-violet-400 underline hover:text-violet-300"
          >
            Réinitialiser mon mot de passe
          </a>
        </div>
      </div>
    </div>
  );
}
