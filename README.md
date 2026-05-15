# party — launch page

Static site you can deploy to Vercel (set **Root Directory** to `website`, or deploy this folder as the project root).

## City copy (animated text only)

Edit `js/site-config.js`:

- **`cities`**: array of city names. They replace every `[your city]` slot (any element with `data-city-rotatable`).
  - **One city** → text is **static** (no fade rotation).
  - **Two or more** → names **cycle** with a fade; interval is `cityRotateIntervalMs`.

The **hero background** is fixed in `css/main.css` (`.hero__bg` → `public/bg-sf.png`). It does not change when cities rotate.

## Optional runtime control

With multiple cities loaded, open the browser console:

```js
partyCityRotator.setCities(['Austin', 'Denver']);
```

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
