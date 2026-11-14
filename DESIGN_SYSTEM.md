# Charte graphique & layout — SKYNET DIGITAL

> Document d'extraction du design system du projet `skynet-digital-interactive-site-web`
> (Next.js 16 · React 19 · Tailwind CSS v4 · GSAP). À réutiliser pour construire un autre site
> en conservant la même identité visuelle et la même structure de layout.

---

## 1. Stack technique

| Élément | Valeur |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) + CSS natif |
| Motion | GSAP 3.15 + ScrollTrigger |
| Fonts | `next/font/google` → Inter + Sora (self-hosted) |
| i18n | i18next (FR/EN) |
| Icônes | composant `Icon` (SVG sprite maison) |

Principes : HTML réel et accessible d'abord, animations comme enhancement, `prefers-reduced-motion` respecté, mobile-first.

---

## 2. Tokens de design

### 2.1 Couleurs de marque

| Token | Hex | Usage |
|---|---|---|
| `--color-magenta` | `#B13257` | Accent principal (magenta) |
| `--color-purple` | `#78377E` | Accent secondaire (violet) |
| `--color-blue` | `#3341AB` | Accent tertiaire (bleu) |
| `--color-blue-deep` | `#28348C` | Hover des boutons bleus |
| `--color-midnight` | `#111827` | Fond sombre principal |
| `--color-midnight-soft` | `#1B2437` | Surface de carte sur fond sombre |
| `--color-cloud` | `#F8FAFC` | Fond clair secondaire |
| `--color-muted` | `#475569` | Texte secondaire sur fond clair |
| `--color-muted-dark` | `#A7B0C0` | Texte secondaire sur fond sombre |
| `--color-line` | `#E2E8F0` | Bordures légères |
| `white` | `#FFFFFF` | Fond principal / texte sur sombre |

Gradient de marque (signature) :
```css
--brand-gradient: linear-gradient(135deg, #b13257 0%, #78377e 50%, #3341ab 100%);
```

### 2.2 Accents par chapitre (accents seulement, une seule marque)

Les accents sont des paires de couleurs utilisées pour les sections/chapitres :

| Accent | De | À |
|---|---|---|
| `magenta` | `#B13257` | `#B13257` |
| `magentaPurple` | `#B13257` | `#78377E` |
| `purple` | `#78377E` | `#78377E` |
| `blue` | `#3341AB` | `#3341AB` |
| `bluePurple` | `#3341AB` | `#78377E` |
| `purpleBlue` | `#78377E` | `#3341AB` |
| `gradient` | `#B13257` | `#3341AB` |

Helper JS :
```ts
accentGradient(accent, angle = 135) // → couleur ou linear-gradient
accentGlow(accent, position = "80% 0%") // → radial-gradient double
```

### 2.3 Typographie

| Rôle | Famille | Poids | Token CSS |
|---|---|---|---|
| Titres | Sora | 500, 600, 700 | `--font-heading` |
| Corps | Inter | 400, 500, 600 | `--font-sans` |

Tailles (clamp, responsive) :

```css
.h-hero    { font-size: clamp(2.75rem, 7vw, 7.5rem);  line-height: 1.02; letter-spacing: -0.035em; }
.h-section { font-size: clamp(2rem, 4.5vw, 4.5rem);    line-height: 1.08; letter-spacing: -0.03em; }
.h-sub     { font-size: clamp(1.5rem, 2.6vw, 2.25rem); line-height: 1.2; }
.eyebrow   { font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; }
body       { font-size: clamp(1rem, 1vw, 1.125rem); line-height: 1.6; }
```

Règles : `h1..h4, .font-heading` → Sora, `letter-spacing: -0.02em`, `text-wrap: balance`.

### 2.4 Radius

| Token | Valeur |
|---|---|
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `20px` |
| `--radius-xl` | `28px` |

Usages courants : boutons `rounded-md` (8px), cartes `rounded-xl` (12px), sheets `28px`.

### 2.5 Ombres

