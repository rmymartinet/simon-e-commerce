import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "l4coez08",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
