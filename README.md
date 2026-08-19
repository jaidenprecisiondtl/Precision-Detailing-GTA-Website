# Precision Detailing

Static one-page site. Plain HTML, CSS and JS. No build step, no backend, no dependencies.

---

## Folder structure

```
precision-detailing/
├── index.html          Everything the visitor sees. All copy lives here.
├── thanks.html         Confirmation page shown after the form is submitted.
├── netlify.toml        Netlify caching and security headers.
├── robots.txt          Search engine access.
├── sitemap.xml         Search engine page list.
├── favicon.png         Browser tab icon, built from your P mark.
├── css/
│   └── styles.css      All styling. Brand colors sit at the very top.
├── js/
│   └── main.js         Menu, scroll effects, lightbox, form helpers.
└── images/
    ├── logo/logo.png   Your logo, background removed.
    ├── gallery/        Six before/after pairs, two finished shots.
    ├── about-photo.jpg Your portrait, used in the About section.
    ├── og-image.jpg    Social share preview, from your banner graphic.
    ├── incoming/       Originals from your zip. Safe to delete.
    └── from-google/    Originals from your Google profile. Safe to delete.
```

---

## Deploying to Netlify

**Drag and drop (fastest)**

1. Go to app.netlify.com and log in.
2. Click **Sites**, then drag this entire folder onto the drop zone.
3. Done. Netlify gives you a URL like `random-name-123.netlify.app`.
4. Rename it under **Site configuration > Change site name**.

**GitHub auto-deploy (better long term)**

1. Push this folder to a new GitHub repo.
2. In Netlify: **Add new site > Import an existing project > GitHub**.
3. Pick the repo. Leave the build command empty and the publish directory as `/`.
4. Every push to `main` redeploys automatically.

---

## Turning on form submissions

The form is already wired for Netlify Forms. After your first deploy:

1. Netlify dashboard > **Forms**. You should see a form named `booking`.
2. Open **Forms > Settings and usage > Form notifications**.
3. Add an email notification to `precisionn.detailing@gmail.com` so you get an
   alert the moment someone books.

Free tier covers 100 submissions per month.

**Note:** the form only registers on a real Netlify deploy. Opening `index.html`
on your computer will not submit anywhere. That is expected.

---

## Swapping in your real content

### Logo

Already done. `images/logo/logo.png` was rebuilt from your Google profile upload
with the black background removed, so it sits cleanly on any dark surface. It is
used in the header and the footer, and `favicon.png` was cut from the P mark.

If you ever have the original vector file, drop it in as `images/logo/logo.png`
and it will pick up automatically at higher quality.

### Gallery photos

Seven tiles, all real work. The first six are before and after pairs, each
composed into one image with the split down the middle so it reads instantly on
a phone:

```
ba-headlight.jpg      hazy lens restored to clear
ba-rear-seats.jpg     spilled candy and debris removed
ba-carpet.jpg         stained footwell shampooed
ba-interior.jpg       cloth interior deep clean
ba-wheel.jpg          brake dust off, tire shine on
ba-door-sill.jpg      sills and jambs
```

Then one finished-result shot: `interior-deep-clean.jpg`.

**One thing to fix when you can.** The photos from the zip arrived at 320px on
the long edge, which is thumbnail size. They hold up on a phone but go soft on a
laptop. Re-send the originals straight off your phone (AirDrop, Google Drive, or
email at "actual size") and the tiles get rebuilt sharp.

The About portrait came in at 214px wide, so it is displayed at 300px as an
owner card rather than stretched across the column. That keeps it sharp. If you
send the original, the card can grow back to a full-height photo.

### How the images are optimized

Every gallery tile ships in two sizes: a 420px file for phones and a 720px file
for desktop and retina screens. The `srcset` and `sizes` attributes on each
`<img>` let the browser pick one. It never downloads both.

A phone pulls about **439KB** for the whole page. A retina desktop pulls 772KB.

If you add a photo, generate both sizes and keep the naming pattern
(`my-photo.jpg` at 720px and `my-photo-420.jpg` at 420px), then copy an existing
`<figure>` block. If you only have one size, that still works, just drop the
`srcset` and `sizes` attributes and point `src` at your file.

### Reviews

All eight of your Google reviews are in, quoted word for word. Two were cut off
by the Google "More" link and are marked with a comment in `index.html`. Paste
the full text in when you have it.

To add a new review, copy any `<blockquote class="review">` block and put it at
the top of the grid.

### Prices

All prices are in `index.html` inside `<span class="price-value">`. Change the
number there, then update the matching option in the booking form dropdown and
the matching `"price"` value in the schema block at the bottom of the file so
Google sees the same number.

### Colors

Every brand color is defined once at the top of `css/styles.css` under
`:root`. Change `--blue` and `--silver` there and the whole site follows.

---

## Adding a booking widget later

The booking section is a self-contained component. In `index.html`, find:

```
<!-- ===== BOOKING-FORM START ===== -->
...
<!-- ===== BOOKING-FORM END ===== -->
```

Delete everything between those two markers and paste in your Acuity, Calendly
or Square embed code. Nothing else on the page reads from the form, so the rest
of the site keeps working untouched.

---

## SEO checklist after launch

- [ ] Replace the placeholder domain. Search for `precisiondetailinggta.netlify.app`
      in `index.html`, `robots.txt` and `sitemap.xml` and swap in your real URL.
- [ ] **Add your website to your Google Business Profile.** Your profile
      currently shows "Add website" with nothing linked. This is the single
      highest value thing on this list. The profile already ranks and has
      5.0 stars from 9 reviews, so pointing it at the site sends that
      authority straight here.
- [ ] While you are in there, set the service area to all of Peel Region and
      add London, ON so the headlight work is covered.
- [ ] Submit the site in Google Search Console.
- [ ] Put the link in both bios, Instagram and TikTok.
- [ ] Optional: swap `images/og-image.jpg` for a real 1200x630 photo. It
      currently uses your Peel Region banner graphic, which works fine.

---

## Testing locally

Double-clicking `index.html` works for a quick look. To test properly, run a
local server from this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000
