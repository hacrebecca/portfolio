"use client";

import { useState } from "react";

import { Sidebar } from "./Sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen md:grid md:grid-cols-[var(--sidebar-w)_1fr] overflow-hidden">
      {/* Mobile top bar with burger */}
      <div className="md:hidden flex items-center justify-between border-b border-[var(--rule)] px-4 py-3">
        <span className="font-serif text-xl leading-none">BEC HAC</span>
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="font-sans text-foreground"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer backdrop */}
      {open ? (
        <div
          className="md:hidden fixed inset-0 z-30 bg-foreground/20"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/* Sidebar — drawer on mobile, fixed column on desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[var(--sidebar-w)] bg-[var(--background)] border-r border-[var(--rule)] transition-transform md:static md:z-auto md:translate-x-0 md:h-screen ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={() => setOpen(false)} />
      </div>

      {/* Main — the independently scrolling content module */}
      <main className="h-[calc(100vh-3.25rem)] md:h-screen overflow-y-auto overscroll-y-none">
        {children}
      </main>
    </div>
  );
}
