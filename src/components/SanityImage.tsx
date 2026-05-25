import { imageSrc } from "@/sanity/lib/image";

type ImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
};

export function SanityImage({
  value,
  maxWidth,
}: {
  value: ImageValue;
  maxWidth?: number;
}) {
  if (!value?.asset?._ref) return null;
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc(value, maxWidth)}
        alt={value.alt ?? ""}
        className="w-full h-auto"
        loading="lazy"
      />
      {value.caption ? (
        <figcaption
          className="font-sans text-accent mt-2"
          style={{
            fontSize: "var(--text-footnote)",
            lineHeight: "var(--text-footnote-leading)",
          }}
        >
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
