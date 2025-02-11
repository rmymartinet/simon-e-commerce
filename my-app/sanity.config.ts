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
      defaultColorFormat: "hex", // Format par défaut (hex, rgba, hsl, etc.)
      defaultColorList: [
        { label: "Rouge", value: "#f44336" },
        { label: "Bleu", value: "#2196f3" },
        { label: "Vert", value: "#4caf50" },
        { label: "Jaune", value: "#ffeb3b" },
        { label: "Custom...", value: "custom" }, // Permet à l'utilisateur de choisir une couleur personnalisée
      ],
      enableSearch: true, // Active la recherche de couleurs
    }),
  ],
});
