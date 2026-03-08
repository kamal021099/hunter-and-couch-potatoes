# Hunters & Couch Potatoes — Frontend Mock Task Breakdown

> **Stack:** Next.js 14 (App Router) · Tailwind CSS · TypeScript · No backend · All data hardcoded
> **Goal:** Build 4 onboarding screens as a pixel-close mobile-first mock from wireframes
> **Build order:** Context → Components → Tailwind Config → Screens (1→4)

---

## Progress Tracker

| Task | Description | Status |
|------|-------------|--------|
| T0 | Tailwind design system config | ⬜ Todo |
| T1 | AuthContext & shared state | ⬜ Todo |
| T2 | Shared components | ⬜ Todo |
| T3 | Screen 1 — Login | ⬜ Todo |
| T4 | Screen 2 — OTP Verify | ⬜ Todo |
| T5 | Screen 3 — Profile Details | ⬜ Todo |
| T6 | Screen 4 — Choose Category | ⬜ Todo |
| T7 | Dashboard placeholder | ⬜ Todo |

---

## T0 — Tailwind Design System Config

**File:** `tailwind.config.ts`

### Colour Tokens
```ts
colors: {
  brand: {
    primary: '#FF4D1C',  // Electric Rust — CTAs, buttons, highlights
    dark:    '#1A1A2E',  // Deep navy — page backgrounds, cards
    surface: '#F5F0E8',  // Warm off-white — light surfaces, text on dark
    accent:  '#FFB347',  // Amber — badges, tags, Couch Potato card
    muted:   '#888888',  // Grey — secondary text, placeholders
  }
}
```

### Typography
```ts
fontFamily: {
  heading: ['Syne', 'sans-serif'],   // Headings, brand name, titles
  body:    ['DM Sans', 'sans-serif'], // Body text, labels, inputs
}
```

### Border Radius
```ts
borderRadius: {
  card: '20px',   // Listing cards, category cards
  btn:  '12px',   // All buttons
  pill: '100px',  // Tags, badges, dot indicators
}
```

### Checklist
- [ ] Add colour tokens to `tailwind.config.ts`
- [ ] Add font families to `tailwind.config.ts`
- [ ] Add border radius tokens to `tailwind.config.ts`
- [ ] Add Google Fonts import in `app/layout.tsx` — Syne (700, 800) + DM Sans (300, 400, 500)
- [ ] Verify tokens work with `bg-brand-primary`, `font-heading` etc.

---

## T1 — AuthContext & Shared State

**File:** `app/context/AuthContext.tsx`

### State Shape
```ts
interface AuthState {
  phone:    string
  otp:      string
  name:     string
  dob:      string
  gender:   string
  email:    string
  category: 'flats' | 'flatmates' | 'couch-potato' | null
}
```

### Requirements
- `AuthProvider` component wraps entire app
- `useAuth()` hook exported for all screens to consume
- All fields settable via individual setter functions or a single `updateAuth()` function
- Persists across client-side navigation (context lives in layout)

### Checklist
- [ ] Create `app/context/AuthContext.tsx` with full state shape
- [ ] Export `useAuth()` hook
- [ ] Export `AuthProvider` component
- [ ] Wrap `app/layout.tsx` with `<AuthProvider>`
- [ ] Test context is accessible from a child component

---

## T2 — Shared Components

**Directory:** `components/`

---

### T2.1 — `MobileShell.tsx`

Wrapper that gives every screen the phone-frame appearance.

**Props:**
```ts
{ children: React.ReactNode }
```

**Behaviour:**
- `max-w-[390px]` centered horizontally on desktop
- `min-h-screen` with `bg-brand-dark`
- Outer page background: near-black (`#07070F`)
- Rounded corners (`rounded-[40px]`) when on desktop viewport
- No border or shadow needed — keep it clean

**Checklist:**
- [ ] Create `components/MobileShell.tsx`
- [ ] Centered layout on desktop
- [ ] Full height on mobile
- [ ] Correct background colours

---

### T2.2 — `BottomDots.tsx`

Pagination dot indicators shown at the bottom of Screens 1 and 2.

**Props:**
```ts
{ total: number, active: number } // active is 0-indexed
```

**Behaviour:**
- Active dot: `bg-brand-surface` larger size (`w-3 h-3`)
- Inactive dot: `bg-brand-muted` smaller size (`w-2 h-2`)
- Horizontally centered, spaced evenly
- Smooth transition on active change

**Checklist:**
- [ ] Create `components/BottomDots.tsx`
- [ ] Active vs inactive dot styles correct
- [ ] Accepts dynamic `total` and `active` props

---

### T2.3 — `PrimaryButton.tsx`

The main CTA button used across all screens.

**Props:**
```ts
{
  children:  React.ReactNode
  onClick?:  () => void
  disabled?: boolean
  type?:     'button' | 'submit'
  className?: string
}
```

