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
assets/img/          Favicon
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

## On imagery — read before adding photos

The original build brief called for stock photography (soldering iron,
breadboard, generic "IoT hologram hand" shots) as placeholders. That's
exactly the templated-agency look the brief itself flagged as a problem —
ChipIOT's actual ABHAY product photography is the stronger, more credible
asset. So rather than ship generic stock:

- Every page currently uses **custom SVG/CSS graphics** built from the
  brand's own triangle motif and color system instead of photography.
- The founder section (`about.html`) uses an initials avatar in place of
  the CEO portrait — swap in the real photo when you have image assets to
  commit (inline chat images aren't retrievable as files by the agent that
  built this; they need to be added as real files in a follow-up).
- The nav/footer logo mark is a hand-recreated approximation of the real
  ChipIOT two-triangle logo (built from a description, not the actual
  `logo.png` file — inline chat images can't be saved as files). Replace
  the inline `<svg>` logo blocks with an `<img src="assets/img/logo.png">`
  once the real logo file is added to `assets/img/`.

To replace a placeholder: add the image to `assets/img/`, then swap the
relevant `<svg>` block for an `<img>` tag with the same class/positioning.

## Contact form

`contact.html` is wired for **Netlify Forms** (`data-netlify="true"` +
hidden `form-name` field + honeypot field) — if deployed to Netlify, form
submissions work with no backend code. On any other static host, the form
still validates client-side and shows a success message, but submissions
won't be captured until you point `main.js`'s `fetch` call at a real
form-handling endpoint (Formspree, a serverless function, etc.).

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
