import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";

export interface CartItem {
  productId: string;
  qty: number;
}

export interface ShopUser {
  name: string;
  email: string;
}

interface ShopContextValue {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  favorites: string[];
  user: ShopUser | null;
  cartOpen: boolean;
  authOpen: boolean;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  login: (user: ShopUser) => void;
  logout: () => void;
  openCart: () => void;
  closeCart: () => void;
  openAuth: () => void;
  closeAuth: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

const STORAGE_KEY = "kushop-state";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [user, setUser] = useState<ShopUser | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Hidratar desde localStorage solo en el cliente (evita mismatch de SSR).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        cart?: CartItem[];
        favorites?: string[];
        user?: ShopUser | null;
      };
      setCart(saved.cart ?? []);
      setFavorites(saved.favorites ?? []);
      setUser(saved.user ?? null);
    } catch {
      // Estado corrupto: se ignora y se parte limpio.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, favorites, user }),
      );
    } catch {
      // Sin almacenamiento disponible; el carrito vive solo en memoria.
    }
  }, [cart, favorites, user]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      const stock = getProduct(productId)?.stock ?? 1;
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, qty: Math.min(i.qty + qty, stock) }
            : i,
        );
      }
      return [...prev, { productId, qty: Math.min(qty, stock) }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    const stock = getProduct(productId)?.stock ?? 1;
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, qty: Math.min(qty, stock) } : i,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const login = useCallback((nextUser: ShopUser) => setUser(nextUser), []);
  const logout = useCallback(() => setUser(null), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openAuth = useCallback(() => setAuthOpen(true), []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = cart.reduce((acc, i) => acc + i.qty, 0);
    const cartTotal = cart.reduce((acc, i) => {
      const product = getProduct(i.productId);
      return product ? acc + product.price * i.qty : acc;
    }, 0);
    return {
      cart,
      cartCount,
      cartTotal,
      favorites,
      user,
      cartOpen,
      authOpen,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleFavorite,
      isFavorite,
      login,
      logout,
      openCart,
      closeCart,
      openAuth,
      closeAuth,
    };
  }, [
    cart,
    favorites,
    user,
    cartOpen,
    authOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toggleFavorite,
    isFavorite,
    login,
    logout,
    openCart,
    closeCart,
    openAuth,
    closeAuth,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop debe usarse dentro de ShopProvider");
  return ctx;
}
