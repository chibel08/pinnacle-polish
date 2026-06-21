# Déploiement Vercel — adapter la config

## Pourquoi le 404

Le projet est actuellement buildé pour **Cloudflare Workers** (preset Nitro par défaut + wrapper SSR `src/server.ts` qui utilise la signature Worker `fetch(request, env, ctx)`). Vercel ne trouve pas la structure `.vercel/output/` qu'il attend, donc toutes les routes retournent 404.

## Changements

### 1. `vite.config.ts` — cibler Vercel
Ajouter le preset Nitro `vercel` pour que le build génère `.vercel/output/` (format que Vercel détecte automatiquement) :

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
  },
});
```

### 2. `src/server.ts` — rendre le wrapper compatible Vercel
Le wrapper actuel exporte `{ fetch(request, env, ctx) }` (format Cloudflare Worker). Sur Vercel (Node runtime), Nitro attend une fonction handler standard. Deux options :

- **Option A (simple)** : retirer l'override `server.entry` de `vite.config.ts` et laisser TanStack Start utiliser son entry par défaut. On perd le wrapper anti-500 (utile sur Cloudflare) mais Vercel a déjà son propre logging d'erreurs SSR — c'est acceptable.
- **Option B** : garder `src/server.ts` mais le réécrire en handler isomorphe compatible Node/Vercel.

Je recommande **Option A** : plus fiable, moins de surface de bug, Vercel affiche les erreurs SSR dans son dashboard.

### 3. Fichier `vercel.json` (optionnel)
Pas nécessaire — Nitro preset `vercel` génère tout ce qu'il faut. À ajouter seulement si on veut forcer des headers ou redirections.

## Côté Vercel (toi)

Après que je pousse les changements et que tu re-push sur GitHub :
1. Dans Vercel → Project Settings → **Build & Output Settings** : laisser tout en "Auto-detect" (Vercel reconnaîtra le preset Nitro).
2. **Framework Preset** : `Other` (ne pas choisir Vite — ça casserait le SSR).
3. **Build Command** : `bun run build` (ou laisser par défaut).
4. **Output Directory** : laisser vide (Nitro écrit dans `.vercel/output/` que Vercel détecte automatiquement).
5. Redéployer.

## À noter

- Aucune logique métier ne change : calculateur de devis, lien WhatsApp, design, contenu — tout reste identique.
- Si tu préfères zéro config et un déploiement instantané, le bouton **Publish** de Lovable reste l'option la plus simple (et tu peux brancher ton domaine dessus).
