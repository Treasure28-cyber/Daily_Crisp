"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Check, MapPin, MessageCircle, Minus, Plus, ShoppingBag, Store, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import { PageHero } from "@/components/PageHero";
import { business } from "@/data/business";
import { formatPrice } from "@/data/menu";

type Fulfilment = "delivery" | "pickup";
type CheckoutForm = { name: string; phone: string; address: string; notes: string };

export default function OrderPage() {
  const { cart, addItem, subtractItem, removeItem, clearCart, showToast } = useCart();
  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [form, setForm] = useState<CheckoutForm>({ name: "", phone: "", address: "", notes: "" });
  const total = useMemo(() => cart.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0), [cart]);
  const errors = {
    ...(!form.name.trim() ? { name: "Please enter your name." } : {}),
    ...(!/^\d{7,15}$/.test(form.phone) ? { phone: "Enter a valid phone number." } : {}),
    ...(fulfilment === "delivery" && !form.address.trim() ? { address: "Please enter your delivery address." } : {}),
  };

  function updateForm(field: keyof CheckoutForm, value: string) {
    const clean = field === "name" ? value.replace(/[0-9]/g, "") : field === "phone" ? value.replace(/\D/g, "") : value;
    setForm((current) => ({ ...current, [field]: clean }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (cart.length === 0 || Object.keys(errors).length > 0) return;
    const nextReference = `DC-${Date.now().toString().slice(-6)}`;
    const items = cart.map((entry) => `• ${entry.item.name} x${entry.qty} — ${formatPrice(entry.item.price * entry.qty)}`).join("\n");
    const message = [
      `Hello Daily Crisps, my order reference is ${nextReference}.`, "", items, "",
      `Total: ${formatPrice(total)}`,
      `Order type: ${fulfilment === "delivery" ? "Delivery" : "Pickup"}`,
      fulfilment === "delivery" ? `Delivery address: ${form.address.trim()}` : `Pickup location: ${business.streetAddress}, ${business.locality}`,
      `Customer: ${form.name.trim()}`, `Phone: ${form.phone.trim()}`,
      `Notes: ${form.notes.trim() || "None"}`, "", "Please confirm availability, timing, and any delivery fee."
    ].join("\n");
    setReference(nextReference);
    window.open(`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    clearCart();
    showToast(`Order ${nextReference} prepared`);
    setSubmitted(false);
  }

  return (
    <>
      <PageHero eyebrow="Simple, direct ordering" title="Complete Your Order" description="Choose delivery or pickup, review your dishes, and send everything to our kitchen on WhatsApp." />
      <section className="bg-[var(--off-white)] px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          {reference ? <div className="mb-6 flex gap-3 rounded-2xl border border-red-100 bg-white p-5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--red-soft)] text-[var(--red)]"><Check className="h-5 w-5" /></span><div><p className="font-barlow font-semibold">Your order was prepared for WhatsApp.</p><p className="mt-1 font-barlow text-sm text-[var(--text-muted)]">Reference: <strong className="text-[var(--red)]">{reference}</strong>. Send the message in WhatsApp to confirm it.</p></div></div> : null}

          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-[var(--mid-grey)] bg-white">
              <div className="flex items-center justify-between border-b border-[var(--mid-grey)] px-5 py-4 sm:px-6"><div><p className="font-barlow text-xs font-semibold uppercase tracking-[0.16em] text-[var(--red)]">Your basket</p><h2 className="mt-1 font-playfair text-2xl font-bold">Review items</h2></div>{cart.length > 0 ? <button type="button" onClick={clearCart} className="inline-flex items-center gap-2 font-barlow text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--red)]"><Trash2 className="h-4 w-4" /> Clear</button> : null}</div>
              {cart.length === 0 ? (
                <div className="px-6 py-16 text-center"><ShoppingBag className="mx-auto h-11 w-11 text-red-200" /><h3 className="mt-4 font-playfair text-2xl font-bold">Your basket is empty</h3><p className="mx-auto mt-2 max-w-sm font-barlow text-sm text-[var(--text-muted)]">Browse the menu and add the dishes you would like.</p><Link href="/menu" className="mt-6 inline-flex rounded-full bg-[var(--red)] px-6 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.12em] text-white">Browse menu</Link></div>
              ) : <div className="divide-y divide-[var(--mid-grey)]">{cart.map((entry) => (
                <article key={entry.item.id} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[92px_minmax(0,1fr)] sm:p-5">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--light-grey)]"><Image src={entry.item.image} alt={entry.item.imageAlt} fill sizes="92px" className="object-cover" style={{ objectPosition: entry.item.imagePosition }} /></div>
                  <div className="min-w-0"><div className="flex items-start justify-between gap-3"><div><h3 className="font-playfair text-lg font-bold">{entry.item.name}</h3><p className="mt-1 font-barlow text-xs text-[var(--text-muted)]">{formatPrice(entry.item.price)} each</p></div><button type="button" onClick={() => removeItem(entry.item.id)} aria-label={`Remove ${entry.item.name}`} className="text-[var(--text-muted)] hover:text-[var(--red)]"><Trash2 className="h-4 w-4" /></button></div>
                    <div className="mt-4 flex items-center justify-between gap-3"><div className="flex items-center rounded-full border border-[var(--mid-grey)]"><button type="button" onClick={() => subtractItem(entry.item)} aria-label={`Reduce ${entry.item.name}`} className="p-2.5 hover:text-[var(--red)]"><Minus className="h-4 w-4" /></button><span className="min-w-8 text-center font-barlow text-sm font-semibold">{entry.qty}</span><button type="button" onClick={() => addItem(entry.item)} aria-label={`Add ${entry.item.name}`} className="p-2.5 hover:text-[var(--red)]"><Plus className="h-4 w-4" /></button></div><p className="font-barlow font-bold text-[var(--red)]">{formatPrice(entry.item.price * entry.qty)}</p></div>
                  </div>
                </article>
              ))}</div>}
            </div>

            <aside className="rounded-2xl border border-[var(--mid-grey)] bg-white p-5 sm:p-6 lg:sticky lg:top-28">
              <h2 className="font-playfair text-2xl font-bold">Checkout</h2><p className="mt-2 font-barlow text-sm text-[var(--text-muted)]">How would you like to receive your order?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">{(["delivery", "pickup"] as const).map((option) => { const active = fulfilment === option; const Icon = option === "delivery" ? MapPin : Store; return <button key={option} type="button" onClick={() => setFulfilment(option)} className={`rounded-xl border p-4 text-left transition ${active ? "border-[var(--red)] bg-[var(--red-soft)] text-[var(--red)]" : "border-[var(--mid-grey)] text-[var(--text-muted)] hover:border-red-200"}`}><Icon className="h-5 w-5" /><span className="mt-2 block font-barlow text-sm font-semibold capitalize">{option}</span></button>; })}</div>
              <div className="mt-6 border-y border-[var(--mid-grey)] py-4"><p className="flex justify-between font-barlow text-sm text-[var(--text-muted)]"><span>Items total</span><span>{formatPrice(total)}</span></p><p className="mt-2 flex justify-between font-barlow text-lg font-bold"><span>Total</span><span className="text-[var(--red)]">{formatPrice(total)}</span></p>{fulfilment === "delivery" ? <p className="mt-2 font-barlow text-xs text-[var(--text-muted)]">Delivery fee is confirmed by the kitchen.</p> : null}</div>
              <form className="mt-5 space-y-3" onSubmit={submitOrder} noValidate>
                <Field value={form.name} onChange={(value) => updateForm("name", value)} placeholder="Full name" error={submitted ? errors.name : undefined} />
                <Field value={form.phone} onChange={(value) => updateForm("phone", value)} placeholder="Phone number" error={submitted ? errors.phone : undefined} numeric />
                {fulfilment === "delivery" ? <Field value={form.address} onChange={(value) => updateForm("address", value)} placeholder="Delivery address" error={submitted ? errors.address : undefined} /> : <div className="rounded-xl bg-[var(--red-soft)] px-4 py-3 font-barlow text-sm text-[var(--text-muted)]">Pickup at {business.streetAddress}, {business.locality}.</div>}
                <textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} placeholder="Notes (optional)" rows={3} className="w-full resize-none rounded-xl border border-[var(--mid-grey)] px-4 py-3 font-barlow text-sm outline-none focus:border-[var(--red)]" />
                <Button className="w-full" disabled={cart.length === 0}><MessageCircle className="h-4 w-4" /> Send order to WhatsApp</Button>
                <p className="text-center font-barlow text-sm leading-6 text-[var(--text-muted)]">The kitchen confirms availability, timing, and any delivery fee.</p>
              </form>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ value, onChange, placeholder, error, numeric = false }: { value: string; onChange: (value: string) => void; placeholder: string; error?: string; numeric?: boolean }) {
  return <div><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} inputMode={numeric ? "numeric" : undefined} className="w-full rounded-xl border border-[var(--mid-grey)] px-4 py-3 font-barlow text-sm outline-none focus:border-[var(--red)]" />{error ? <p className="mt-1 font-barlow text-xs text-[var(--red)]">{error}</p> : null}</div>;
}
