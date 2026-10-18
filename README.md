# Curvature Wake — web release

Public deployment source for 曲率航迹, an original Unity orbital shooter with a React HUD.

`npm ci && npm run build` creates `dist/`. Menv deployment: static site, root directory blank, output directory `dist`.

WASD / arrows or mouse drag to move, automatic shooting, J sophon field, K foil, L dash, Escape pause. Stable orbit lasts 132 seconds, chaotic suns 144 seconds; the droplet arrives after 120 seconds. Emergency reconstruction protects the first 120 seconds, with a 20% score penalty and a weapon downgrade.

React Bits source: https://github.com/DavidHDev/react-bits. See `public/REACT-BITS-LICENSE.txt`. Noto Sans SC font subset: `public/FONT-LICENSE.txt`.

Original hero and textures generated through Merouter using gpt-image-2. Original 140-second score generated through Merouter using eleven-music-v1. No credentials or generation endpoints are used at runtime.

Full editable Unity source is maintained separately in the owner's arthen97/curvature-wake repository.
