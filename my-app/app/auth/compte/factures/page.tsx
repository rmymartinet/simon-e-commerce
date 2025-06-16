
import { Card, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { stripe } from "@/lib/stripe/stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FacturesPage() {
  // Récupère la session utilisateur
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return <div>Vous devez être connecté pour voir vos factures.</div>;
  }

  // Récupère l'utilisateur dans la base
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { stripeCustomerId: true },
  });

  if (!user?.stripeCustomerId) {
    return <div>Aucune facture disponible.</div>;
  }

  // Récupère les factures Stripe
  const invoices = await stripe.invoices.list({
    customer: user.stripeCustomerId,
    limit: 20,
  });


  return (
    <div className="flex w-full flex-col items-center gap-10 px-4 md:mt-40">
      <h1 className="text-center text-4xl font-bold text-white">
        Mes factures
      </h1>
      <p className="max-w-xl text-center text-muted-foreground">
        Retrouvez ici l&apos;historique de vos paiements. Vous pouvez télécharger
        chaque facture au format PDF.
      </p>

      {invoices.data.length === 0 ? (
        <p>Aucune facture trouvée.</p>
      ) : (
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invoices.data.map((invoice) => (
            <Card
              key={invoice.id}
              className="flex flex-col justify-between border border-gray-700 bg-gray-900 p-4 shadow transition hover:scale-[1.02] hover:shadow-violet-500/20"
            >
              <div>
                <CardTitle className="text-white">
                  Facture #{invoice.number}
                </CardTitle>
                <p className="mt-1 text-sm text-gray-400">
                  Date : {new Date(invoice.created * 1000).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold text-white">
                  {(invoice.amount_paid / 100).toFixed(2)} €
                </span>
                <a
                  href={invoice.invoice_pdf!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white hover:underline"
                >
                  <FileDown size={16} />
                  Télécharger
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
