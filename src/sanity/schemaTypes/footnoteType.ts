import { defineField, defineType } from "sanity";

export const footnoteType = defineType({
  name: "footnote",
  title: "Footnote",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Footnote content",
      type: "footnoteContent",
      description:
        "The side-note shown for this reference. Supports text, images (PNG/GIF), and links.",
      validation: (rule) => rule.required(),
    }),
  ],
});
