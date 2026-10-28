import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

function IconBadge({ count, children }: { count: number; children: React.ReactNode }) {
  return (
    <span className="relative">
      {children}
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold leading-none text-brand-foreground shadow-sm">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </span>
  );
}

export function Navbar() {
  const { cartCount, favorites, user, openCart, openAuth, logout } = useShop();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate({ to: "/", search: { q: query.trim() || undefined, cat: undefined } });
  };

  const searchForm = (
    <form onSubmit={submitSearch} className="relative w-full">
      <Search className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar audífonos, teclados, celulares…"
        aria-label="Buscar productos"
        className="h-11 rounded-full border-border bg-secondary pl-11 pr-4 text-sm shadow-none focus-visible:ring-ring"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:gap-6">
        {/* Menú móvil */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-display text-xl font-bold text-brand">
                Kushop
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to="/"
                  search={{ cat: cat.id, q: undefined }}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                to="/favoritos"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <Heart className="size-4" /> Favoritos ({favorites.length})
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-0.5 font-display text-2xl font-bold tracking-tight">
          <span className="text-ink">Ku</span>
          <span className="text-brand">shop</span>
          <span className="text-brand">.</span>
        </Link>

        {/* Búsqueda (desktop) */}
        <div className="hidden flex-1 md:block">{searchForm}</div>

        {/* Accesos directos */}
        <nav className="ml-auto flex items-center gap-1 md:gap-2">
          {/* Categorías (desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden gap-1.5 md:inline-flex">
                <LayoutGrid className="size-4" />
                Categorías
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.id} asChild>
                  <Link to="/" search={{ cat: cat.id, q: undefined }}>
                    {cat.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Favoritos"
            className="relative"
          >
            <Link to="/favoritos">
              <IconBadge count={favorites.length}>
                <Heart className="size-5" />
              </IconBadge>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir carrito de compras"
            onClick={openCart}
          >
            <IconBadge count={cartCount}>
              <ShoppingBag className="size-5" />
            </IconBadge>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold uppercase text-brand-foreground">
                    {user.name.slice(0, 2)}
                  </span>
                  <span className="hidden max-w-24 truncate lg:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/favoritos" className="cursor-pointer">
                    <Heart className="size-4" /> Favoritos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    logout();
                    toast.success("Sesión cerrada");
                  }}
                >
                  <LogOut className="size-4" /> Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="gap-2" onClick={openAuth}>
              <User className="size-4" />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Button>
          )}
        </nav>
      </div>

      {/* Búsqueda (móvil) */}
      <div className="border-t border-border px-4 py-2.5 md:hidden">{searchForm}</div>
    </header>
  );
}
