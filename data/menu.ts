/**
 * The menu — single source of truth for the app.
 *
 * Seeded from `docs/menu-items.csv` (the human-editable content doc). When the
 * CSV changes, update this file to match. Prices are plain numbers here and are
 * formatted for display (`£4.50`) at the edge via `lib/money.ts`.
 */

export type MenuCategory =
  | "Espresso Drinks"
  | "Cold Drinks"
  | "Pastries"
  | "Sandwiches";

export type MenuBadge = "Popular" | "House favourite";

export type MenuItem = {
  /** Stable key; also the image filename base (`/images/menu-<slug>.webp`). */
  slug: string;
  name: string;
  description: string;
  /** GBP, e.g. 4.5 -> "£4.50". */
  price: number;
  category: MenuCategory;
  badge?: MenuBadge;
  image: { src: string; alt: string };
};

/** Section order on the menu page. */
export const MENU_CATEGORIES: MenuCategory[] = [
  "Espresso Drinks",
  "Cold Drinks",
  "Pastries",
  "Sandwiches",
];

const img = (slug: string, alt: string) => ({
  src: `/images/menu-${slug}.webp`,
  alt,
});

export const menu: MenuItem[] = [
  // — Espresso Drinks —
  {
    slug: "espresso",
    name: "Espresso",
    description:
      "Two ounces of our weekly single-origin, pulled short and bright.",
    price: 3.25,
    category: "Espresso Drinks",
    image: img("espresso", "A short espresso in a white cup"),
  },
  {
    slug: "cortado",
    name: "Cortado",
    description: "Equal parts espresso and warm milk, served in a small glass.",
    price: 3.75,
    category: "Espresso Drinks",
    image: img("cortado", "A cortado in a small glass on a saucer"),
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    description: "A double shot under a deep layer of dense, dry foam.",
    price: 4.25,
    category: "Espresso Drinks",
    image: img("cappuccino", "A cappuccino with a dusting of cocoa"),
  },
  {
    slug: "flat-white",
    name: "Flat White",
    description: "Double ristretto and silky steamed milk, no dry foam.",
    price: 4.5,
    category: "Espresso Drinks",
    badge: "Popular",
    image: img("flat-white", "A flat white with a leaf latte-art pattern"),
  },
  {
    slug: "cafe-au-lait",
    name: "Café au Lait",
    description:
      "House drip and steamed milk in equal measure, easy and unfussy.",
    price: 4.0,
    category: "Espresso Drinks",
    image: img("cafe-au-lait", "A café au lait in a wide ceramic cup"),
  },
  {
    slug: "mocha",
    name: "Mocha",
    description: "Espresso, steamed milk, and 70% dark chocolate ganache.",
    price: 4.75,
    category: "Espresso Drinks",
    badge: "House favourite",
    image: img("mocha", "A mocha topped with steamed milk"),
  },

  // — Cold Drinks —
  {
    slug: "iced-latte",
    name: "Iced Latte",
    description: "Double shot over ice with your choice of milk.",
    price: 4.75,
    category: "Cold Drinks",
    image: img("iced-latte", "An iced latte in a tall glass"),
  },
  {
    slug: "cold-brew",
    name: "Cold Brew",
    description: "Steeped eighteen hours for a smooth, low-acidity cup.",
    price: 4.5,
    category: "Cold Drinks",
    badge: "Popular",
    image: img("cold-brew", "A glass of cold brew coffee over ice"),
  },
  {
    slug: "vanilla-drift-cold-brew",
    name: "Vanilla Drift Cold Brew",
    description: "Cold brew with house vanilla syrup and a splash of oat milk.",
    price: 5.25,
    category: "Cold Drinks",
    badge: "House favourite",
    image: img(
      "vanilla-drift-cold-brew",
      "A vanilla cold brew with a swirl of oat milk",
    ),
  },
  {
    slug: "iced-matcha-latte",
    name: "Iced Matcha Latte",
    description: "Stone-ground ceremonial matcha, cold milk, lightly sweetened.",
    price: 5.5,
    category: "Cold Drinks",
    image: img("iced-matcha-latte", "An iced matcha latte in a clear glass"),
  },
  {
    slug: "sparkling-hibiscus",
    name: "Sparkling Hibiscus",
    description: "House hibiscus-ginger tea over ice, topped with soda.",
    price: 4.0,
    category: "Cold Drinks",
    image: img("sparkling-hibiscus", "A deep-red sparkling hibiscus drink"),
  },

  // — Pastries —
  {
    slug: "almond-croissant",
    name: "Almond Croissant",
    description: "Twice-baked with almond cream and toasted flaked almonds.",
    price: 4.25,
    category: "Pastries",
    badge: "House favourite",
    image: img("almond-croissant", "An almond croissant dusted with sugar"),
  },
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    description: "Laminated over three days with French butter. Baked at six.",
    price: 3.5,
    category: "Pastries",
    image: img("butter-croissant", "A golden butter croissant"),
  },
  {
    slug: "pain-au-chocolat",
    name: "Pain au Chocolat",
    description: "Two batons of dark chocolate folded into buttery layers.",
    price: 3.75,
    category: "Pastries",
    badge: "Popular",
    image: img("pain-au-chocolat", "A pain au chocolat on a wire rack"),
  },
  {
    slug: "morning-bun",
    name: "Morning Bun",
    description: "Croissant dough rolled in orange zest and cinnamon sugar.",
    price: 4.0,
    category: "Pastries",
    image: img("morning-bun", "A morning bun coated in cinnamon sugar"),
  },
  {
    slug: "banana-bread",
    name: "Banana Bread",
    description: "Loaf-style, brown butter and walnuts, toasted on request.",
    price: 3.75,
    category: "Pastries",
    image: img("banana-bread", "A thick slice of banana bread"),
  },

  // — Sandwiches —
  {
    slug: "egg-and-gruyere-on-brioche",
    name: "Egg and Gruyère on Brioche",
    description:
      "Soft scrambled eggs, aged Gruyère, and chive on a toasted brioche bun.",
    price: 7.5,
    category: "Sandwiches",
    badge: "Popular",
    image: img(
      "egg-and-gruyere-on-brioche",
      "An egg and Gruyère sandwich on a brioche bun",
    ),
  },
  {
    slug: "turkey-and-havarti",
    name: "Turkey and Havarti",
    description:
      "Roast turkey, dill Havarti, greens, and whole-grain mustard on sourdough.",
    price: 9.0,
    category: "Sandwiches",
    image: img(
      "turkey-and-havarti",
      "A turkey and Havarti sandwich on sourdough",
    ),
  },
  {
    slug: "caprese-baguette",
    name: "Caprese Baguette",
    description:
      "Fresh mozzarella, tomato, basil, and olive oil on a crisp baguette.",
    price: 8.5,
    category: "Sandwiches",
    badge: "House favourite",
    image: img("caprese-baguette", "A caprese baguette cut in half"),
  },
  {
    slug: "ham-and-butter-baguette",
    name: "Ham and Butter Baguette",
    description:
      "Paris ham and cultured butter on baguette. Nothing else, on purpose.",
    price: 8.0,
    category: "Sandwiches",
    image: img("ham-and-butter-baguette", "A ham and butter baguette"),
  },
];

/** Items grouped for the menu page, in `MENU_CATEGORIES` order. */
export function menuByCategory(): { category: MenuCategory; items: MenuItem[] }[] {
  return MENU_CATEGORIES.map((category) => ({
    category,
    items: menu.filter((item) => item.category === category),
  }));
}

/** The "most popular" set shown on the home page. */
export const featuredItems: MenuItem[] = menu.filter(
  (item) => item.badge === "Popular",
);
