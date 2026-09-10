import Image from "next/image";
import { cn } from "@/lib/cn";
import { Rating } from "./Rating";
import { Tag } from "./Tag";

export type Product = {
  name: string;
  /** Formatted for display, e.g. "£4.50". */
  price: string;
  /** Short descriptor under the name, e.g. "Oat milk, dark roast". */
  note?: string;
  image: { src: string; alt: string };
  rating?: { value: number; count?: number };
  tags?: string[];
  /** One emphasized status, e.g. "Popular". Rendered as a solid Tag. */
  badge?: string;
};

type ProductCardProps = {
  product: Product;
  /** Called when "Add to cart" is pressed. Omit to render a static card. */
  onAdd?: (product: Product) => void;
  className?: string;
};

/**
 * Menu / shop item. Image sits on the latte surface; text block below is quiet
 * sans with the price in espresso (not the bronze accent — bronze is for
 * ratings only). "Add to cart" is a real verb with the system arrow.
 */
export function ProductCard({ product, onAdd, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-sm border border-line bg-foam",
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden rounded-t-sm bg-latte">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          className="object-cover"
        />
        {(product.badge || (product.tags && product.tags.length > 0)) && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badge && <Tag variant="solid">{product.badge}</Tag>}
            {product.tags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        {product.rating && (
          <Rating value={product.rating.value} count={product.rating.count} />
        )}
        <h3 className="text-h3 text-espresso">{product.name}</h3>
        {product.note && (
          <p className="text-small text-mocha">{product.note}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-sans text-body font-medium text-espresso">
            {product.price}
          </span>
          {onAdd && (
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="group/add inline-flex items-center gap-1.5 font-sans text-small font-medium text-espresso underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-espresso"
            >
              Add to cart
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/add:translate-x-1"
              >
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