**Behaviour:**
- Full width by default
- Background: `bg-brand-primary` (#FF4D1C)
- Text: white, bold, `font-heading`
- Border radius: `rounded-btn` (12px)
- Padding: `py-4`
- Disabled state: `opacity-40 cursor-not-allowed`
- Hover state: slightly darker orange, smooth transition
- Active/press: scale down slightly (`active:scale-95`)

**Checklist:**
- [ ] Create `components/PrimaryButton.tsx`
- [ ] Disabled state styled correctly
- [ ] Hover and active states working
- [ ] Accepts `className` for overrides

---

### T2.4 — `InputField.tsx`

Styled input used across all form screens.

**Props:**
```ts
{
  label:      string
  type:       string     // 'text' | 'tel' | 'email' | 'date' | 'password'
  value:      string
  onChange:   (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?:     string
  disabled?:  boolean
}
```

**Behaviour:**
- Label above input in `brand.muted` colour
- Input: dark semi-transparent background (`bg-white/5`), white text
- Border: `border border-white/20`, focus ring `brand.primary`
- Border radius: `rounded-btn` (12px)
- Error message shown in red below input when `error` prop is set
- Disabled state: reduced opacity, no focus ring

**Checklist:**
- [ ] Create `components/InputField.tsx`
- [ ] Label + input + error layout correct
- [ ] Focus ring uses `brand.primary`
- [ ] Error state shows red text below
- [ ] Disabled state styled

---

## T3 — Screen 1: Login

**File:** `app/login/page.tsx`
**Route:** `/login`
**Wireframe ref:** "1.0 Landing Page"

### Layout (top to bottom)
1. Top bar — small avatar icon (left) + "Hello!" text
2. Headline — "Welcome to Hunters & Couch Potatoes!" (`font-heading`, large, white)
3. Subtext — "Enter your Mobile No." (`font-body`, muted)
4. Phone input — numeric, max 10 digits, `+91` prefix shown inside field
5. "Verify" CTA button — disabled until 10 digits entered
6. Spacer
7. Bottom dots — 3 dots, dot 1 active

### Behaviour
- Disabled "Verify" until phone number is exactly 10 digits
- On "Verify" click: save phone to `AuthContext`, navigate to `/otp`
- Input: type `tel`, pattern `[0-9]*`, maxLength 10

### Checklist
- [ ] Create `app/login/page.tsx`
- [ ] Phone input with +91 prefix
- [ ] Verify button disabled until 10 digits
- [ ] Saves phone to AuthContext on submit
- [ ] Navigates to `/otp` on submit
- [ ] BottomDots showing 3 dots, index 0 active
- [ ] Uses `MobileShell`, `PrimaryButton`, `InputField`
- [ ] `app/page.tsx` redirects to `/login`

---

## T4 — Screen 2: OTP Verification

**File:** `app/otp/page.tsx`
**Route:** `/otp`
**Wireframe ref:** "1.0 Landing Page" (second state)

### Layout (top to bottom)
1. Same top bar — avatar icon + "Hello!"
2. Same headline + subtext as Screen 1
3. Phone input — pre-filled from context, disabled/greyed out
4. "Verify" button — muted/disabled state (phone is already entered)
5. OTP input — 6 separate single-digit boxes OR one 6-digit field (make it feel native)
6. "Submit OTP" CTA — disabled until 6 digits entered
7. Bottom dots — 3 dots, dot 2 active

### Behaviour
- Phone number pre-filled from `AuthContext`, non-editable
- OTP: any 6-digit number accepted (mock — no real verification)
- On "Submit OTP": save OTP to context, navigate to `/profile`
- Add a small "Resend OTP" text link below OTP input (non-functional, just UI)

### OTP Input Option (recommended)
6 individual `<input maxLength={1}>` boxes side by side. Auto-focus next box on digit entry. Backspace moves to previous box.

### Checklist
- [ ] Create `app/otp/page.tsx`
- [ ] Phone number pre-filled and disabled from context
- [ ] 6-box OTP input with auto-focus behaviour
- [ ] Submit button disabled until all 6 boxes filled
- [ ] Accepts any 6-digit code (mock)
- [ ] Navigates to `/profile` on submit
- [ ] "Resend OTP" link present (non-functional)
- [ ] BottomDots showing index 1 active

---

## T5 — Screen 3: Profile Details

**File:** `app/profile/page.tsx`
**Route:** `/profile`
**Wireframe ref:** "4. Profile Details"

### Layout (top to bottom)
1. Close (X) button — top right, navigates back to `/login`
2. Circular avatar — large, centered, person icon placeholder (no upload)
3. Dynamic greeting — "Hi [name]!" — updates live as user types name, defaults to "Hi there!"
4. Subtext — "Welcome"
5. Form fields:
   - Full Name (text, required)
   - Date of Birth (date input, required)
   - Gender (select, required) — Male / Female / Non-binary / Prefer not to say
   - Email ID (email, optional)
6. "Continue" CTA — full width, `brand.primary`

### Behaviour
- Greeting text updates live as user types their name
- Validation on "Continue": Name and Gender are required
- Show inline error below each required field if empty on submit
- On valid submit: save all fields to `AuthContext`, navigate to `/category`

### Checklist
- [ ] Create `app/profile/page.tsx`
- [ ] X button navigates to `/login`
- [ ] Avatar circle placeholder
- [ ] Live greeting updates as name is typed
- [ ] All 4 form fields present and styled
- [ ] Inline validation errors for Name and Gender
- [ ] Saves to AuthContext on valid submit
- [ ] Navigates to `/category` on valid submit

---

## T6 — Screen 4: Choose Category

**File:** `app/category/page.tsx`
**Route:** `/category`
**Wireframe ref:** "5. Saved as Favourites"

### Layout (top to bottom)
1. Top bar — avatar icon (left) + "Hi [Name from context]!" dynamic greeting + hamburger menu icon (right, non-functional)
2. Section heading — "Choose your category!" (`font-heading`, white)
3. Subheading — "I'm looking for..." (`font-body`, muted)
4. 3 Category Cards (see below)
5. "Activate your profile" CTA — disabled until a card is selected

### Category Cards

| Card | Icon | Title | Subtitle | Style |
|------|------|-------|----------|-------|
| Hunter: Flats | 🏠 | Flats | I need a flat or room | `brand.surface` bg, dark text |
| Hunter: Flatmates | 🤝 | Flatmates | I need a flatmate for my place | `brand.surface` bg, dark text |
| Couch Potato | 🛋️ | Couch Potato | I have a place — list it | `brand.dark` bg, `brand.accent` text — visually distinct |

### Card Behaviour
- Click to select — selected card gets `ring-2 ring-brand-primary` highlight
- Only one card selectable at a time
- "Activate your profile" button enabled only when a card is selected
- On button click: save `category` to `AuthContext`, navigate to `/dashboard`

### Card Layout
- 2 cards on top row (Flats + Flatmates), 1 card centered below (Couch Potato)
- Each card: rounded-card (20px), padding, icon large, title bold, subtitle small
- Smooth selection animation on click

### Checklist
- [ ] Create `app/category/page.tsx`
- [ ] Dynamic name from AuthContext in top bar
- [ ] Hamburger icon present (non-functional)
- [ ] All 3 cards rendered with correct icons, titles, subtitles
- [ ] Couch Potato card visually distinct from Hunter cards
- [ ] Single-select behaviour with ring highlight
- [ ] "Activate your profile" disabled until selection
- [ ] Saves category to AuthContext on submit
- [ ] Navigates to `/dashboard`

---

## T7 — Dashboard Placeholder

**File:** `app/dashboard/page.tsx`
**Route:** `/dashboard`

Simple placeholder screen — no wireframe, just needed as a navigation target.

### Layout
- "🚧 Coming Soon" centered on screen
- App name "Hunters & Couch Potatoes" in `brand.primary`
- Subtext: "The hunt begins soon."
- Small "Start over" link back to `/login`

### Checklist
- [ ] Create `app/dashboard/page.tsx`
- [ ] Branded placeholder content
- [ ] "Start over" link to `/login`

---

## File Structure

```
app/
├── layout.tsx              ← Google Fonts + AuthProvider wrap
├── page.tsx                ← Redirect to /login
├── login/
│   └── page.tsx            ← Screen 1: Phone entry
├── otp/
│   └── page.tsx            ← Screen 2: OTP verify
├── profile/
│   └── page.tsx            ← Screen 3: Profile details
├── category/
│   └── page.tsx            ← Screen 4: Choose category
├── dashboard/
│   └── page.tsx            ← Placeholder
└── context/
    └── AuthContext.tsx     ← Shared auth state

components/
├── MobileShell.tsx         ← Phone frame wrapper
├── BottomDots.tsx          ← Pagination dots
├── PrimaryButton.tsx       ← Main CTA button
└── InputField.tsx          ← Styled form input

tailwind.config.ts          ← Design tokens
```

---

## Design Rules (apply everywhere)

- **Mobile-first** — max-width `390px`, centered on desktop
- **Backgrounds** — `#1A1A2E` on all screens, `#07070F` outer shell on desktop
- **Buttons** — `#FF4D1C` background, white text, bold, `rounded-btn`
- **Inputs** — `bg-white/5` dark fill, white text, `border-white/20`, focus `ring-brand-primary`
- **Headings** — `font-heading` (Syne), `font-bold`
- **Body text** — `font-body` (DM Sans)
- **No Lorem Ipsum** — use realistic Bangalore-context copy
- **No API calls** — all data is hardcoded or from AuthContext
- **Transitions** — `transition-all duration-200` on interactive elements

---

## Recommended Build Order

```
T1 AuthContext  →  T2 Components  →  T0 Tailwind  →  T3 Login  →  T4 OTP  →  T5 Profile  →  T6 Category  →  T7 Dashboard
```

> Start with context and components so every screen can import them immediately.
> Tailwind config before screens so design tokens are available.
> Build screens in flow order so navigation can be tested end-to-end.
