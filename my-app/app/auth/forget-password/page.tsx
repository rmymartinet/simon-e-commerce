import { Suspense } from "react";
import ForgetPasswordClient from "@/components/Auth/ForgetPasswordClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ForgetPasswordClient />
    </Suspense>
  );
}
