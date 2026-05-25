import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { footnoteContentType } from "./footnoteContentType";
import { footnoteType } from "./footnoteType";
import { inlineImageType } from "./inlineImageType";
import { linkType } from "./linkType";
import { postType } from "./postType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    blockContentType,
    footnoteContentType,
    footnoteType,
    inlineImageType,
    linkType,
  ],
};
