"use client";

import Image from "next/image";
import type { FormEvent, MouseEvent, TouchEvent } from "react";
import { useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/Button";
import type { CartItem } from "@/components/CartProvider";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/menu";

type CheckoutForm = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

const WHATSAPP_NUMBER = "2349046116130";

function sanitizeName(value: string) {
  return value.replace(/[0-9]/g, "");
}

function sanitizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function validateForm(form: CheckoutForm) {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (!/[A-Za-z]/.test(form.name)) {
    errors.name = "Name must include letters.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{7,15}$/.test(form.phone)) {
    errors.phone = "Phone number should contain 7 to 15 digits.";
  }

  if (!form.address.trim()) {
    errors.address = "Please enter your delivery address.";
  }

  return errors;
}

function OrderedItemsCarousel({
  cart,
  onAdd,
  onSubtract,
  onRemove,
}: {
  cart: CartItem[];
  onAdd: (entry: CartItem) => void;
  onSubtract: (entry: CartItem) => void;
  onRemove: (id: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeStartX = useRef(0);
  const swipeEndX = useRef(0);
  const safeIndex = Math.min(currentIndex, Math.max(cart.length - 1, 0));

  function handleSwipe() {
    const distance = swipeStartX.current - swipeEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && safeIndex < cart.length - 1) {
      setCurrentIndex((index) => index + 1);
    } else if (isRightSwipe && safeIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  }

  function goToPrevious() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goToNext() {
    setCurrentIndex((index) => Math.min(index + 1, cart.length - 1));
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    swipeStartX.current = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    swipeEndX.current = event.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    swipeStartX.current = event.clientX;
  }

  function handleMouseUp(event: MouseEvent<HTMLDivElement>) {
    swipeEndX.current = event.clientX;
    handleSwipe();
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-[0_18px_45px_rgba(26,26,26,0.08)] md:min-h-[420px]">
        <ShoppingBag className="h-14 w-14 text-[var(--mid-grey)]" />
        <h2 className="mt-5 font-playfair text-3xl font-bold text-[var(--charcoal)]">
          Your order is empty
        </h2>
        <p className="mt-3 max-w-sm font-barlow text-[var(--text-muted)]">
          Add a dish from the menu, then your selected items will appear here
          for checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 md:bg-white md:p-6 md:shadow-[0_18px_45px_rgba(26,26,26,0.08)]">
      <div className="mb-5 hidden items-center justify-between gap-4 md:flex">
        <div>
          <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
            Ordered Items
          </p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-[var(--charcoal)]">
            Your Cart
          </h2>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 font-barlow text-sm font-semibold text-[var(--red)]">
          {cart.reduce((sum, entry) => sum + entry.qty, 0)}
        </span>
      </div>

      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {cart.map((entry) => (
            <article key={entry.item.id} className="min-w-full md:pr-1">
              <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-[0_12px_35px_rgba(26,26,26,0.06)]">
                <div className="relative aspect-square w-full bg-[var(--light-grey)] md:aspect-[4/3]">
                  <Image
                    src={entry.item.image}
                    alt={entry.item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 58vw, 90vw"
                    className="object-cover"
                    style={{ objectPosition: entry.item.imagePosition }}
                  />
                </div>
                <div className="p-5">
                  <p className="font-barlow text-xs font-semibold uppercase tracking-[0.15em] text-[var(--red)]">
                    {entry.item.category}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-playfair text-3xl font-bold leading-tight text-[var(--charcoal)]">
                        {entry.item.name}
                      </h3>
                      <p className="mt-2 font-barlow text-lg font-bold text-[var(--red)]">
                        {formatPrice(entry.item.price * entry.qty)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(entry.item.id)}
                      aria-label={`Remove ${entry.item.name}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--mid-grey)] text-[var(--text-muted)] transition hover:border-[var(--red)] hover:text-[var(--red)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-[var(--red)] bg-red-50 px-2 py-1 text-[var(--red)]">
                      <button
                        type="button"
                        onClick={() => onSubtract(entry)}
                        className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white"
                        aria-label={`Reduce ${entry.item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-16 text-center font-barlow text-xs font-semibold uppercase tracking-[0.14em]">
                        Qty {entry.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAdd(entry)}
                        className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white"
                        aria-label={`Add another ${entry.item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="shrink-0 font-barlow text-sm font-semibold text-[var(--text-muted)]">
                      {formatPrice(entry.item.price)} each
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {cart.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              disabled={safeIndex === 0}
              className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[var(--charcoal)] shadow-[0_14px_34px_rgba(26,26,26,0.16)] transition hover:border-[var(--red)] hover:text-[var(--red)] disabled:cursor-not-allowed disabled:opacity-45 md:flex"
              aria-label="Previous ordered dish"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              disabled={safeIndex === cart.length - 1}
              className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[var(--charcoal)] shadow-[0_14px_34px_rgba(26,26,26,0.16)] transition hover:border-[var(--red)] hover:text-[var(--red)] disabled:cursor-not-allowed disabled:opacity-45 md:flex"
              aria-label="Next ordered dish"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:mt-5">
        {cart.map((entry, index) => (
          <button
            key={entry.item.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === safeIndex
                ? "w-8 bg-[var(--red)]"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to ordered item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function OrderPage() {
  const { cart, addItem, subtractItem, removeItem, clearCart, showToast } =
    useCart();
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof CheckoutForm, boolean>>
  >({});
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0),
    [cart],
  );
  const total = subtotal;
  const errors = validateForm(form);
  const visibleErrors = submitted
    ? errors
    : Object.fromEntries(
        Object.entries(errors).filter(
          ([key]) => touched[key as keyof CheckoutForm],
        ),
      );

  function updateForm(field: keyof CheckoutForm, value: string) {
    const nextValue =
      field === "name"
        ? sanitizeName(value)
        : field === "phone"
          ? sanitizePhone(value)
          : value;
    setForm((current) => ({ ...current, [field]: nextValue }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (cart.length === 0 || Object.keys(errors).length > 0) return;

    const items = cart
      .map(
        (entry) =>
          `* ${entry.item.name} x${entry.qty} - ${formatPrice(entry.item.price * entry.qty)}`,
      )
      .join("\n");
    const message = [
      "Hello Daily Crisps,",
      "",
      "I would like to order:",
      "",
      items,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      `Total: ${formatPrice(total)}`,
      "Delivery fee: To be confirmed by Daily Crisps",
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

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    clearCart();
    showToast("✓ Order prepared successfully");
    setForm({
      name: "",
      phone: "",
      address: "",
      notes: "",
    });
    setSubmitted(false);
    setTouched({});
  }

  return (
    <section className="overflow-x-hidden bg-[var(--off-white)] px-6 py-10 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 md:mb-10">
          <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
            Fast Kitchen Queue
          </p>
          <h1 className="mt-3 font-playfair text-5xl font-bold text-[var(--charcoal)]">
            Order Now
          </h1>
        </div>

        {/*
          Menu listing intentionally disabled for the simplified checkout flow.
          Keep this section available for future use.

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
              {filtered.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_12px_35px_rgba(26,26,26,0.06)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                  Menu item controls were rendered here in the previous order page.
                </article>
              ))}
            </div>
          </div>
        */}

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <OrderedItemsCarousel
            cart={cart}
            onAdd={(entry) => addItem(entry.item)}
            onSubtract={(entry) => subtractItem(entry.item)}
            onRemove={removeItem}
          />

          <aside className="h-fit w-full min-w-0 bg-white p-6 shadow-xl lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="font-playfair text-3xl font-bold text-[var(--charcoal)]">
                Checkout
              </h2>
              {cart.length > 0 ? (
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 rounded-full font-barlow text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] transition hover:text-[var(--red)]"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-6 space-y-3 border-t border-[var(--mid-grey)] pt-5 font-barlow">
              <p className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <p className="flex justify-between text-[var(--text-muted)]">
                <span>Delivery fee</span>
                <span>Confirmed manually</span>
              </p>
              <p className="flex justify-between text-xl font-bold text-[var(--charcoal)]">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </p>
            </div>

            <form
              className="mt-6 space-y-3 border-t border-[var(--mid-grey)] pt-5"
              onSubmit={submitOrder}
              noValidate
            >
              <div>
                <input
                  className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                  placeholder="Name"
                  value={form.name}
                  onBlur={() =>
                    setTouched((current) => ({ ...current, name: true }))
                  }
                  onChange={(event) => updateForm("name", event.target.value)}
                  autoComplete="name"
                  required
                />
                {visibleErrors.name ? (
                  <p className="mt-1 font-barlow text-xs text-[var(--red)]">
                    {visibleErrors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <input
                  className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                  placeholder="Phone Number"
                  value={form.phone}
                  onBlur={() =>
                    setTouched((current) => ({ ...current, phone: true }))
                  }
                  onChange={(event) => updateForm("phone", event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  required
                />
                {visibleErrors.phone ? (
                  <p className="mt-1 font-barlow text-xs text-[var(--red)]">
                    {visibleErrors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <input
                  className="w-full border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                  placeholder="Delivery Address"
                  value={form.address}
                  onBlur={() =>
                    setTouched((current) => ({ ...current, address: true }))
                  }
                  onChange={(event) =>
                    updateForm("address", event.target.value)
                  }
                  autoComplete="street-address"
                  required
                />
                {visibleErrors.address ? (
                  <p className="mt-1 font-barlow text-xs text-[var(--red)]">
                    {visibleErrors.address}
                  </p>
                ) : null}
              </div>
              <textarea
                className="min-h-24 w-full resize-none border border-[var(--mid-grey)] bg-[var(--off-white)] px-4 py-3 font-barlow outline-none transition focus:border-[var(--red)]"
                placeholder="Optional Notes"
                value={form.notes}
                onChange={(event) => updateForm("notes", event.target.value)}
              />
              <Button
                pulse
                className="w-full disabled:cursor-not-allowed disabled:opacity-55"
                disabled={cart.length === 0}
              >
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
