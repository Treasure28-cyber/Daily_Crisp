"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/Button";
import { categories, formatPrice, menuItems, type MenuCategory, type MenuItem } from "@/data/menu";

type CartItem = {
  item: MenuItem;
  qty: number;
};

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

const CART_STORAGE_KEY = "daily-crisps-cart";
const WHATSAPP_NUMBER = "2349046116130";
const DELIVERY_FEE = 500;

export default function OrderPage() {
  const [active, setActive] = useState<MenuCategory>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const filtered = useMemo(() => (active === "All" ? menuItems : menuItems.filter((item) => item.category === active)), [active]);
  const subtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);
  const deliveryFee = cart.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const count = cart.reduce((sum, entry) => sum + entry.qty, 0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { id: number; qty: number }[];
        const restored = parsed
          .map((entry) => {
            const item = menuItems.find((menuItem) => menuItem.id === entry.id);
            return item && entry.qty > 0 ? { item, qty: entry.qty } : null;
          })
          .filter((entry): entry is CartItem => Boolean(entry));
        window.queueMicrotask(() => setCart(restored));
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      window.queueMicrotask(() => setHydrated(true));
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload = cart.map((entry) => ({ id: entry.item.id, qty: entry.qty }));
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  }, [cart, hydrated]);

  function add(item: MenuItem) {
    setCart((current) => {
      const found = current.find((entry) => entry.item.id === item.id);
      if (found) {
        return current.map((entry) => (entry.item.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry));
      }
      return [...current, { item, qty: 1 }];
    });
    setJustAdded(item.id);
    window.setTimeout(() => setJustAdded((current) => (current === item.id ? null : current)), 1200);
  }

  function subtract(item: MenuItem) {
    setCart((current) =>
      current
        .map((entry) => (entry.item.id === item.id ? { ...entry, qty: entry.qty - 1 } : entry))
        .filter((entry) => entry.qty > 0),
    );
  }

  function remove(id: number) {
    setCart((current) => current.filter((entry) => entry.item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function updateForm(field: keyof CheckoutForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cart.length === 0) return;

    const items = cart.map((entry) => `* ${entry.item.name} x${entry.qty} - ${formatPrice(entry.item.price * entry.qty)}`).join("\n");
    const message = [
      "Hello Daily Crisps,",
      "",
      "I would like to order:",
      "",
      items,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Delivery Fee: ${formatPrice(deliveryFee)}`,
      `Total: ${formatPrice(total)}`,
      "",
      "Delivery Address:",
      form.address,
      "",
      "Customer Name:",
      form.name,
      "",
      "Phone Number:",
      form.phone,
      "",
      "Additional Notes:",
      form.notes.trim() || "None",
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="bg-[var(--off-white)] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">Fast Kitchen Queue</p>
          <h1 className="mt-3 font-playfair text-5xl font-bold text-[var(--charcoal)]">Order Now</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="bg-white p-6">
            <div className="mb-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  type="button"
                  className={`rounded-full border px-4 py-2 font-barlow text-xs font-semibold uppercase tracking-[0.15em] ${
                    active === category ? "border-[var(--red)] bg-[var(--red)] text-white" : "border-[var(--mid-grey)] bg-white text-[var(--charcoal)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="space-y-5">
              {filtered.map((item) => {
                const entry = cart.find((cartItem) => cartItem.item.id === item.id);
                return (
                  <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_12px_35px_rgba(26,26,26,0.06)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/80 bg-[var(--light-grey)] shadow-[0_10px_24px_rgba(26,26,26,0.12)]">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="80px"
                          className="object-cover"
                          style={{ objectPosition: item.imagePosition }}
                        />
                      </div>
                      <div>
                        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.15em] text-[var(--red)]">{item.category}</p>
                        <h2 className="font-playfair text-2xl font-bold text-[var(--charcoal)]">{item.name}</h2>
                        <p className="font-barlow font-semibold text-[var(--red)]">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    {entry ? (
                      <div className="flex items-center gap-3 rounded-full border border-[var(--red)] bg-red-50 px-2 py-1 text-[var(--red)]">
                        <button type="button" onClick={() => subtract(item)} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-16 text-center font-barlow text-xs font-semibold uppercase tracking-[0.14em]">
                          {justAdded === item.id ? "Added" : `Qty ${entry.qty}`}
                        </span>
                        <button type="button" onClick={() => add(item)} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => add(item)}
                        className="rounded-full bg-[var(--red)] px-5 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[var(--red-light)]"
                      >
                        Add
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
          <aside className="h-fit bg-white p-6 shadow-xl lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="font-playfair text-3xl font-bold text-[var(--charcoal)]">Your Order</h2>
              <span className="rounded-full bg-red-50 px-3 py-1 font-barlow text-sm font-semibold text-[var(--red)]">{count}</span>
            </div>
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-[var(--mid-grey)]" />
                <p className="mt-4 font-barlow text-[var(--text-muted)]">Your cart is empty - browse the menu</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {cart.map((entry) => (
                  <div key={entry.item.id} className="border-b border-[var(--mid-grey)] pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-barlow font-semibold text-[var(--charcoal)]">{entry.item.name}</p>
                        <p className="font-barlow text-sm text-[var(--text-muted)]">Qty {entry.qty} - {formatPrice(entry.item.price * entry.qty)}</p>
                      </div>
                      <button type="button" onClick={() => remove(entry.item.id)} aria-label={`Remove ${entry.item.name}`} className="rounded-full">
                        <X className="h-4 w-4 text-[var(--text-muted)] transition hover:text-[var(--red)]" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button type="button" onClick={() => subtract(entry.item)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mid-grey)] transition hover:border-[var(--red)] hover:text-[var(--red)]">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-barlow text-sm font-semibold">{entry.qty}</span>
                      <button type="button" onClick={() => add(entry.item)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mid-grey)] transition hover:border-[var(--red)] hover:text-[var(--red)]">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 rounded-full font-barlow text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] transition hover:text-[var(--red)]"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
              </div>
            )}
            <div className="mt-6 space-y-3 border-t border-[var(--mid-grey)] pt-5 font-barlow">
              <p className="flex justify-between text-[var(--text-muted)]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></p>
              <p className="flex justify-between text-[var(--text-muted)]"><span>Delivery fee</span><span>{formatPrice(deliveryFee)}</span></p>
              <p className="flex justify-between text-xl font-bold text-[var(--charcoal)]"><span>Total</span><span>{formatPrice(total)}</span></p>
            </div>
            <form className="mt-6 space-y-3 border-t border-[var(--mid-grey)] pt-5" onSubmit={submitOrder}>
              <input
                className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                placeholder="Name"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                required
              />
              <input
                className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                required
              />
              <input
                className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                placeholder="Delivery Address"
                value={form.address}
                onChange={(event) => updateForm("address", event.target.value)}
                required
              />
              <textarea
                className="min-h-24 w-full resize-none border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                placeholder="Optional Notes"
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
              />
              <Button pulse className="w-full disabled:cursor-not-allowed disabled:opacity-55" disabled={cart.length === 0}>
                <MessageCircle className="h-4 w-4" />
                Send to WhatsApp
              </Button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}
