"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    simplerColorInput({
      defaultColorFormat: "hex",
      defaultColorList: [
        { label: "Rouge", value: "#f44336" },
        { label: "Bleu", value: "#2196f3" },
        { label: "Vert", value: "#4caf50" },
        { label: "Jaune", value: "#ffeb3b" },
        { label: "Custom...", value: "custom" },
      ],
      enableSearch: true,
    }),
  ],
  cors: {
    allowOrigins: ["http://localhost:3000"],
  },
  api: {
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    withCredentials: true,
  },
});
