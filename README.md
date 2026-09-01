# chipiotembedded.com

Static marketing site for **ChipIOT Embedded Solutions Pvt Ltd** — embedded
systems and IoT product development, Pune, India. Plain HTML/CSS/JS, no
build step, no framework dependency.

## Structure

```
index.html          Home
about.html           About / company story + founder message
how-we-work.html     3-step process (Discover → Design & Prototype → Validate & Deliver)
services.html        5 service cards
why-us.html          Why Us (4 differentiators)
contact.html         Contact form + details
assets/css/style.css Brand system + layout
assets/js/main.js    Mobile nav toggle + contact form handling
assets/img/          Favicon + site photography
```

Every page shares the same header/nav and footer markup (duplicated per
page, not templated) so the site works from any static host with zero
build tooling — just point a host at the repo root.

ABHAY has its own subdomain (`abhay.chipiotembedded.com`), so every "ABHAY"
nav link and CTA across this site (`href="https://abhay.chipiotembedded.com"`,
`target="_blank"`) points there rather than to a page in this repo. The
homepage still carries a "Flagship Product" spotlight section that teases
ABHAY and links out — there's no local `abhay.html` to maintain.

## Brand system

- **Type:** Oswald (headings), IBM Plex Mono (body/technical labels) — both
  loaded from Google Fonts.
- **Color:** blue `#3B5DF1`, orange `#FA9600`, dark `#12141C` neutral.
- **Motif:** the two-triangle ChipIOT mark is carried through as a visual
  language — diagonal section dividers, angled panels in hero/about/why-us
  art, and the nav/footer logo mark.

## Imagery

`assets/img/` holds the site's real photography (all resized/compressed
for web — originals ran 190KB–970KB, these are 54KB–160KB):

| File | Used on | Content |
|---|---|---|
| `hero-manufacturing.jpg` | Home hero | Laser-cutting a metal panel |
| `embedded-board.jpg` | Home "About ChipIOT" | Controller board close-up |
| `iot-connectivity.jpg` | Home + How We Work dark sections (background) | IoT concept shot |
| `prototyping-breadboard.jpg` | About "Who We Are" | Hand prototyping on a breadboard |
| `founder-anurag-doshi.jpg` | About founder section | Anurag Doshi, cropped square from the original portrait |
| `hardware-macro.jpg` | Services "Process" | Controller board with jumper wires |
| `quality-testing.jpg` | Why Us "Proof, Not Promises" | Multimeter testing an assembly |

The nav/footer logo mark (inline `<svg>`, viewBox `0 0 422 478`) is
traced pixel-for-pixel from the real ChipIOT logo file, by scanning the
source image's color boundaries and reconstructing the exact polygon
vertices — not a freehand approximation. It's two blue triangles (upper
and lower half, sharing a flat left edge) plus one orange triangle,
matching the "two-triangle mark" exactly.

To swap any image: replace the file in `assets/img/` (same filename) or
update the `src` in the relevant `<img>` tag.

## Contact form

`contact.html` validates client-side, then hands off to the visitor's own
email client via a pre-filled `mailto:anuragg@chipiotembedded.com` link
(subject + body built from the form fields) — this works on any static
host with zero backend, since the visitor's own client sends the email.
It's also wired for **Netlify Forms** (`data-netlify="true"` + hidden
`form-name` field + honeypot field) as a background best-effort capture:
if deployed to Netlify, submissions are recorded there too, even if the
visitor closes their mail client without hitting send. Both `main.js`'s
`CONTACT_EMAIL` constant and the `mailto:` links in each page's footer/
contact-info need updating together if the address ever changes.

## SEO

Each page has a unique `<title>` and meta description built around
"embedded systems Pune", "IoT product development India", and "ABHAY
emergency alert system" per the brief. Add `robots.txt` / `sitemap.xml`
and an OG image once the domain is live.

## Deploying

No build step required. Any static host works:

- **Netlify / Vercel / GitHub Pages:** point at the repo root, publish
  directory `/`.
- **Netlify Forms** activates automatically on Netlify without extra
  configuration, since the form markup is already in place.
