# 曲率航迹 / Curvature Wake 4.0

Public Git deployment source for the Unity WebGL game and React HUD.

Play: https://nug4cwx5qr7x.app.stg.medeo.ai/

`npm ci && npm run build` creates `dist/`. Menv imports this public repository on `main`, using static hosting, an empty root directory and output directory `dist`.

## 4.0 visual and sound rebuild

Seven original image concepts → Meshy 7.1 → editable Blender validation → Unity. New detailed player, interceptor, carrier and sniper models, plus chapter-specific orbital facilities, silicon monoliths and listening gates. Three original distant environments, retained PBR textures, mipmaps, bloom, particle impacts and layered skill energy. Compact HUD returns most of the viewport to combat. New opening and combat scores use metallic FM rhythms, seamless loop crossfades and bounded sound-effect mixing.

See [release notes](docs/RELEASE-4.0.md), [asset provenance](docs/ASSET-PROVENANCE.json) and [58 Unity validation checks](docs/unity-validation.txt). Full editable Unity and Blender sources are maintained separately in the owner's private `arthen97/curvature-wake` repository.

## Controls

WASD / arrows or mouse drag: move. Automatic shooting. J/K/L: sophon, foil, dash. Q/E/R/F: shield, decoy, gravity, lance. Space: Dark Forest broadcast. 1/2/3: choose a draft upgrade. Escape: pause. Eight active abilities and twelve stackable upgrades preserve Luo Ji's first-person Wallfacer route.

Stable orbit lasts 132 seconds, chaotic suns 144 seconds; the droplet arrives after 120 seconds. Emergency reconstruction protects the first 120 seconds with a 20% score penalty and weapon downgrade.

## Attribution

Original images and music generated through Merouter (`gpt-image-2`, `eleven-music-v1`); 3D assets generated through Meshy. No generation API or credentials are used at runtime. Art direction is Marathon-inspired; no Bungie assets or logos are used. Unofficial Three-Body fan simulation.

React Bits: https://github.com/DavidHDev/react-bits — DecryptedText, CountUp, ClickSpark. See `public/REACT-BITS-LICENSE.txt`. Noto Sans SC: `public/FONT-LICENSE.txt`.
