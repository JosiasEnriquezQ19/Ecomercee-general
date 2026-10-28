import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const favorite = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        to="/producto/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold text-brand-foreground">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-bold text-ink-foreground">
              Nuevo
            </span>
          )}
        </div>
      </Link>

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
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-card/90 shadow-card backdrop-blur transition-transform hover:scale-110"
      >
        <Heart
          className={cn(
            "size-4.5 transition-colors",
            favorite ? "fill-destructive text-destructive" : "text-muted-foreground",
          )}
        />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <StarRating rating={product.rating} reviews={product.reviews} />
        <Link
          to="/producto/$id"
          params={{ id: product.id }}
          className="line-clamp-2 min-h-10 text-sm font-medium leading-5 hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-auto pt-1">
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-lg font-bold tracking-tight">
            {formatPrice(product.price)}
          </p>
          {product.freeShipping && (
            <p className="text-xs font-semibold text-brand">Envío gratis</p>
          )}
        </div>
        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={() => {
            addToCart(product.id);
            toast.success(`${product.name} agregado al carrito`);
          }}
        >
          <ShoppingCart className="size-4" />
          Agregar
        </Button>
      </div>
    </article>
  );
}
