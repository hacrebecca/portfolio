export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-serif text-5xl leading-tight mb-8">
        The shape of an essay
      </h1>

      <p className="mb-6">
        This is body text set in an editorial serif at a comfortable reading
        size. The measure is kept narrow so lines stay easy to follow, and the
        leading is open enough to let the words breathe. A{" "}
        <a href="#">link looks like this</a> — set in the green accent.
      </p>

      <p className="mb-6">
        Footnotes and marginal notes will read in a smaller sans-serif, set in
        the same green, to distinguish them from the main voice:
      </p>

      <p
        className="font-sans text-accent"
        style={{
          fontSize: "var(--text-footnote)",
          lineHeight: "var(--text-footnote-leading)",
        }}
      >
        This is footnote text — Arial, notably smaller than the body, in the
        green accent. Later this will live in the margin on desktop and collapse
        to the footer on mobile.
      </p>
    </main>
  );
}
