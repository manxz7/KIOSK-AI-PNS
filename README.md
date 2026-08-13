# AI Assistant Kiosk — Perbendaharaan Negeri Selangor (PNS)

Frontend-only kiosk UI for a government AI assistant self-service terminal.
Built with React + TypeScript + Vite + Tailwind CSS v4.

No backend, API, authentication, or database is implemented — all data is
placeholder/dummy per the frontend UI specification. Voice/AI features are
UI-only mockups.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
```

## Pages

- Cover Page (`/`)
- User Category (`/kategori`) — selecting a category opens the Name Input
  popup (`NameInputModal.tsx`), not a separate page
- Main Menu (`/menu`)
- Pinjaman (`/pinjaman`)
- Pembayaran (`/pembayaran`)
- Semakan (`/semakan`)
- Info (`/info`)
- eAduan (`/eaduan`)
- AI Assistant (`/ai-assistant`) — shared by every service

## Structure

- `src/pages/` — route-level pages
- `src/components/layout/` — page shell, header, service list template
- `src/components/ui/` — buttons, cards, icons, AI robot placeholder
- `src/context/AppContext.tsx` — in-memory app state (category, name, language)
- `src/data/kioskData.ts` — menu items, FAQ questions, dummy AI responses

## Next steps for backend integration

Each service page navigates to `/ai-assistant`, setting `activeTopic` in
`AppContext`. Backend/API integration can hook into that same context and
the chat send handler in `AIAssistantPage.tsx` without changing the UI
structure. The 3D robot placeholder (`AIRobot.tsx`) is where the real 3D
model/avatar should be mounted later.
