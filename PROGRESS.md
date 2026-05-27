✅ scaffold - Created a Next.js TypeScript app with Tailwind, ESLint, App Router, and src directory.
✅ dependencies - Installed lucide-react and stabilized npm dependencies.
✅ public/logo.png - Removed the black logo background, cropped the mark, and saved it as a transparent PNG.
✅ src/styles/animations.css - Added the required keyframe animations.
✅ src/app/globals.css - Added brand CSS variables, Tailwind theme tokens, font bindings, and animation utility classes.
✅ tailwind.config.ts - Added Daily Crisps brand colors and font families.
✅ src/data/menu.ts - Added the 18 static menu items, category types, and Naira formatter.
✅ src/components/Button.tsx - Built reusable brand buttons and link buttons.
✅ src/components/SectionHeader.tsx - Built reusable section heading component.
✅ src/components/TopBar.tsx - Built the desktop announcement bar.
✅ src/components/Navbar.tsx - Built sticky navbar with transparent logo at 44px, active links, scroll shadow, and order icon.
✅ src/components/Footer.tsx - Built the four-column dark footer with brand, links, hours, and contact details.
✅ src/components/MenuCard.tsx - Built reusable menu item cards.
✅ src/components/DealBanner.tsx - Built the Royal Calabar Platter deal banner.
✅ src/components/TopSellers.tsx - Built the top sellers section using real menu data.
✅ src/components/PotAnimation.tsx - Added the reusable hidden-on-mobile pot animation component.
✅ src/app/layout.tsx - Added metadata, fonts, TopBar, Navbar, Footer, and global layout shell.
✅ src/app/page.tsx - Built the Daily Crisps home page sections.
✅ src/app/menu/page.tsx - Built the client-side filterable menu page.
✅ src/app/order/page.tsx - Built the client-side cart and order page.
✅ src/app/about/page.tsx - Built the story, chef, and gallery page.
✅ src/app/contact/page.tsx - Built contact details, form, and map placeholder page.
✅ next.config.ts - Pinned the Turbopack root to this project folder.
✅ social links - Replaced unavailable lucide brand exports with stable social label buttons.
✅ verification - Ran ESLint successfully and completed a production build with network access for Next font fetching.
✅ dev server - Started the Next.js dev server at http://127.0.0.1:3000 and confirmed HTTP 200.
🎉 Daily Crisps v1.0 - Initial build complete. Ready for backend integration.
✅ Fix 1 — Logo now displaying correctly in navbar
✅ Fix 2 — Feature cards reduced from 4 to 3 (removed Pure Healthy Cooking Oils)
✅ Fix 3 — Kitchen Team section removed from About page
✅ Fix 4 — Deal Banner button text fixed (red text on white button)
2026-05-23 polish pass
- Replaced the site logo with the uploaded black transparent WebP, cropped whitespace, and wired navbar/footer references to `/logo.webp`.
- Updated the navbar to use white translucent glass states instead of the dark scrolled background.
- Replaced the remaining "Gourmet Heritage" navbar text with "Daily Crisps".
- Renamed the order nav/page label from "Order & Track" to "Order Now".
- Updated the navbar to start transparent on the home hero and transition into a dark glass bar on scroll.
- Kept the black logo sharp and readable by adding a light logo plate on dark navbar/footer states.
- Rebuilt the order page cart flow with localStorage persistence across refreshes and navigation.
- Added quantity controls, remove item, clear cart, subtotal, delivery fee, and total calculation.
- Added visible add-to-cart feedback with an "Added" state and quantity indicator.
- Replaced the mock order submit with a frontend WhatsApp checkout message using the test number +234 904 611 6130.
- Added checkout fields for name, phone number, delivery address, and optional notes.
- Converted non-functional menu/top-seller order buttons into links to the real order flow.
- Added Daily Crisps Open Graph metadata with a real food image.
✅ Feature section layout — cards replaced with inline row + red vertical dividers
✅ Our Story page disabled — route returns 404, nav/footer links hidden, code preserved
✅ Hero buttons updated — rounded-full, new copy "Explore Our Menu" + "Order Now"
✅ All buttons sitewide changed to rounded-full
✅ Deal Banner replaced with dark cinematic collage section
✅ Footer updated — blurry glass dark background effect
✅ Royal Platter section returned to white site background
✅ Food cards restyled with floating images and glass-like card surfaces
✅ Menu and Top Sellers cards updated to large square-image structure with category and CTA underneath
✅ Menu and Top Sellers cards polished with stronger glass-like surfaces
✅ Royal Platter collage placeholders replaced with supplied food images
✅ Secret Ingredient section removed from the home page
✅ Contact page map placeholder replaced with supplied location image
