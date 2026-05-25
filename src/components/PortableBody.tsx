import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";

import { SanityImage } from "./SanityImage";

type LinkMark = { href: string; blank?: boolean };
type FootnoteMark = { _key: string; content?: PortableTextBlock[] };

type FootnoteEntry = { key: string; number: number; content: PortableTextBlock[] };

// Walk the body in document order and assign each inline footnote a number.
function extractFootnotes(body: PortableTextBlock[]): {
  ordered: FootnoteEntry[];
  numberByKey: Record<string, number>;
} {
  const ordered: FootnoteEntry[] = [];
  const numberByKey: Record<string, number> = {};
  for (const block of body ?? []) {
    const markDefs = (block as { markDefs?: Array<Record<string, unknown>> })
      .markDefs;
    if (!Array.isArray(markDefs)) continue;
    for (const def of markDefs) {
      if (def._type === "footnote" && typeof def._key === "string") {
        if (numberByKey[def._key]) continue;
        const number = ordered.length + 1;
        numberByKey[def._key] = number;
        ordered.push({
          key: def._key,
          number,
          content: (def.content as PortableTextBlock[]) ?? [],
        });
      }
    }
  }
  return { ordered, numberByKey };
}

function ExternalLink({
  value,
  children,
}: {
  value?: LinkMark;
  children: React.ReactNode;
}) {
  const blank = value?.blank ?? true;
  return (
    <a
      href={value?.href}
      {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

// Components used inside a footnote's own content (no nested footnotes).
const footnoteContentComponents: PortableTextComponents = {
  marks: { link: ExternalLink },
  types: {
    inlineImage: ({ value }) => <SanityImage value={value} maxWidth={600} />,
  },
};

function FootnoteContent({ content }: { content: PortableTextBlock[] }) {
  return (
    <PortableText value={content} components={footnoteContentComponents} />
  );
}

export function PortableBody({ body }: { body: PortableTextBlock[] }) {
  const { ordered, numberByKey } = extractFootnotes(body);

  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="font-serif text-3xl mt-12 mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-serif text-2xl mt-8 mb-3">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-accent pl-4 my-6 italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => <p className="mb-6">{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
      ),
    },
    marks: {
      link: ExternalLink,
      footnote: ({ value, children }) => {
        const n = numberByKey[(value as FootnoteMark)._key];
        if (!n) return <>{children}</>;
        return (
          <>
            {children}
            <sup className="text-accent">
              <a id={`fnref-${n}`} href={`#fn-${n}`} aria-label={`Footnote ${n}`}>
                {n}
              </a>
            </sup>
          </>
        );
      },
    },
    types: {
      inlineImage: ({ value }) => <SanityImage value={value} />,
    },
  };

  return (
    <>
      <PortableText value={body} components={components} />

      {ordered.length > 0 ? (
        <section
          className="mt-16 pt-8 border-t border-foreground/20 font-sans"
          style={{
            fontSize: "var(--text-footnote)",
            lineHeight: "var(--text-footnote-leading)",
          }}
        >
          <h2 className="sr-only">Footnotes</h2>
          <ol className="space-y-6">
            {ordered.map((fn) => (
              <li key={fn.key} id={`fn-${fn.number}`} className="flex gap-3">
                <span className="text-accent shrink-0">{fn.number}.</span>
                <div className="text-accent">
                  <FootnoteContent content={fn.content} />
                  <a
                    href={`#fnref-${fn.number}`}
                    className="ml-1"
                    aria-label="Back to text"
                  >
                    ↩
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}
