import { Session } from "next-auth";
import { BetterAuthSession } from "@/types/types";

declare module "next-auth" {
  interface Session extends BetterAuthSession {}
}
