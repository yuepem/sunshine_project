import Link from "next/link";
import { ChevronRight } from "lucide-react";
import schemaUtils from "@/lib/seo/schema";

const { buildBreadcrumbSchema, serializeJsonLd } = schemaUtils;

export default function Breadcrumbs({ items }) {
  const breadcrumbSchema = buildBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.href}-${item.label}`} className="flex items-center gap-1">
                {isLast ? (
                  <span className="font-medium text-foreground">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="h-4 w-4 text-border" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
