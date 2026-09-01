"use client";

import type { MenuItem } from "@/data/menu";
import { Button } from "./Button";
import { useCart } from "./CartProvider";

type OrderButtonProps = {
  item: MenuItem;
  children?: React.ReactNode;
  className?: string;
};

export function OrderButton({ item, children = "Order Now", className = "" }: OrderButtonProps) {
  const { addItem } = useCart();

  function handleClick() {
    addItem(item);
  }

  return (
    <Button type="button" onClick={handleClick} className={className} disabled={item.available === false}>
      {item.available === false ? "Sold out" : children}
    </Button>
  );
}
