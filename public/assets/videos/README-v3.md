# V3 cinematic clips

The v3 reference contains photographs with simulated cinematic motion, not
production video clips. The v3 homepage therefore ships complete graded posters
and uses CSS/GSAP movement without requesting missing video files.

`v3-hero.mp4.placeholder` and `v3-hero.webm.placeholder` reserve the production
hero clip names. These are text markers, not media, and must never be passed to a
video source. Replace them with real `v3-hero.mp4` / `v3-hero.webm` encodes, then
pass `sources={{ mp4: "/assets/videos/v3-hero.mp4", webm:
"/assets/videos/v3-hero.webm" }}` to `CinematicVideo` to enable playback.

Keep the clip silent, loopable, and composed like the hero poster so the guard's
face remains visible when the desktop hero shrinks into its card. Use VP9 WebM
and H.264 MP4, and preserve the existing warm/navy grade. The component uses
`preload="none"`, plays only while intersecting the viewport, pauses offscreen or
when the document is hidden, and leaves the poster visible for reduced motion,
autoplay rejection, or a media load failure.

The pre-existing `hero-loop.mp4` and `hero-loop.webm` are retained unchanged for
older `VideoTile` consumers. They are not silently substituted into the v3
reference's different photographic composition.
