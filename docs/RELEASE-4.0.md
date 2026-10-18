# Curvature Wake 4.0 — visual and sound rebuild

The vertical shooter and Luo Ji / Wallfacer gameplay remain intact. Combat retains the minimum 120-second rule, eight active abilities, twelve draft upgrades and four encounter types.

- Seven original image concepts were generated through Merouter, then submitted to Meshy 7.1 image-to-3D. Four spacecraft and three chapter landmarks were imported and inspected in Blender 4.5.5, normalized, exported, reopened and imported in Unity. Each export has 16–23k triangles, one PBR material and 2K texture maps. Single-view backsides are inferred; this is not a claim of manual retopology.
- Three chapter layouts: Red Coast orbital infrastructure, three-sun silicon monoliths, and Dark Forest listening gates. Each has a separate original distant environment matte and lighting palette. Repeated props within a chapter form its scrolling layout; chapters no longer share the same rail environment.
- Original PBR textures now survive runtime import. Mipmaps and anisotropic filtering reduce distant shimmer. Energy fields, shield Fresnel, layered beam, particle bursts, pressure waves, short point-light flashes, bounded camera impulse and lightweight bloom strengthen combat feedback.
- Persistent Web HUD is reduced to a 42px top telemetry rail and a 61px bottom ability dock at 1280×720. Comms are transient, and upgrade selection still pauses the simulation.
- New opening and combat tracks generated through Merouter / Eleven Music. Four-second loop crossfades, roughly -19.5 LUFS masters, separate equal-power music crossfade, explosion ducking, fixed tempo and a ten-voice effect pool replace the old clipping-prone mix. Effects play their complete clip lifetime. Five new synthesized silicon/metal transients support the rhythm.

## Validation

58 Unity editor Play Mode checks passed, covering real GLB loading, retained PBR materials, mipmaps, chapter roots, backdrops, eight abilities, draft state, restart, pause, boss timing and two-minute minimum. Seven native Blender checkpoints were reopened in a separate process; each exported GLB was reimported. LOD modifier control was changed, measured and restored.

Actual Unity scene screenshots: `reports/unity-final/`. A representative music/effects mix measures -8.9 dBFS peak; this sample is gain-staging evidence, not a measurement of every possible gameplay mix.

WebGL built successfully with zero build errors (98,271,524 bytes). Actual local Chromium combat at 1920×1080 measured 119.9 and 120.0 FPS in two 8-second samples, with no observed console errors. Upgrade selection, three simultaneous skill commands, resource consumption and pause/resume were exercised through the visible UI. Deployment validation is recorded separately after publication.

## Build

Unity 6000.3.26f1 with WebGL module. Run `WebBuild.Build`, setting CURVATURE_WEB_OUTPUT to the web/public/unity directory. In web, `npm ci && npm run build`. Menv imports the public GitHub repository on main and serves dist as a static site.

React Bits: DecryptedText, CountUp and ClickSpark; upstream license retained. Original generated artwork follows a Marathon-inspired visual direction; no Bungie assets or logos are used. This is an unofficial Three-Body fan simulation.
