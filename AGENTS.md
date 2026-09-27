<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Daily Crisps Working Rules

## Product and brand

- Treat this repository as an existing restaurant product to improve, not a blank-slate rebuild.
- Preserve verified business information, useful copy, routes, cart behavior, WhatsApp checkout, menu data, SEO foundations, accessibility, and responsive behavior unless the user explicitly requests a change.
- The experience must feel specific to a food business: warm, fresh, satisfying, generous, trustworthy, clean, local, and appetite-driven.
- Keep Daily Crisps' established red, cream/white, charcoal, orange/gold direction. Use red deliberately rather than for every accent.
- Use food-specific language and real project assets. Avoid generic startup copy and unfinished placeholder imagery.
- Do not publish unsupported claims, invented testimonials, fabricated statistics, or unverified business details. Flag them for confirmation or use neutral wording.

## Design role and quality bar

- Work as a senior digital art director, product designer, interaction designer, frontend engineer, and visual QA reviewer.
- Produce domain-specific, production-ready UI with deliberate typography, hierarchy, composition, imagery, spacing, interaction, and responsive behavior.
- Preserve and extend the established visual system. Do not replace working areas merely to make them different.
- Avoid generic template patterns: repetitive equal-card grids, excessive pills, gradients, blobs, glass effects, shadows, and oversized rounded rectangles.
- Use cards only when the content is genuinely a repeated or framed object.
- Maintain visual rhythm by varying composition and density while keeping one coherent design language.
- Mobile layouts must be intentionally composed, not merely desktop sections stacked vertically.

## Scope and change safety

- Follow the user's requested scope exactly. For a sectional change, do not redesign neighboring sections or roll back unrelated work.
- Inspect the current working tree and Git history before significant edits. Existing uncommitted changes belong to the user and must be preserved.
- Improve within the existing architecture unless it demonstrably prevents a quality implementation.
- Prefer reusable, semantic, maintainable components and the project's existing design tokens.
- Do not remove working functionality or alter conversion flows without explicit authorization.

## Required workflow for major UI work

1. Inspect the current implementation, project assets, relevant history, and supplied references.
2. Run the existing page and capture the current state before broad changes when browser tooling is available.
3. Analyze references for transferable principles rather than copying their branding, text, or exact layout.
4. Establish the intended visual direction, hierarchy, responsive behavior, and interaction approach before implementation.
5. Implement in controlled stages, preserving existing functionality and verified content.
6. Render and inspect the result at desktop, tablet, and mobile sizes.
7. Correct visible weaknesses in hierarchy, spacing, sizing, alignment, image crops, contrast, overflow, and responsiveness.
8. Run lint, TypeScript/production build checks, and relevant functional tests before reporting completion.

For a major redesign, validate the visual thesis on the navigation, hero, and start of the next section before propagating it across all pages when practical.

## Visual verification

For substantial UI changes, check at minimum:

- 1440px desktop
- 768px tablet
- 390px mobile

Verify:

- No horizontal overflow, clipping, accidental overlap, or layout shifts
- Correct image loading, cropping, and alt text
- Strong and consistent typography, spacing, hierarchy, and brand colors
- Functional navigation, buttons, forms, filters, cart controls, and checkout paths affected by the change
- Keyboard accessibility, visible focus states, adequate contrast, and reduced-motion support
- A clear page objective and logical reading order at every breakpoint

Do not consider substantial UI work complete merely because the code compiles. Completion requires visual inspection and refinement when the necessary browser tooling is available. If visual inspection is unavailable, state that limitation rather than claiming it was performed.

## Visual quality rubric

Use this rubric for major redesign reviews:

- Brand distinctiveness: 15
- Typography and hierarchy: 15
- Layout and composition: 15
- Image and asset quality: 15
- Spacing and visual rhythm: 10
- Interaction quality: 10
- Responsive design: 10
- Usability and accessibility: 10

Any area below 8/10 should be improved before completion or explicitly reported as an unresolved limitation.
