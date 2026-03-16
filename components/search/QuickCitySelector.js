"use client";

import { startTransition, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Search } from "lucide-react";

function getLocationLabel(location) {
  return `${location.name}, ${location.country}`;
}

export default function QuickCitySelector({
  locations,
  popularSlugs = [],
  label = "Choose a city",
  placeholder = "Search for a city",
}) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const normalizedQuery = query.trim().toLowerCase();
  const popularLocations =
    popularSlugs.length > 0
      ? popularSlugs
          .map((slug) => locations.find((location) => location.slug === slug))
          .filter(Boolean)
      : locations.slice(0, 6);

  const matches = normalizedQuery
    ? locations.filter((location) => {
        const haystack = [
          location.name,
          location.country,
          location.region,
          location.slug.replaceAll("-", " "),
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
    : [];

  function openLocation(location) {
    startTransition(() => {
      router.push(`/locations/${location.slug}`);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (matches.length > 0) {
      const nextLocation =
        activeIndex >= 0 ? matches[activeIndex] : matches[0];
      openLocation(nextLocation);
    }
  }

  function handleKeyDown(event) {
    if (matches.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex >= matches.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? matches.length - 1 : currentIndex - 1,
      );
    }

    if (event.key === "Escape") {
      setActiveIndex(-1);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor={listboxId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <p className="text-sm leading-6 text-muted-foreground">
          Search a supported city and jump straight to its sunrise, sunset, and
          daylight page.
        </p>
      </div>

      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id={listboxId}
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-controls={`${listboxId}-results`}
              aria-expanded={matches.length > 0}
              aria-activedescendant={
                activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
              }
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="field-input pl-11 pr-28"
            />
            <button type="submit" className="btn-primary absolute right-2 top-2">
              Go
            </button>
          </div>

          {matches.length > 0 ? (
            <ul
              id={`${listboxId}-results`}
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 grid gap-2 rounded-[var(--radius-md)] border border-border bg-card p-3 shadow-[var(--shadow-lg)]"
            >
              {matches.slice(0, 6).map((location, index) => (
                <li key={location.slug}>
                  <button
                    id={`${listboxId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => openLocation(location)}
                    className={`flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-left transition-colors ${
                      index === activeIndex
                        ? "bg-primary/10 text-foreground"
                        : "bg-transparent text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>
                        <span className="block font-medium">
                          {getLocationLabel(location)}
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {location.region}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Popular cities</p>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map((location) => (
              <button
                key={location.slug}
                type="button"
                onClick={() => openLocation(location)}
                className="tag transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
