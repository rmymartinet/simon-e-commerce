import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    {
      name: 'content',
      title: 'Contenu',
      default: true,
    },
    {
      name: 'metadata',
      title: 'Métadonnées',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: 'content',
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: 'content',
      options: { 
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Description alternative',
          description: 'Important pour le SEO et l\'accessibilité',
        },
      ],
    }),
    defineField({
      name: "teaser",
      title: "Accroche",
      type: "text",
      group: 'content',
      rows: 3,
      description: "Un court résumé de l'article qui apparaîtra dans la liste",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: 'metadata',
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      group: 'metadata',
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "minutesToRead",
      title: "Temps de lecture",
      type: "number",
      group: 'metadata',
      validation: (rule) => rule.required().min(1).max(60),
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      group: 'content',
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
              { title: "Souligné", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Description alternative",
            },
            {
              name: "caption",
              type: "string",
              title: "Légende",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: 'seo',
      fields: [
        {
          name: "metaTitle",
          title: "Titre meta",
          type: "string",
          description: "Titre pour les moteurs de recherche (max 60 caractères)",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Description meta",
          type: "text",
          rows: 3,
          description: "Description pour les moteurs de recherche (max 160 caractères)",
          validation: (rule) => rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `par ${author}` };
    },
  },
});
