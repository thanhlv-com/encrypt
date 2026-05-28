# CryptoTools Documentation

## Overview
CryptoTools is a browser-based, comprehensive suite of cryptography tools. It allows users to encrypt and decrypt text using various symmetric algorithms, including AES, DES, Triple DES, and RC4. The application is built with React, Vite, and Tailwind CSS and supports Progressive Web App (PWA) features for offline use.

## Architecture

*   **Framework:** React 18+ with Vite
*   **Styling:** Tailwind CSS (configured in `vite.config.ts`)
*   **Routing:** Custom client-side routing based on the URL pathname (e.g., `/aes-encrypt`). The browser's History API (`pushState` and `popstate`) is used.
*   **Cryptography Engine:** Uses `crypto-js` for AES, DES, Triple DES, and RC4 encryption/decryption.
*   **State Management:** React hooks (`useState`, `useEffect`).
*   **Components:**
    *   `App.tsx`: Main entry point and router. Manages active tool state and maintains separate context state (`encrpyt` vs `decrypt` inputs/outputs) for different algorithm tabs.
    *   `Sidebar.tsx`: Navigation menu listing the available tools, categorized under "Cryptography".
    *   `EncryptionTool.tsx`: A dynamically rendered tool component that handles the UI for encryption/decryption, inputs and outputs states, rendering different algorithms based on current route.
*   **Offline Mode / PWA:**
    *   Using `vite-plugin-pwa` in `vite.config.ts`.
    *   `virtual:pwa-register` handles service worker registration in `main.tsx`.
    *   Uses a `NetworkFirst` strategy combined with `CacheFirst` for static assets and fonts.

## Features

*   **Encryption and Decryption:** AES, DES, Triple DES, RC4.
*   **Swap Functionality:** Swap output to input and toggle between "Encrypt" mode and "Decrypt" mode simultaneously.
*   **Responsive and Theming:** Uses Tailwind CSS for a responsive layout and supports dark/light mode depending on the active theme class.
*   **Progressive Web App:** Installable on devices and features offline caching.

## Project Structure

```text
/
├── doc/
│   └── README.md
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   └── ThemeProvider.tsx
│   ├── tools/
│   │   ├── EncryptionTool.tsx
│   │   └── index.ts (Tools definition)
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── tools.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```
