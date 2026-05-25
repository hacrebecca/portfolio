import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export type ImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

type ImageSource = Parameters<typeof builder.image>[0];

function isGif(value: ImageValue): boolean {
  return Boolean(value?.asset?._ref?.endsWith("-gif"));
}

/**
 * Resolve an image to a src URL. Animated GIFs are served untransformed so the
 * CDN doesn't strip their animation; other formats are optimized.
 */
export function imageSrc(value: ImageValue, maxWidth = 1600): string {
  if (isGif(value)) {
    return builder.image(value as ImageSource).url();
  }
  return builder
    .image(value as ImageSource)
    .width(maxWidth)
    .fit("max")
    .auto("format")
    .url();
}
