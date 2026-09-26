# Collab

Prototipo mobile-first per creativi, realizzato con React, Vite, CSS e lucide-react. Dati e interazioni sono locali e si azzerano al refresh. Nessun backend.

## Avvio

Richiede Node.js 22 e npm.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## GitHub Pages

Il progetto usa `base: './'` e `HashRouter`, quindi funziona anche nella sottocartella di un repository. Le pagine sono `#/`, `#/messages` e `#/profile`; ricaricare una pagina non richiede redirect lato server.

Carica il progetto in un repository GitHub con branch `main`, quindi in **Settings → Pages → Build and deployment → Source** seleziona **GitHub Actions**. Il workflow incluso pubblica `dist` a ogni push su `main` e può essere avviato manualmente. Per un branch diverso, aggiorna `.github/workflows/deploy.yml`.

Fotografie remote da Unsplash e font da Google Fonts richiedono connessione. Il link portfolio dimostrativo apre Vimeo. Like, salvataggi, richieste, candidature, modifiche profilo e messaggi rimangono in memoria durante la navigazione.
