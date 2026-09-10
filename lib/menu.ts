import type { Product } from "@/components/ui/ProductCard";
import type { MenuItem } from "@/data/menu";
import { formatGBP } from "@/lib/money";

/** Adapt a menu record to the shape `ProductCard` expects. */
export function menuItemToProduct(item: MenuItem): Product {
  return {
    name: item.name,
    price: formatGBP(item.price),
    note: item.description,
    image: item.image,
    badge: item.badge,
  };
}
