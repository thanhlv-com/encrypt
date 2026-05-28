# CryptoTools

CryptoTools is a browser-based web app for text encryption/decryption using symmetric algorithms:

- AES
- DES
- Triple DES
- RC4

The app is built with React + Vite + TypeScript, includes light/dark theme support, and provides basic PWA offline caching.

## Key Features

- Encrypt and decrypt text per algorithm.
- Quickly switch between Encrypt/Decrypt via `Swap to ...`.
- Copy output to clipboard.
- Persist theme mode (`light` / `dark` / `system`) in `localStorage`.
- URL-based navigation (for example: `/aes-encrypt`, `/rc4-decrypt`) with `history.pushState`.
- PWA support via service worker (`vite-plugin-pwa`, `registerType: autoUpdate`).

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- `crypto-js`
- `vite-plugin-pwa`

## Requirements

- Node.js 18+ (latest LTS recommended)
- npm

## Install and Run Locally

```bash
npm install
npm run dev
```

By default, the app runs at `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production into dist/
npm run preview  # Preview production build
npm run lint     # Type-check with TypeScript (tsc --noEmit)
npm run clean    # Remove dist and server.js
```

## Tool Routes

| Route | Function |
| --- | --- |
| `/aes-encrypt` | AES Encrypt |
| `/aes-decrypt` | AES Decrypt |
| `/des-encrypt` | DES Encrypt |
| `/des-decrypt` | DES Decrypt |
| `/tripledes-encrypt` | Triple DES Encrypt |
| `/tripledes-decrypt` | Triple DES Decrypt |
| `/rc4-encrypt` | RC4 Encrypt |
| `/rc4-decrypt` | RC4 Decrypt |

If an invalid route is requested, the app falls back to the first tool in the list.

## Main Project Structure

```text
.
├── src/
│   ├── App.tsx
│   ├── tools.ts
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ToolLayout.tsx
│   └── tools/
│       └── EncryptionTool.tsx
├── doc/
│   ├── README.md
│   └── ARCHITECTURE.md
├── vite.config.ts
└── package.json
```

## Environment Variables

Current encryption/decryption features do not require any API key.  
The `.env.example` file is kept from the original template.

Variable currently used directly in code:

- `DISABLE_HMR=true`: disables HMR in environments where file watching should be reduced.

## Security Notes

- DES and RC4 are legacy algorithms and not recommended for modern security use cases.
- For sensitive data, prefer AES and use a clear key-management process.
- Processing is client-side, but key handling, clipboard usage, and browser logs still require caution.

## Additional Docs

- `doc/README.md`: feature and architecture overview.
- `doc/ARCHITECTURE.md`: routing, state, and PWA/offline behavior.
