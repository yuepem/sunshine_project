"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sun, X } from "lucide-react";
import navigationData from "@/data/navigation";

const { navigationSections } = navigationData;

function isActivePath(pathname, href) {
  if (!href) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionActive(pathname, section) {
  if (section.href) {
    return isActivePath(pathname, section.href);
  }

  return section.items?.some((item) => isActivePath(pathname, item.href));
}

function NavLink({ href, isActive, children }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function DesktopMenu({ section, pathname, isOpen, onToggle }) {
  const isActive = isSectionActive(pathname, section);
  const panelPositionClass =
    section.align === "end" ? "right-0" : "left-0";

  return (
    <div className="group relative">
      <button
        type="button"
        aria-expanded={isOpen}
        className={[
          "flex list-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          isActive
            ? "border-primary/30 bg-primary/10 text-primary"
            : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
        ].join(" ")}
        onClick={onToggle}
      >
        <span>{section.label}</span>
        <ChevronDown
          className={[
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen ? (
        <div
          className={[
            "absolute top-full z-20 mt-3 w-[22rem] rounded-3xl border border-border bg-card p-3 shadow-xl",
            panelPositionClass,
          ].join(" ")}
        >
          <div className="border-b border-border px-3 pb-3">
            <p className="eyebrow">{section.label}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {section.description}
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-2xl border p-3 transition-colors",
                  isActivePath(pathname, item.href)
                    ? "border-primary/30 bg-primary/10"
                    : "border-border hover:border-primary/30 hover:bg-muted",
                ].join(" ")}
              >
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setOpenDesktopMenu(null);
        setIsMobileMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header ref={headerRef} className="border-b border-border bg-background/95">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              SunTracker
            </p>
            <p className="text-base font-semibold text-foreground">
              Where Is The Sun
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navigationSections.map((section) =>
            section.type === "link" ? (
              <NavLink
                key={section.label}
                href={section.href}
                isActive={isSectionActive(pathname, section)}
              >
                {section.label}
              </NavLink>
            ) : (
              <DesktopMenu
                key={section.label}
                section={section}
                pathname={pathname}
                isOpen={openDesktopMenu === section.label}
                onToggle={() =>
                  setOpenDesktopMenu((current) =>
                    current === section.label ? null : section.label
                  )
                }
              />
            )
          )}
        </nav>

        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle site navigation"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-full border border-border bg-card p-3 text-foreground transition-colors hover:border-primary/30 md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4">
            {navigationSections.map((section) =>
              section.type === "link" ? (
                <NavLink
                  key={section.label}
                  href={section.href}
                  isActive={isSectionActive(pathname, section)}
                >
                  {section.label}
                </NavLink>
              ) : (
                <div
                  key={section.label}
                  className="rounded-3xl border border-border bg-card p-4"
                >
                  <div className="border-b border-border pb-3">
                    <p className="eyebrow">{section.label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "rounded-2xl border p-3 transition-colors",
                          isActivePath(pathname, item.href)
                            ? "border-primary/30 bg-primary/10"
                            : "border-border hover:border-primary/30 hover:bg-muted",
                        ].join(" ")}
                      >
                        <p className="text-sm font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
