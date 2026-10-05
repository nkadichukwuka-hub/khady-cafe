# Khady's Café

A warm, fast website for a neighbourhood specialty-coffee café in east London, with a live AI chat assistant, a voice assistant and an online table-reservation flow. Built with Next.js and Claude Code.

**Live site:** [khady-cafe.vercel.app](https://khady-cafe.vercel.app)

## What it does

- **Pages:** home, menu and about, with location, opening hours and weekly events (open mic nights and coffee tasting).
- **Menu:** espresso drinks, cold drinks, pastries and sandwiches, with prices in GBP. The menu lives in one data file, so staff can keep it current.
- **Table reservations:** a form for name, party size, date and time slot. It is validated on the server, then sent to an [n8n](https://n8n.io) workflow that saves the booking. The request is protected with a shared secret.
- **AI chat assistant:** a chat widget that answers questions about the menu, prices and hours. It runs on an n8n workflow powered by Claude, remembers the conversation, and can take a reservation once it has the guest's name, group size and booking time. A same-origin API route forwards the messages, which avoids cross-origin problems in the browser.
- **Voice assistant:** a floating voice bubble backed by an [ElevenLabs](https://elevenlabs.io) conversational agent, so visitors can choose text or voice.

## Built with

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- [n8n](https://n8n.io) for the chat and reservation automations
- ElevenLabs Conversational AI for the voice widget

## How it was built

The site was designed and built with [Claude Code](https://claude.com/claude-code), working from a written design system and product docs kept in the repo:

- `design/` holds the brand, tokens, wireframes, component guide and style guide. The live style guide is at `/style-guide`.
- `docs/` holds the product overview and requirements, architecture notes and decision records.
- `CLAUDE.md` and `AGENTS.md` hold project instructions for the AI assistant, and `.claude/` holds a design-enforcer agent and an image-optimising skill.

## Getting started

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

Create a `.env.local` file in the project root. The values come from your own n8n and ElevenLabs accounts and are never committed.

| Variable | Used for |
| --- | --- |
| `N8N_CHAT_WEBHOOK_URL` | The n8n chat workflow that the chat widget talks to |
| `RESERVATION_WEBHOOK_URL` | The n8n workflow that receives new reservations |
| `RESERVATION_WEBHOOK_SECRET` | Shared secret sent with each reservation request |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | The ElevenLabs agent for the voice widget (voice is switched off if it is not set) |
| `SITE_URL` | The public address of the site |

## Project structure

```
app/
  page.tsx, menu/, about/, style-guide/   Pages
  api/chat/                               Forwards chat messages to n8n
  api/reserve/                            Validates and forwards reservations
components/ui/                            Navbar, footer, forms, cards, chat and voice widgets
data/                                     Café details, menu and events
lib/                                      Helpers (menu, money, reservations, events)
design/                                   Brand, tokens, wireframes and component docs
docs/                                     Product, architecture and guides
scripts/                                  Script that creates the ElevenLabs voice agent
```

## Author

Built by [Goshen Nkadi](https://www.linkedin.com/in/goshen-chukwuka-73842943a/), Claude Code and AI developer.
