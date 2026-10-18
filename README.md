# 曲率航迹 / Curvature Wake 5.0

Public Git deployment source for the Unity WebGL game and React HUD.

Play: https://nug4cwx5qr7x.app.stg.medeo.ai/

`npm ci && npm run build` creates `dist/`. Menv imports this public repository on `main`, using static hosting, an empty root directory and output directory `dist`.

## 5.0 technical art and sound design

Eight distinct multi-layer skill effects, an original emission atlas, screen-space gravity lensing, segmented energy shields, helical ionized beams, folded dimensional planes and local energy lighting. Near/middle/far environment layers have different parallax speeds and depth haze. Upgrade cards now maintain readable contrast while hovered or focused. Seventeen sample-based sound effects give abilities distinct sonic identities, with reserved skill voices and bounded mix headroom.

See [5.0 release notes](docs/RELEASE-5.0.md), [technical-art provenance](docs/ASSET-PROVENANCE-5.0.json) and [79 Unity validation checks](docs/unity-validation.txt). The seven Meshy assets and chapter environments from [4.0](docs/RELEASE-4.0.md) are retained. Full editable Unity and Blender sources are maintained separately in the owner's private `arthen97/curvature-wake` repository.

## Controls

WASD / arrows or mouse drag: move. Automatic shooting. J/K/L: sophon, foil, dash. Q/E/R/F: shield, decoy, gravity, lance. Space: Dark Forest broadcast. 1/2/3: choose a draft upgrade. Escape: pause. Eight active abilities and twelve stackable upgrades preserve Luo Ji's first-person Wallfacer route.

Stable orbit lasts 132 seconds, chaotic suns 144 seconds; the droplet arrives after 120 seconds. Emergency reconstruction protects the first 120 seconds with a 20% score penalty and weapon downgrade.

## Attribution

New 5.0 VFX atlas generated with OpenAI imagegen. Original environment images and music generated through Merouter (`gpt-image-2`, `eleven-music-v1`); 3D assets generated through Meshy. No generation API or credentials are used at runtime. Art direction is Marathon-inspired; no Bungie assets or logos are used. Unofficial Three-Body fan simulation.

React Bits: https://github.com/DavidHDev/react-bits — DecryptedText, CountUp, ClickSpark, AnimatedContent, SpotlightCard, StarBorder. See `public/REACT-BITS-LICENSE.txt`. Noto Sans SC: `public/FONT-LICENSE.txt`.

## 5.0 additions

Elite lock-on attacks, modeled enemy darts and supply capsules, physically integrated gravity/pickup motion, 13 Mandarin Luo Ji narration clips, and a local Wallfacer flight archive (last 30 sorties, successful skill use, upgrade timeline, JSON export). React Bits AnimatedContent, SpotlightCard and StarBorder animate tactical decisions and readiness. See [release notes](docs/RELEASE-5.0.md).
