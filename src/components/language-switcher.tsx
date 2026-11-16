"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { locales, localeSettings, localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function LanguageSwitcher({ locale, labels }: { locale: Locale; labels: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<number | null>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    if (pendingFocus.current !== null) {
      rootRef.current?.querySelectorAll<HTMLAnchorElement>("a")[pendingFocus.current]?.focus();
      pendingFocus.current = null;
    }
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function focusOption(index: number) {
    rootRef.current?.querySelectorAll<HTMLAnchorElement>("a")[index]?.focus();
  }

  return (
    <nav
      ref={rootRef}
      className="language-switcher"
      aria-label={labels.languageLabel}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="language-trigger"
        aria-label={`${labels.languageLabel}: ${localeSettings[locale].label}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const index = event.key === "ArrowUp" ? locales.length - 1 : 0;
            if (open) focusOption(index);
            else {
              pendingFocus.current = index;
              setOpen(true);
            }
          }
        }}
      >
        {localeSettings[locale].label}
        <svg className="language-chevron" width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
          <path d="m1 1 3.5 3.5L8 1" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      <ul
        id={panelId}
        className="language-options"
        hidden={!open}
        onKeyDown={(event) => {
          const index = Array.from(event.currentTarget.querySelectorAll("a")).indexOf(event.target as HTMLAnchorElement);
          let next: number;
          if (event.key === "ArrowDown") next = (index + 1) % locales.length;
          else if (event.key === "ArrowUp") next = (index - 1 + locales.length) % locales.length;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = locales.length - 1;
          else return;
          event.preventDefault();
          focusOption(next);
        }}
      >
        {locales.map((target) => (
          <li key={target}>
            {/* A full navigation ensures the root document language always updates. */}
            <a
              href={localizedPath(pathname, target)}
              hrefLang={localeSettings[target].lang}
              lang={localeSettings[target].lang}
              aria-label={target === "zh" ? labels.switchZh : target === "zh-cn" ? labels.switchHans : labels.switchEn}
              aria-current={target === locale ? "page" : undefined}
              onClick={(event) => {
                // Preserve section and query without relying on browser language detection.
                event.currentTarget.href = localizedPath(pathname, target) + window.location.search + window.location.hash;
                setOpen(false);
              }}
            >
              {localeSettings[target].menuLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}