"use client";

import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";

export default function InvoicesPage() {
  interface Invoice {
    id: string;
    number: string;
    created: number;
    amount_paid: number;
    invoice_pdf: string;
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch("/api/invoices");
      const data = await res.json();
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="mt-40 flex w-full flex-col items-center gap-10 px-4">
      <h1 className="text-center text-4xl font-bold text-white">
        Mes factures
      </h1>
      <p className="max-w-xl text-center text-muted-foreground">
        Retrouvez ici l’historique de vos paiements. Vous pouvez télécharger
        chaque facture au format PDF.
      </p>

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {invoices.map((invoice) => (
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
                href={invoice.invoice_pdf}
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
    </div>
  );
}
