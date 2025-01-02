import { config } from "dotenv";
config({ path: ".env.local" });

import { execSync } from "child_process";

const command = process.argv.slice(2).join(" ");
execSync(`npx prisma ${command}`, { stdio: "inherit" });
