import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-sesssion";
import Image from "next/image";
import SignOutButton from "@/components/Dashboard/SignOutButton";

export default async function Portal() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="grid h-screen place-content-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Your Account</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{user.name || "User"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <h4 className="text-sm font-medium">Account Details</h4>
            <div className="flex flex-col gap-2 text-sm">
           <div className="flex flex-row gap-2">
           <span className="text-muted-foreground">Email:</span>
           <span>{user.email}</span>
           </div> 
              {user.name && (
                <div className="flex flex-row gap-2">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <form className="flex w-full flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              formAction={async () => {
                "use server";

                redirect("/auth/compte");
              }}
            >
              Mon compte
            </Button>
            <SignOutButton variant="purpleBg" />
            <Link href="/auth/forget-password" className="w-full">
              <Button className="w-full">Reset Password</Button>
            </Link>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
