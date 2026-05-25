import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "External link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "blank",
      title: "Open in new tab",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
