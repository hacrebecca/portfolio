import Link from "next/link";

// Placeholder content — these will become CMS-managed / editable later.
const categories = [
  { label: "Theology", href: "/blog" },
  { label: "Style", href: "/blog" },
  { label: "Eulogy", href: "/blog" },
  { label: "Essays", href: "/blog" },
];

const clients = ["Lyrah", "Splash", "Sazu", "Dolce", "Erit"];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="h-full flex flex-col font-sans text-foreground">
      {/* Logo cell */}
      <Link
        href="/"
        onClick={onNavigate}
        className="block no-underline text-foreground border-b border-[var(--rule)] px-5 py-4 leading-none"
      >
        <span className="block font-serif text-2xl tracking-tight">BEC</span>
        <span className="block font-serif text-2xl tracking-tight">HAC</span>
      </Link>

      {/* ABOUT module label */}
      <Link
        href="/about"
        onClick={onNavigate}
        className="block border-b border-[var(--rule)] px-5 py-3 uppercase tracking-wide text-foreground hover:text-accent"
        style={{ fontSize: "var(--text-footnote)" }}
      >
        About
      </Link>

      {/* Scrollable sidebar content */}
      <div
        className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-7"
        style={{
          fontSize: "var(--text-footnote)",
          lineHeight: "var(--text-footnote-leading)",
        }}
      >
        <p>
          Bec Hac is a real name, a creative strategist, an art director, a
          dime-show psychic. Writing at <a href="#">Cult Holdings Co</a> and{" "}
          <a href="#">Gynaikon</a>.
        </p>

        <p>
          My writing has appeared elsewhere in: FORGE, A4 Magazine, and Housing.
        </p>

        <nav>
          <h2 className="uppercase tracking-wide mb-2 text-foreground/50">
            Where do you want to go?
          </h2>
          <ul className="space-y-1">
            {categories.map((c, i) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  onClick={onNavigate}
                  className="text-foreground hover:text-accent"
                >
                  {(i + 1).toFixed(1)} &nbsp; {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="uppercase tracking-wide mb-2 text-foreground/50">
            Selected Clients
          </h2>
          <ul className="space-y-1">
            {clients.map((name) => (
              <li key={name} className="text-foreground">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
