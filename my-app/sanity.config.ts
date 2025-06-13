"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { z } from 'zod';

// Validation des variables d'environnement
const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
});

try {
  envSchema.parse({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  });
} catch (error) {
  console.error("Erreur de configuration Sanity:", error);
  throw new Error("Configuration Sanity invalide");
}

// Configuration des origines autorisées
const allowedOrigins = [
  process.env.NODE_ENV === "development" 
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ 
      structure,
      // Configuration de sécurité pour le studio
      defaultDocumentNode: (S, { schemaType }) => {
        // Restriction des accès basée sur le type de document
        if (schemaType === 'user') {
          return S.document().views([S.view.form()]);
        }
        return S.document().views([S.view.form()]);
      },
    }),
    visionTool({ 
      defaultApiVersion: apiVersion,
    }),
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
    allowOrigins: allowedOrigins,
    allowCredentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 heures
  },
  api: {
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
    withCredentials: true,
    // Configuration de sécurité supplémentaire
    documentLimit: 1000,
    maxConcurrentRequests: 10,
    requestTimeout: 30000, // 30 secondes
  },
  // Configuration de sécurité supplémentaire
  document: {
    unstable_history: { enabled: false },
    unstable_comments: { enabled: false },
  },
  // Configuration du studio
  studio: {
    components: {
      // Personnalisation des composants du studio
      navbar: () => null, // Masquer la barre de navigation par défaut
    },
  },
  // Configuration des webhooks
  webhooks: {
    // Configuration des webhooks pour les mises à jour
    onUpdate: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/sanity`,
      headers: {
        'Authorization': `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`,
      },
    },
  },
});