```css
--shadow-soft: 0 1px 2px rgb(17 24 39 / 0.04), 0 8px 24px rgb(17 24 39 / 0.06);
```

Sheets : `0 -12px 48px rgb(17 24 39 / 0.25)`.

### 2.6 Espacements & gouttières

```css
--gutter: clamp(1.25rem, 4vw, 3rem);
```

Containers :
```css
.container-wide { max-width: 1440px; margin-inline: auto; padding-inline: var(--gutter); }
.container-std  { max-width: 1280px; margin-inline: auto; padding-inline: var(--gutter); }
```

### 2.7 Grille

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 768px)  { .grid-12 { grid-template-columns: repeat(8,  minmax(0,1fr)); gap: 1.5rem; } }
@media (min-width: 1024px) { .grid-12 { grid-template-columns: repeat(12, minmax(0,1fr)); gap: 2rem; } }
```

Breakpoints Tailwind par défaut : `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`, `2xl 1536px`.

---

## 3. Fichier tokens.css (Tailwind v4 theme)

```css
/* SKYNET DIGITAL design tokens (Tailwind v4 theme). Brand colors only. */
@theme {
  --color-magenta: #b13257;
  --color-purple: #78377e;
  --color-blue: #3341ab;
  --color-blue-deep: #28348c;
  --color-midnight: #111827;
  --color-midnight-soft: #1b2437;
  --color-cloud: #f8fafc;
  --color-muted: #475569;
  --color-muted-dark: #a7b0c0;
  --color-line: #e2e8f0;

  --font-heading: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;

  --shadow-soft: 0 1px 2px rgb(17 24 39 / 0.04), 0 8px 24px rgb(17 24 39 / 0.06);
}

