export default function ForbiddenPage() {
  return (
    <div className="grid h-screen place-content-center">
      <h1 className="text-center text-4xl lg:text-7xl">403 - Accès refusé</h1>
      <p className="text-center text-xl lg:text-4xl">
        Vous n&apos;avez pas les autorisations nécessaires pour accéder à cette
        page.
      </p>
    </div>
  );
}
