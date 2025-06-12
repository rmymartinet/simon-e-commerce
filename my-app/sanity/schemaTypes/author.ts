import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Description alternative",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      description: "Rôle dans l'équipe (ex: Coach, Nutritionniste, etc.)",
    }),
    defineField({
      name: "socialLinks",
      title: "Réseaux sociaux",
      type: "object",
      fields: [
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
}); 