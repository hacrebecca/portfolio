import { defineArrayMember, defineType } from "sanity";

export const footnoteContentType = defineType({
  name: "footnoteContent",
  title: "Footnote content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Italic", value: "em" },
          { title: "Strong", value: "strong" },
        ],
        annotations: [{ type: "link" }],
      },
    }),
    defineArrayMember({ type: "inlineImage" }),
  ],
});