:root {
  --brand-gradient: linear-gradient(135deg, #b13257 0%, #78377e 50%, #3341ab 100%);
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --font-heading: var(--font-sora), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

Et `globals.css` :
```css
@import "tailwindcss";
@import "./styles/tokens.css";
@import "./styles/motion.css";

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
html.scroll-locked { overflow: hidden; }

body {
  background: #ffffff;
  color: var(--color-midnight);
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1vw, 1.125rem);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

h1, h2, h3, h4, .font-heading {
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  text-wrap: balance;
}

:focus-visible { outline: 3px solid var(--color-blue); outline-offset: 3px; border-radius: 4px; }
.on-dark :focus-visible, .sheet-menu :focus-visible { outline-color: #ffffff; }

::selection { background: rgb(51 65 171 / 0.2); }

/* Brand utilities */
.bg-brand-gradient { background-image: var(--brand-gradient); }
.text-brand-gradient {
  background-image: var(--brand-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.on-dark .text-brand-gradient {
  background-image: linear-gradient(135deg, #e0577d 0%, #b86ac0 50%, #7f8cf0 100%);
}
.border-gradient {
  border: 2px solid transparent;
  background: linear-gradient(#fff,#fff) padding-box, var(--brand-gradient) border-box;
}
```

---

## 4. Layout global

Structure HTML de base (root layout) :
```tsx
<html lang={locale} className={`${inter.variable} ${sora.variable}`}>
  <body>
    <AppProviders>
      <MotionProvider>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header locale={locale} />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer locale={locale} />
        <MobileCtaBar />   {/* barre CTA fixe mobile */}
        <BuilderHost />     {/* panneau projet (sheet) */}
      </MotionProvider>
    </AppProviders>
  </body>
</html>
```

Viewport : `themeColor: "#111827"`, `width: device-width`, `initialScale: 1`.

### 4.1 Header (sticky)

- `sticky top-0 z-40 border-b backdrop-blur`
- Sur la homepage : fond Midnight (`on-dark border-white/10 bg-midnight/90 text-white`)
- Autres pages : fond blanc (`border-line bg-white/90 text-midnight`)
- Hauteur : `h-16` (64px) mobile, `lg:h-[72px]` desktop
- Container : `container-wide flex items-center justify-between gap-4`
- Logo : wordmark horizontal (height 36) sur `sm+`, icône carrée sur mobile
- Nav desktop : `hidden lg:block`, liens `min-h-11 rounded-md px-3 text-[15px] font-medium`
- Lien actif : soulignement `decoration-2 underline-offset-8` (bleu sur clair, blanc sur sombre)
- CTA primaire à droite (`StartProjectButton`)
- Menu burger `lg:hidden` → Sheet plein écran (Midnight, nav en Sora 2xl)
- Barre de progression de scroll : ligne gradient 3px fixe sous le header

### 4.2 Footer

- `on-dark border-t border-white/10 bg-midnight text-white pb-24 md:pb-0`
- Padding vertical : `py-16 lg:py-24`
- Grille 12 colonnes :
  - Col 1 (4 cols) : logo + about + slogan gradient + boutons CTA + WhatsApp
  - Col services (3 cols, start 6) : liste services
  - Col formations (2 cols) : liste formations
  - Col entreprise (2 cols) : liens légaux
- Bas : bordure top, copyright + villes, `text-sm text-muted-dark`
- `pb-24` mobile pour laisser place à la MobileCtaBar

### 4.3 Mobile CTA Bar

Barre fixe en bas sur mobile pour WhatsApp / démarrer projet.

---

## 5. Composants UI

### 5.1 Button

Variantes : `primary | secondary | light | outlineLight | ghost | gradient`
Tailles : `md | lg`

```tsx
const VARIANTS = {
  primary:      "bg-blue text-white hover:bg-blue-deep",
  secondary:    "border-2 border-blue bg-transparent text-blue hover:bg-blue/5",
  light:        "bg-white text-midnight hover:bg-cloud",
  outlineLight: "border-2 border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
  ghost:        "bg-transparent text-blue hover:bg-blue/5",
  gradient:     "bg-brand-gradient text-white hover:brightness-110",
};
// base
"inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-center text-base font-semibold transition-[background-color,color,filter,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-50"
// lg
"min-h-14 px-8 text-lg"
```

### 5.2 Badge (pills)

```tsx
"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
// tones: neutral bg-slate-100 text-muted | blue bg-blue/10 text-blue | magenta bg-magenta/10 text-magenta | dark bg-white/10 text-white
```

### 5.3 Logo

Composant `Logo` avec variantes `primary | white | black | icon | iconWhite`.
- `primary` : wordmark horizontal sombre (sur fond clair)
- `white` : wordmark horizontal blanc (sur fond sombre)
- `icon` / `black` : carré sombre (sur fond clair)
- `iconWhite` : carré blanc (sur fond sombre)
- `height` prop (default 40), width calculée selon ratio source.

### 5.4 Sheet (overlay natif `<dialog>`)

- `sheet` : dialog transparent, backdrop blur
- `sheet-panel` : bottom sheet mobile (94dvh, radius 28px top), panneau droit desktop (min(680px,100vw), 100dvh)
- `sheet-menu` : plein écran Midnight (menu mobile)

### 5.5 Card (patron)

```tsx
"rounded-xl border border-line bg-white p-6 shadow-soft transition-transform hover:-translate-y-1"
```
Sur fond sombre : `rounded-xl border border-white/10 bg-midnight-soft p-6`.

### 5.6 PageHero (pages internes)

- Section : `relative overflow-hidden`, fond `bg-cloud` (clair) ou `bg-midnight` (sombre avec glow)
- Container : `container-wide pt-8 pb-16 md:pt-12 md:pb-24 lg:pb-28`
- Breadcrumbs puis grille 12 : titre `h-section max-w-[18ch] lg:max-w-[22ch]`
- Intro `text-lg text-muted` max-w 680px
- Actions en boutons

---

## 6. Patterns de sections (homepage = "film" en 12 chapitres)

Alternance de fonds pour créer le rythme :
- Midnight (sombre) : Hero, Manifesto, Video, AI, Final CTA, Portfolio (bas)
- Cloud/White (clair) : Photo, Music, Web, Apps, Social, Training, Portfolio (haut)

Chaque section :
- Padding vertical : `py-20 lg:py-32` (ou `py-24` pour manifesto)
- Container : `container-wide`
- Eyebrow avec accent pixel + ligne : `eyebrow flex items-center gap-3`
- Titre : `h-section` avec `max-w-[16ch]` à `[20ch]`
- Texte secondaire : `text-lg text-muted` (clair) / `text-muted-dark` (sombre)
- CTA : `StartProjectButton` size `lg`

Micro-composants :
- `pixel-divider` : bande 8px × 96px de pixels colorés (évoque le logo)
- `flow-line` : ligne gradient animée (6s)
- `marquee-track` : bande défilante infinie (32s)
- `scroll-cue-dot` : point animé dans une souris

---

## 7. Motion

Animations GSAP dans `gsap.matchMedia()` :
- Desktop : `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`
- Mobile : `(max-width: 1023px) and (prefers-reduced-motion: no-preference)`
- Reduced motion : tout désactivé (durée 0.01ms)

Principes :
- Transform + opacity uniquement
- Reveals au scroll : `y: 44 (desktop) / 22 (mobile)`, opacity 0 → 1, `power3.out`, trigger `top 88%`
- Manifesto pinned sur desktop (scrub)
- Parallax doux sur les visuels (`data-visual-parallax`)
- Marques flottantes (`data-float-mark`) avec vitesses variables
- Tout revert au démontage ; scroll natif jamais désactivé

Keyframes disponibles : `sheet-up`, `sheet-right`, `fade-in`, `wave`, `flow`, `pixel-pulse`, `skynet-marquee`, `skynet-scroll-cue`.

---

## 8. Accessibilité

- Skip link `.skip-link` (absolu, apparaît au focus)
- Focus visible : outline 3px bleu, offset 3px, radius 4px (blanc sur sombre)
- `aria-current="page"` sur nav active
- `aria-label` sur boutons icônes
- `prefers-reduced-motion` respecté partout
- Contrastes : texte secondaire `#475569` (clair) / `#A7B0C0` (sombre)
- `::selection` bleu à 20% d'opacité

---

## 9. Réutilisation rapide (snippet CSS minimal)

Pour démarrer un autre site avec la même charte, copier dans votre CSS global :

```css
:root {
  --color-magenta: #b13257;
  --color-purple: #78377e;
  --color-blue: #3341ab;
  --color-blue-deep: #28348c;
  --color-midnight: #111827;
  --color-midnight-soft: #1b2437;
  --color-cloud: #f8fafc;
  --color-muted: #475569;
  --color-muted-dark: #a7b0c0;
  --color-line: #e2e8f0;
  --brand-gradient: linear-gradient(135deg, #b13257 0%, #78377e 50%, #3341ab 100%);
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --font-heading: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-xl: 28px;
  --shadow-soft: 0 1px 2px rgb(17 24 39 / 0.04), 0 8px 24px rgb(17 24 39 / 0.06);
}
```

Fonts à charger : **Inter** (400/500/600) + **Sora** (500/600/700) via Google Fonts ou `next/font`.

---

## 10. Fichiers sources de référence

- `src/app/styles/tokens.css` — tokens Tailwind v4
- `src/app/globals.css` — styles globaux + utilities
- `src/app/styles/motion.css` — keyframes + motion
- `src/app/fonts.ts` — chargement Inter/Sora
- `src/shared/config/brand.ts` — config marque
- `src/shared/lib/accent.ts` — accents par chapitre
- `src/shared/ui/button/index.tsx` — boutons
- `src/shared/ui/badge/index.tsx` — badges
- `src/shared/ui/logo/index.tsx` — logo
- `src/shared/ui/sheet/index.tsx` — overlays
- `src/widgets/header/index.tsx` — header
- `src/widgets/footer/index.tsx` — footer
- `src/widgets/page-hero/index.tsx` — hero pages internes
- `src/widgets/hero-story/HomeStory.tsx` — homepage complète
- `ARCHITECTURE.md` — architecture FSD

---

*Extrait le 14 novembre 2026 depuis le projet `skynet-digital-interactive-site-web`.*
