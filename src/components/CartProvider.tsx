"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ShoppingCart } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuItem } from "@/data/menu";
import { menuItems } from "@/data/menu";

export type CartItem = {
  item: MenuItem;
  qty: number;
};

type ToastState = {
  id: number;
  message: string;
};

type CartContextValue = {
  cart: CartItem[];
  count: number;
  addItem: (item: MenuItem) => void;
  subtractItem: (item: MenuItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  showToast: (message: string) => void;
};

const CART_STORAGE_KEY = "daily-crisps-cart";
const CartContext = createContext<CartContextValue | null>(null);

function restoreCart(): CartItem[] {
  const saved = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!saved) return [];

  const parsed = JSON.parse(saved) as { id: number; qty: number }[];
  return parsed
    .map((entry) => {
      const item = menuItems.find((menuItem) => menuItem.id === entry.id);
      return item && entry.qty > 0 ? { item, qty: entry.qty } : null;
    })
    .filter((entry): entry is CartItem => Boolean(entry));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    try {
      window.queueMicrotask(() => setCart(restoreCart()));
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      window.queueMicrotask(() => setHydrated(true));
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (cart.length === 0) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }
    const payload = cart.map((entry) => ({
      id: entry.item.id,
      qty: entry.qty,
    }));
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const addItem = useCallback(
    (item: MenuItem) => {
      setCart((current) => {
        const found = current.find((entry) => entry.item.id === item.id);
        if (found) {
          return current.map((entry) =>
            entry.item.id === item.id
              ? { ...entry, qty: entry.qty + 1 }
              : entry,
          );
        }
        return [...current, { item, qty: 1 }];
      });
      showToast("Added to Order");
    },
    [showToast],
  );

  const subtractItem = useCallback((item: MenuItem) => {
    setCart((current) =>
      current
        .map((entry) =>
          entry.item.id === item.id ? { ...entry, qty: entry.qty - 1 } : entry,
        )
        .filter((entry) => entry.qty > 0),
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((current) => current.filter((entry) => entry.item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    setCart([]);
  }, []);

  const count = cart.reduce((sum, entry) => sum + entry.qty, 0);

  const value = useMemo(
    () => ({
      cart,
      count,
      addItem,
      subtractItem,
      removeItem,
      clearCart,
      showToast,
    }),
    [addItem, cart, clearCart, count, removeItem, subtractItem, showToast],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-24 z-[80] flex justify-center px-6">
        <div
          key={toast?.id ?? "empty"}
          className={`rounded-full border border-white/80 bg-[var(--red)] px-5 py-3 font-barlow text-sm font-semibold text-white shadow-[0_18px_45px_rgba(192,21,31,0.3)] transition-all duration-300 ${
            toast ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
          role="status"
          aria-live="polite"
        >
          {toast ? <>&#10003; {toast.message}</> : <>&#10003; Added to Order</>}
        </div>
      </div>
      {count > 0 ? (
        <Link
          href="/order"
          aria-label={`Open cart with ${count} ${count === 1 ? "item" : "items"}`}
          className="fixed right-0 top-1/2 z-[70] flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-l-2xl bg-[var(--red)] text-white shadow-[0_14px_35px_rgba(143,20,27,0.3)] transition hover:w-[4.5rem] hover:bg-[var(--red-light)] focus-visible:outline-4 focus-visible:outline-red-200"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute left-1 top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 font-barlow text-xs font-bold text-[var(--red)] shadow ring-1 ring-red-100">
            {count}
          </span>
        </Link>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
