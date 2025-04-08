"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ForgetPasswordClient = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-md p-4">
        <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <form
          action={async (formData) => {
            const email = formData.get("email") as string;

            try {
              const { error } = await authClient.forgetPassword(
                {
                  email,
                  redirectTo: "/auth/forget-password",
                },
                {
                  onError: (ctx) => {
                    toast.error("Failed to reset password.");
                    console.error(ctx.error.message);
                  },
                  onSuccess: () => {
                    console.log("Password reset link sent successfully.");
                    toast.success("Check your email to reset your password.");
                    router.push("/auth/signin");
                  },
                },
              );

              if (error) {
                toast.error("Failed to send reset link.");
                console.error(error.message);
                return;
              }

              toast.success("Check your email to reset your password.");
            } catch (error: unknown) {
              toast.error("Failed to send reset link.");
              if (error instanceof Error) {
                console.error(error.message);
              } else {
                console.error("An unknown error occurred.");
              }
            }
          }}
          className="flex flex-col gap-4"
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@example.com"
          />
          <Button type="submit">Send Reset Link</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <form
        action={async (formData) => {
          const password = formData.get("password") as string;

          try {
            await authClient.resetPassword(
              {
                newPassword: password,
                token: token as string,
              },
              {
                onError: (ctx) => {
                  toast.error("Failed to reset password.");
                  console.error(ctx.error.message);
                },
                onSuccess: () => {
                  router.push("/auth/signin");
                },
              },
            );

            toast.success("Check your email to reset your password.");
          } catch (error: unknown) {
            toast.error("Failed to send reset link.");
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error("An unknown error occurred.");
            }
          }
        }}
        className="flex flex-col gap-4"
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          placeholder="new password"
        />
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ForgetPasswordClient;
