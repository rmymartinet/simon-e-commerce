import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProgramsOverview from "@/components/Programs/ProgramsDetails";
import TitleComponent from "@/components/TitleComponent";
import { BetterAuthSession } from "@/types/types";
import ProgramsComponents from "@/components/Programs/ProgramsComponents";
import Faq from "@/components/Faq/Faq";

export default async function Programs() {
 
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const betterSession: BetterAuthSession | null = session ? {
    session: {
      id: session.session.id,
      createdAt: session.session.createdAt,
      updatedAt: session.session.updatedAt,
      userId: session.session.userId,
      expiresAt: session.session.expiresAt,
      token: session.session.token
    },
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      image: session.user.image,
      createdAt: session.user.createdAt,
      updatedAt: session.user.updatedAt
    }
  } : null; 

  return <main className="relative mt-[20vh] flex min-h-screen w-screen flex-col items-center justify-center gap-20 px-4">
    <TitleComponent
        title="Programmes"
        titleIndication="programmes"
        subtitle="Découvrez nos programmes de coaching pour atteindre vos objectifs."
      />
    <ProgramsComponents session={betterSession}/>
    <ProgramsOverview />
    <Faq />
  </main>;
}