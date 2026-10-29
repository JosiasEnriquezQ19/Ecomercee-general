import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartCrack } from "lucide-react";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/favoritos")({
  component: Favoritos,
  head: () => ({
    meta: [
      { title: "Mis favoritos · Kushop" },
      {
        name: "description",
        content: "Los productos que guardaste como favoritos en Kushop.",
      },
      { property: "og:title", content: "Mis favoritos · Kushop" },
      { property: "og:description", content: "Los productos que guardaste como favoritos en Kushop." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Favoritos() {
  const { favorites } = useShop();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Mis favoritos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {favoriteProducts.length > 0
          ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? "producto guardado" : "productos guardados"}`
          : "Guarda productos con el corazón para verlos aquí."}
      </p>

      {favoriteProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <HeartCrack className="size-7 text-muted-foreground" />
          </div>
          <p className="font-semibold">Aún no tienes favoritos</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Toca el corazón en cualquier producto y aparecerá aquí para comprarlo más tarde.
          </p>
          <Button className="mt-1 rounded-full" asChild>
            <Link to="/">Explorar catálogo</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
