# Factory Website — Project Journal

A running log of everything done on this project. Newest entries at the bottom. Kept current every working session.

## House rules (set by owner, 2026-08-27)

1. **Everything in Chinese gets an English translation** whenever presented to the owner — the owner cannot read or write Chinese. This applies to questions, summaries, drafts, everything.
2. Owner will submit source material in Chinese; site is primarily for Chinese customers but must have an English version.
3. Design priorities, in order: **informative and detail-oriented**, **intuitive/extremely clear navigation**, clean and professional look.
4. Journal (this file) and memory file kept up to date; photo inventory maintained in `PHOTO-INVENTORY.md`.

## 2026-08-27 — Session 1: Orientation, photo audit, reorganization

**What the business is** (from `Business Information/`):
- 如皋市彬彬机械制造有限公司 = **Rugao Binbin Machinery Manufacturing Co., Ltd.** ("Binbin Machinery")
- Precision machining factory in Rugao, Jiangsu (Yangtze River Delta), founded in the 1980s, 50+ employees.
- Makes parts for **printing machinery, packaging machinery, mining machinery**; capabilities: turning, grinding, milling, boring, planing, drilling, plus CNC machining centers and gear hobbing.
- Named partners: Jiangsu Changsheng Group (printing machinery), Nantong mining machinery, Dun'an Valves, Shanghai Siyuan Electric, Nantong Hyosung Transformers. Annual output value: tens of millions RMB.
- Contact on card: Zhang Pengfei, Assistant Manager, 18505132268, 183211685@qq.com.

**Photo audit:** Reviewed all 33 factory photos + 4 business info files individually. Renamed every file from hash names to descriptive English names and organized into `facility/`, `equipment/`, `products/{shafts-and-gears, machined-components, welded-and-assemblies}`. Full mapping (old → new) and per-photo descriptions with Chinese translations: see `PHOTO-INVENTORY.md`.

**Findings / flags:**
- ⚠️ `facility/factory-exterior.jpg`: the building sign reads 金龙机械厂 ("Jinlong Machinery Factory") — a different name than Binbin. Must confirm with owner before using this photo on the site.
- Photo strengths: strong product photos (batch production, traceability via laser serials/QR codes, plated finishes, assemblies), good equipment shots (VCL1100C, SYL1285, VMC850E machining centers, CNC lathe row).
- Photo gaps: no quality-inspection photos (no CMM/gauging shots), no people/team photos, workshop interior shots are dark/low quality, only one exterior shot (and it has the wrong-name sign issue).
- No logo file — the logo exists only inside the business card JPG. May need to recreate it or crop it.
- Contact channels are mobile/fax/QQ email — need to ask about WeChat (essential for Chinese customers) and whether a proper domain/email is wanted.

**Status at end of session:** Game plan drafted and submitted to owner for approval. Website code NOT started — waiting on owner's answers and approval.

## 2026-08-27 — Session 1 (continued): Building confirmed, content wishlist created

- Owner confirmed the exterior photo IS their building (sign reads 金龙机械厂 "Jinlong Machinery Factory" — still need to ask whether that sign is OK to show on the site or whether Binbin signage exists; included as item 15 in the wishlist).
- Created `CONTENT-WISHLIST.md`: 22 bilingual (EN/CN) items to gather before/while building — company facts, equipment specs and tolerances, certifications, customer list permission, logo file, better photos (bright workshop, gear hobbing, inspection, packing), WeChat QR, domain/email question. Chinese text written so it can be forwarded directly to factory staff. Top priorities marked ★.

## 2026-08-27 — Session 1 (continued): Site v1 built

Owner said "make it first, and add placeholder blanks where necessary" — game plan approved, site built.

