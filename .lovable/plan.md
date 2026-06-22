## Problème

Le « ? » bleu sur iPhone est l'icône d'image cassée de Safari iOS. La carte actuelle (`belgium-map.png`, 781 KB) est un PNG haute résolution. Safari iOS impose une limite de mémoire de décodage d'image (~5 mégapixels sur les anciens iPhone, parfois moins selon la RAM disponible). Au-delà, l'image n'est tout simplement pas rendue — exactement le symptôme observé. Le format PNG, non compressé pour les photos/illustrations complexes, aggrave le problème.

## Solution

Régénérer l'asset en version optimisée pour le web :

1. Convertir la carte en **JPEG** (ou WebP) à une largeur max de **1200 px** — largement suffisant pour un affichage net jusqu'au Retina sur desktop, puisque le conteneur fait au plus ~600 px d'affichage.
2. Uploader la nouvelle version via `lovable-assets` et remplacer le pointeur `src/assets/belgium-map.png.asset.json`.
3. Supprimer l'ancien asset CDN (devenu inutile).
4. Garder le code JSX inchangé (l'import lit toujours `.url` depuis le JSON).

## Détails techniques

- Utilisation de `imagegen--edit_image` pour rééchantillonner la carte existante en JPEG 1200 px de large (compression ~85, ~150–250 KB attendus).
- `lovable-assets create --file <jpeg> --filename belgium-map.jpg` → écraser `src/assets/belgium-map.png.asset.json` avec le nouveau pointeur (le nom de fichier dans le JSON change, le composant ne s'en soucie pas car il lit `.url`).
- Suppression du précédent asset PNG via `delete_asset`.
- Vérification mobile via Playwright (viewport 390 px) que `naturalWidth > 0`.

## Résultat attendu

Carte affichée correctement sur iPhone, chargement plus rapide sur tous les appareils, qualité visuelle identique à l'œil.