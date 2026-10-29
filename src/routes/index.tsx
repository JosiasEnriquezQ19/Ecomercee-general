import { createFileRoute, Link } from "@tanstack/react-router";
import { Headset, RotateCcw, SearchX, ShieldCheck, Truck } from "lucide-react";
import { HeroCarousel } from "@/components/store/HeroCarousel";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, products, type CategoryId } from "@/data/products";
import { cn } from "@/lib/utils";

interface HomeSearch {
  q?: string;
  cat?: CategoryId;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { q: string | undefined; cat: CategoryId | undefined } => ({
    q: typeof search["q"] === "string" && search["q"].trim() ? search["q"].trim() : undefined,
    cat: categories.some((c) => c.id === search["cat"])
      ? (search["cat"] as CategoryId)
      : undefined,
  }),
  component: Index,
  head: () => ({
    meta: [
      { title: "Kushop — Catálogo de tecnología, audio y gadgets" },
      {
        name: "description",
        content:
          "Explora audífonos, teclados mecánicos, celulares y accesorios en Kushop. Ofertas diarias y envío gratis desde S/99.",
      },
      { property: "og:title", content: "Kushop — Catálogo de tecnología, audio y gadgets" },
      {
        property: "og:description",
        content: "Explora audífonos, teclados mecánicos, celulares y accesorios en Kushop. Ofertas diarias y envío gratis desde S/99.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const perks = [
  { icon: Truck, label: "Envío gratis", sub: "Desde S/99" },
  { icon: ShieldCheck, label: "Pago seguro", sub: "Compra protegida" },
  { icon: RotateCcw, label: "Devolución fácil", sub: "Hasta 30 días" },
  { icon: Headset, label: "Soporte 24/7", sub: "Siempre contigo" },
];

function Index() {
  const { q, cat } = Route.useSearch();

  const query = (q ?? "").toLowerCase();
  const filtered = products.filter((p) => {
    const matchesCat = !cat || p.category === cat;
    const matchesQuery =
      !query ||
      [p.name, p.brand, p.shortDescription].some((text) =>
        text.toLowerCase().includes(query),
      );
    return matchesCat && matchesQuery;
  });

  const activeCategory = categories.find((c) => c.id === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      {/* Carrusel de ofertas */}
      <HeroCarousel />

      {/* Beneficios */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {perks.map((perk) => (
          <div
            key={perk.label}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
          >
            <perk.icon className="size-5 shrink-0 text-brand" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{perk.label}</p>
              <p className="truncate text-xs text-muted-foreground">{perk.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros rápidos por categoría */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {activeCategory ? activeCategory.label : "Todos los productos"}
            <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </span>
          </h2>
          {(activeCategory || query) && (
            <Button variant="outline" size="sm" className="rounded-full" asChild>
              <Link to="/" search={{ cat: undefined, q: undefined }}>
                Limpiar filtros
              </Link>
            </Button>
          )}
        </div>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <Link
            to="/"
            search={{ cat: undefined, q }}
            className={cn(
              "shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors",
              !cat
                ? "border-transparent bg-ink text-ink-foreground"
                : "bg-card hover:bg-accent",
            )}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/"
              search={{ cat: c.id, q }}
              className={cn(
                "shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors",
                cat === c.id
                  ? "border-transparent bg-ink text-ink-foreground"
                  : "bg-card hover:bg-accent",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {query && (
          <p className="mt-3 text-sm text-muted-foreground">
            Resultados para <span className="font-semibold text-foreground">“{q}”</span>
          </p>
        )}

        {filtered.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <SearchX className="size-7 text-muted-foreground" />
            </div>
            <p className="font-semibold">No encontramos productos</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {query
                ? `Nada coincide con “${q}”. Prueba con otra búsqueda o cambia de categoría.`
                : "Prueba con otra categoría."}
            </p>
            <Button variant="outline" className="mt-1 rounded-full" asChild>
              <Link to="/" search={{ cat: undefined, q: undefined }}>
                Ver todo el catálogo
              </Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