**What was built** (`site/` folder):
- Full bilingual static site, no frameworks, no build step, no external fonts/CDNs (loads fast in China; system font stacks incl. PingFang SC / Microsoft YaHei).
- Chinese at root (primary): `index.html`, `products.html`, `equipment.html`, `about.html`, `contact.html`. English mirrors under `en/`. Every page has a 中文/EN toggle in the header linking to its exact counterpart, plus hreflang tags.
- Design: business-card blue (#1878C8) + white, clean industrial; sticky nav; mobile-first responsive; inline SVG "B" favicon (stand-in until real logo arrives).
- Images: web-optimized copies of all 33 photos generated with sips into `site/images/` (36MB → 13MB, max 1600px, lazy-loaded). Originals untouched in `Factory Photos/`.
- Content: everything known is real (profile translation, six processes, three industries, partners, contact info, product galleries with bilingual captions incl. traceability details). Missing facts are visible amber 待补充/TBD placeholder chips, never fake data.
- QA pass: script-verified zero missing images and zero broken internal links across all 10 pages.

**Placeholder tracking:** `PLACEHOLDERS.md` maps all 17 blanks (+ items live-but-to-confirm: partner permission, exterior sign, provisional captions, stand-in logo) to the wishlist items that fill them.

**Next steps:**
- Owner reviews the site locally (`site/index.html`) and gives feedback.
- Materials arrive from wishlist → fill blanks in BOTH language versions, check off in `PLACEHOLDERS.md`.
- Later: hosting/domain decision (wishlist item 21), then deploy.

## 2026-08-27 — Session 1 (continued): Pushed to GitHub

- Repo created and pushed: **https://github.com/han-z-yan/factory-website**, branch `main`, commit 185934d. Whole project folder is in the repo: site, docs, and all original photos.
- Repo-local git identity: han-z-yan / han-z-yan@users.noreply.github.com. First HTTPS push hit a broken pipe (49MB); succeeded after raising `http.postBuffer`.

## 2026-08-27 — Session 1 (continued): Repo public + site LIVE on GitHub Pages

**Audience update from owner:** now ~half Chinese customers, ~half American/English buyers searching for a new supplier. English version is a co-equal audience, not secondary. (House rule 2 amended accordingly.)

- Repo flipped to **public**.
- **Site is live: https://han-z-yan.github.io/factory-website/** (Chinese) and **…/en/** (English). Verified 200s on pages, CSS, and images in both languages.
- Deploy mechanism: `gh-pages` branch generated from `site/` via `git subtree split --prefix=site` (the gh CLI token lacks `workflow` scope, so an Actions workflow couldn't be pushed; branch-based Pages needs no extra scope). **To redeploy after editing `site/`:** commit to main, then `git subtree split --prefix=site -b gh-pages-new && git push -f origin gh-pages-new:gh-pages && git branch -D gh-pages-new` (or refresh the existing local gh-pages branch).
- ⚠️ Process note: a `git reset --hard` during setup discarded an uncommitted journal entry (restored above from context). Lesson: commit journal edits promptly.
- Still relevant: GitHub Pages can be slow from mainland China — fine for the English/US audience; revisit China-friendly hosting + real domain with wishlist item 21.
- SEO consideration for next iteration: with US buyers searching in English, consider making an English landing/entry experience more prominent (e.g., root language chooser or English-first entry) — discuss with owner before restructuring.

## 2026-08-27 — Session 1 (continued): Hero background bug fixed

- Owner reported the Chinese homepage hero showed plain navy while the English one showed the machinery photo. Cause: hero photo was passed as a CSS variable from each page into the shared stylesheet's `.hero` rule — browsers resolve the relative `url()` against the *stylesheet's* folder (`css/`), so the Chinese page's `images/…` path 404'd while the English `../images/…` path worked by coincidence.
- Fix (commit 47b04e5): full `background-image` (gradient + photo) now declared in each homepage's own `<style>` block, where relative paths resolve against the page. Shared CSS keeps only color/size/position.
- Redeployed gh-pages (subtree split + force push), Pages rebuilt, verified the corrected style and image are live. Lesson for future pages: never put relative `url()` values into CSS variables consumed by the shared stylesheet.

## 2026-08-27 — Session 1 (continued): New facts from owner; FACTORY-FACTS.md created

**New facts from owner:**
- Founded **May 1984**; the first machine arrived the night the founder's eldest daughter was born (story now on both About timelines).
- **50+ engineers**, managers NOT included in that count (supersedes profile's "50+ employees").
- **Two large complexes**: a manufacturing complex and a processing/**heat-treatment** complex — square footage blanks left for both (owner will supply).
- More information coming.

**Created `FACTORY-FACTS.md`** — master source of truth: every known fact, each tagged with source ([card]/[profile]/[owner]/[photos]) and status, with fill-in blanks (complex areas, founder's name, manager headcount, heat-treatment processes, precision specs, etc.). Rule: facts update there FIRST, then the site (both languages), then PLACEHOLDERS.md.

**Site updates applied (CN + EN):** hero kicker "Since 1984"; stats band → 1984 / 50+ engineers / output value / 2 complexes (areas TBD); About profile + timeline rewritten with May 1984, founding story, two complexes, engineer count; Equipment page now mentions the heat-treatment complex and has a heat-treatment equipment row (details TBD). PLACEHOLDERS.md updated (#2 filled; #18–20 added).
