import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Italic", value: "em" },
          { title: "Strong", value: "strong" },
        ],
        annotations: [{ type: "link" }, { type: "footnote" }],
      },
    }),
    defineArrayMember({ type: "inlineImage" }),
  ],
});
