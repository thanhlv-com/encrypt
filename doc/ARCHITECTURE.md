# Application Behavior & Offline Support

## Routing and History
The `App.tsx` component is configured to respond to URL routing via the standard Browser History API.
- Changes in the selected tool will invoke `window.history.pushState(null, '', \`/${activeToolId}\`)` which modifies the URL without a page reload.
- The `popstate` event is caught to correctly navigate back and forth, restoring previously opened tool states.

## Component Context
The app allows users to switch between different tools, such as moving from `aes-encrypt` to `des-encrypt`.
- It keeps independent states per cryptographic algorithm utilizing a `Record<string, string>` map.
- The UI maintains the `input` and `output` state internally within elements like `EncryptionTool.tsx`, avoiding data leak or unintentional copying between `AES`, `DES`, `Triple DES`, and `RC4` inputs when switching routes.
- The `encrypt` and `decrypt` models for each algorithm hold decoupled input states: Encrypt inputs stay in encrypt tabs, Decrypt inputs stay in decrypt tabs.

## Progressive Web App (PWA)
The app utilizes `vite-plugin-pwa` in `vite.config.ts`.
- **Auto-Update mode**: The UI handles prompting when new updates are detected, refreshing on user consent.
- **Service Worker Caching**: Static files (HTML, JS, CSS, fonts) are cached automatically. A custom `NetworkFirst` fallback is configured to load the app if online, and fall back to the cached version when offline. External font delivery from Google Fonts is managed with a `CacheFirst` strategy.
