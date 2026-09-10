# Wireframe — Menu

```
┌────────────────────────────────────────────┐
│  [logo]                 Menu  About  Visit │
├────────────────────────────────────────────┤
│  Menu                                       │  page title
│  [ Coffee ] [ Tea ] [ Pastries ] [ Food ]   │  category jump links (optional)
├────────────────────────────────────────────┤
│  COFFEE                                      │  category heading
│  Espresso .......................... $3.00   │
│    Single origin, rotating                   │
│  Cappuccino ........................ $4.50   │
│    [v] [gf]                                   │  dietary tags
│  ...                                          │
├────────────────────────────────────────────┤
│  PASTRIES                                    │
│  Almond croissant .................. $4.00   │
│  ...                                          │
├────────────────────────────────────────────┤
│  Footer                                      │
└────────────────────────────────────────────┘
```

- Items come from a single data source (`data/menu.ts` or CMS).
- Each item: name, description, price, tags[].
- Two columns on desktop, one on mobile.
