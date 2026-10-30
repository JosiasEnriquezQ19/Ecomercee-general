import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getProduct } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 99;

export function CartDrawer() {
  const { cart, cartTotal, cartOpen, closeCart, updateQty, removeFromCart, clearCart } =
    useShop();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const items = cart
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter((entry): entry is { item: typeof entry.item; product: NonNullable<typeof entry.product> } => Boolean(entry.product));

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const checkout = () => {
    setOrderNumber(`KS-${Math.floor(100000 + Math.random() * 900000)}`);
    clearCart();
  };

  const finishCheckout = () => {
    setOrderNumber(null);
    closeCart();
  };

  return (
    <Sheet open={cartOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md p-0">
        {orderNumber ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <CheckCircle2 className="size-16 text-brand" />
            <SheetTitle className="font-display text-2xl">¡Pedido confirmado!</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Tu pedido <span className="font-bold text-foreground">#{orderNumber}</span> fue
              registrado. Te enviaremos la confirmación por correo.
            </p>
            <Button onClick={finishCheckout} className="mt-2 rounded-full px-6">
              Seguir comprando
            </Button>
          </div>
        ) : (
          <>
            <SheetHeader className="p-5 pb-3 text-left">
              <SheetTitle className="flex items-center gap-2 font-display text-lg">
                <ShoppingBag className="size-5" />
                Tu carrito
                {items.length > 0 && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({items.length} {items.length === 1 ? "producto" : "productos"})
                  </span>
                )}
              </SheetTitle>
              <SheetDescription className="sr-only">
                Revisa los productos seleccionados y procede a la compra.
              </SheetDescription>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="size-7 text-muted-foreground" />
                </div>
                <p className="font-semibold">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground">
                  Explora el catálogo y encuentra tu próximo gadget.
                </p>
                <Button variant="outline" className="mt-2 rounded-full" asChild>
                  <Link to="/" onClick={closeCart}>
                    Ver productos
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Progreso de envío gratis */}
                <div className="mx-5 mb-2 rounded-xl bg-brand-soft px-4 py-3">
                  <p className="flex items-center gap-2 text-xs font-medium text-accent-foreground">
                    <Truck className="size-4" />
                    {missingForFreeShipping > 0 ? (
                      <>
                        Te faltan{" "}
                        <strong>{formatPrice(missingForFreeShipping)}</strong> para el envío
                        gratis
                      </>
                    ) : (
                      <>¡Felicitaciones! Tienes envío gratis</>
                    )}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background/60">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-2">
                  <ul className="flex flex-col divide-y divide-border">
                    {items.map(({ item, product }) => (
                      <li key={item.productId} className="flex gap-3 py-3">
                        <Link
                          to="/producto/$id"
                          params={{ id: product.id }}
                          onClick={closeCart}
                          className="size-20 shrink-0 overflow-hidden rounded-xl bg-secondary"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            width={1024}
                            height={1024}
                            className="size-full object-cover"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="line-clamp-2 text-sm font-medium leading-snug">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-sm font-bold">
                            {formatPrice(product.price)}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-border">
                              <button
                                type="button"
                                aria-label="Disminuir cantidad"
                                onClick={() => updateQty(item.productId, item.qty - 1)}
                                className="flex size-7 items-center justify-center rounded-full hover:bg-accent"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="min-w-6 text-center text-sm font-semibold">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                aria-label="Aumentar cantidad"
                                disabled={item.qty >= product.stock}
                                onClick={() => updateQty(item.productId, item.qty + 1)}
                                className="flex size-7 items-center justify-center rounded-full hover:bg-accent disabled:opacity-40"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={`Quitar ${product.name} del carrito`}
                              onClick={() => {
                                removeFromCart(item.productId);
                                toast.success("Producto eliminado del carrito");
                              }}
                              className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <SheetFooter className="shrink-0 flex-col sm:flex-col gap-1.5 border-t border-border p-5 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Impuestos y envío se calculan al finalizar la compra.
                  </p>
                  <Button size="lg" className="mt-1 w-full rounded-full" onClick={checkout}>
                    Proceder a la compra
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full")}
                    onClick={closeCart}
                  >
                    Seguir comprando
                  </Button>
                </SheetFooter>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
