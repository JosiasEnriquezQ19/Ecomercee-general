import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/store/StarRating";
import {
  categoryLabel,
  formatPrice,
  getProduct,
  products,
} from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/producto/$id")({
  component: ProductDetail,
  head: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) {
      return {
        meta: [
          { title: "Producto no encontrado · Kushop" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${product.name} · Kushop` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: `${product.name} · Kushop` },
        { property: "og:description", content: product.shortDescription },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

const galleryViews = [
  { id: "frente", style: {} as React.CSSProperties },
  { id: "detalle", style: { transform: "scale(1.8)" } as React.CSSProperties },
  {
    id: "angulo",
    style: { transform: "scale(1.8)", objectPosition: "18% 28%" } as React.CSSProperties,
  },
];

function ProductDetail() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const { addToCart, openCart, toggleFavorite, isFavorite } = useShop();
  const [qty, setQty] = useState(1);
  const [activeView, setActiveView] = useState(0);

  useEffect(() => {
    setQty(1);
    setActiveView(0);
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Producto no encontrado</h1>
        <p className="text-sm text-muted-foreground">
          Parece que este producto ya no está disponible en el catálogo.
        </p>
        <Button className="rounded-full" asChild>
          <Link to="/">
            <ChevronLeft className="size-4" /> Volver al catálogo
          </Link>
        </Button>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const lowStock = product.stock <= 5;
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    openCart();
  };

  const handleAddToCart = () => {
    addToCart(product.id, qty);
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      {/* Volver */}
      <Button variant="ghost" size="sm" className="-ml-2 mb-4 rounded-full" asChild>
        <Link to="/">
          <ChevronLeft className="size-4" /> Volver al catálogo
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Galería */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="size-full object-cover transition-transform duration-300"
              style={galleryViews[activeView]?.style ?? {}}
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-sm font-bold text-brand-foreground">
                -{discount}% hoy
              </span>
            )}
            <button
              type="button"
              aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              aria-pressed={favorite}
              onClick={() => {
                toggleFavorite(product.id);
                toast.success(
                  favorite ? "Quitado de favoritos" : "Agregado a favoritos",
                );
              }}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-card/90 shadow-card backdrop-blur transition-transform hover:scale-110"
            >
              <Heart
                className={cn(
                  "size-5",
                  favorite ? "fill-destructive text-destructive" : "text-muted-foreground",
                )}
              />
            </button>
          </div>
          <div className="mt-3 flex gap-3">
            {galleryViews.map((view, i) => (
              <button
                key={view.id}
                type="button"
                aria-label={`Vista ${view.id}`}
                aria-pressed={activeView === i}
                onClick={() => setActiveView(i)}
                className={cn(
                  "size-20 overflow-hidden rounded-2xl border-2 bg-secondary transition-colors",
                  activeView === i ? "border-brand" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="size-full object-cover"
                  style={view.style}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            {product.brand} · {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-5">
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground">
                <span className="line-through">{formatPrice(product.originalPrice)}</span>
                {discount > 0 && <span className="ml-2 font-semibold text-brand">-{discount}%</span>}
              </p>
            )}
            <p className="text-4xl font-bold tracking-tight">{formatPrice(product.price)}</p>
            {product.freeShipping && (
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand">
                <Truck className="size-4" /> Envío gratis
              </p>
            )}
            <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>
          </div>

          {/* Stock y cantidad */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">
                Stock disponible: <span className="font-bold">{product.stock}</span> unidades
              </p>
              {lowStock && (
                <p className="text-xs font-semibold text-destructive">
                  ¡Solo quedan {product.stock} unidades!
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border px-1">
              <button
                type="button"
                aria-label="Disminuir cantidad"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="flex size-9 items-center justify-center rounded-full hover:bg-accent"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-8 text-center text-base font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                disabled={qty >= product.stock}
                onClick={() => setQty((v) => Math.min(product.stock, v + 1))}
                className="flex size-9 items-center justify-center rounded-full hover:bg-accent disabled:opacity-40"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button size="lg" className="rounded-full" onClick={handleBuyNow}>
              Comprar ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" /> Agregar al carrito
            </Button>
          </div>

          {/* Garantías */}
          <div className="mt-6 grid grid-cols-1 gap-2 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 shrink-0 text-brand" /> Compra protegida
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="size-4 shrink-0 text-brand" /> 30 días para devoluciones
            </p>
            <p className="flex items-center gap-2">
              <Truck className="size-4 shrink-0 text-brand" /> Entrega en 2–4 días
            </p>
          </div>

          {/* Descripción y características */}
          <div className="mt-8">
            <h2 className="font-display text-lg font-bold">Descripción</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <h2 className="mt-6 font-display text-lg font-bold">Características</h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold tracking-tight">También te puede gustar</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to="/producto/$id"
                params={{ id: p.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 min-h-10 text-sm font-medium leading-5">{p.name}</p>
                  <p className="mt-1 text-lg font-bold">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
