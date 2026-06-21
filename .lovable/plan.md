# Ajouter `vercel.json` pour figer la config de déploiement

## Pourquoi

L'UI Vercel pré-remplit `Output Directory = dist` par défaut. Or notre build (Nitro preset `vercel`) émet vers `.vercel/output/` selon le format **Build Output API** de Vercel. Si on laisse `dist`, Vercel cherche au mauvais endroit → 404.

Un fichier `vercel.json` à la racine override ces réglages d'UI et garantit que chaque déploiement utilise la bonne config — pas besoin de toucher l'UI Vercel.

## Fichier à créer

`vercel.json` à la racine du projet :

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "outputDirectory": ".vercel/output"
}
```

- `framework: null` → équivaut à "Other" (empêche Vercel de présumer Vite/Next).
- `outputDirectory: ".vercel/output"` → pointe vers ce que Nitro génère.
- Build & install commands explicites (pas besoin de cocher d'override dans l'UI).

## Côté Vercel (toi)

Après push :
1. Va dans **Project Settings → Build & Output Settings**.
2. Décoche tous les "Override" si tu en avais activés — `vercel.json` prend le relais.
3. **Redeploy** (ou push un commit).

## Aucune autre modif

Le code de l'app, `vite.config.ts` (déjà avec preset Vercel), et le contenu ne changent pas.
