# A Letter For You 💌

A small, personal website that walks through an apology page-by-page, then
asks a question — with a "No" button that can never actually be clicked —
before revealing your photo and playing your song.

## Files

```
index.html    the pages/content
styles.css    the look (colors, fonts, layout)
script.js     the behavior (page turning, music, dodging button, hearts)
assets/       put your photo and song in here
```

## 1. Edit the words

Open `index.html`. Each `<section class="screen" data-screen="...">` is one
page. Just edit the text inside — headings (`<h1>`/`<h2>`), the apology
paragraph (`id="apologyText"`), the three promises in the `<ul>`, and the
closing message on the last page. You don't need to touch the CSS or JS to
change the wording.

## 2. Add your photo

1. Pick a photo of the two of you.
2. Rename it `photo.jpg` (or edit the filename in the code if you'd rather
   keep the original name).
3. Put it in the `assets/` folder, replacing the placeholder.

It shows up on the very last page, inside `<div class="photo-frame">`.

Tip: a portrait-oriented (taller than wide) photo will look best, since the
frame is set to a 4:5 ratio. You can change that ratio in `styles.css` by
editing `.photo-frame img { aspect-ratio: 4 / 5; }`.

## 3. Add your song

1. Get an MP3 of the song (keep it reasonably small, under ~8–10MB, so it
   loads fast on GitHub Pages).
2. Rename it `song.mp3` and drop it into `assets/`.

The song is wired up in `index.html`:
```html
<audio id="song" loop preload="auto">
  <source src="assets/song.mp3" type="audio/mpeg">
</audio>
```
It starts playing the moment she taps the very first button ("Okay, I'm
listening"). Browsers block autoplay with sound until there's a real tap/click,
which is exactly what that first button gives you — so this is the most
reliable way to get music playing, more reliable than trying to autoplay on
page load. There's also a small speaker icon in the top-right corner (🔈/🔊)
to mute/unmute or restart it anytime.

## 4. The "No" button

In `script.js`, the `dodge()` function moves the No button to a random spot
on screen whenever a cursor gets near it, or the instant it's tapped on
mobile — so it's always one step out of reach. If you want it to be
*possible* to click after some number of tries (some people like that better
than "literally impossible forever"), you could add a counter in `dodge()`
that stops repositioning after, say, 15 attempts. Ask me if you'd like that
version.

## 5. Colors & fonts

Everything lives in `styles.css` under `:root` at the very top:
```css
--ink: #3c2a3d;        /* main text color */
--parchment: #fbf3e7;  /* the letter card */
--gold: #c9a15a;       /* thin border accents */
--rose: #c97b94;       /* hearts, "no" text */
--rose-deep: #a85274;  /* "yes" button, sign-off */
--night-top: #1c1224;  /* background gradient */
--night-bottom: #2f1e35;
```
Change any of these hex values to shift the whole palette. The headline font
is "Fraunces" (loaded from Google Fonts in `index.html`) — swap the font name
there and in `styles.css` (`.script { font-family: ... }`) if you'd like a
different one.

## 6. Put it on GitHub Pages

1. Create a **new repository** on GitHub (Settings → your profile → "New
   repository"). Doesn't need to be anything fancy — e.g. `for-her` or
   `im-sorry`.
2. Upload these four items into the repository: `index.html`, `styles.css`,
   `script.js`, and the `assets/` folder (with your real `photo.jpg` and
   `song.mp3` inside it). You can do this by dragging the files into the
   GitHub web UI ("Add file" → "Upload files"), no command line needed.
3. Commit the changes.
4. Go to the repo's **Settings** → **Pages** (left sidebar).
5. Under "Source", choose the `main` branch and `/ (root)` folder, then
   **Save**.
6. Wait a minute or two, then refresh that Pages settings screen — it will
   show your live URL:
   `https://<your-username>.github.io/<repository-name>/`
7. Open that link yourself first to test everything (photo shows up, song
   plays, No button won't sit still), then send it to her.

### If GitHub Pages says "there was a problem"
- Make sure the repository is **public** (private repos need a paid plan
  for Pages).
- Make sure `index.html` sits at the top level of the repo, not inside a
  subfolder.

## 7. Before you send it

- Open the link on your own phone, not just your laptop — mobile is where
  the "No" button dodge and the music tap matter most.
- Double check the photo and song actually loaded (not broken/blank).
- If the song doesn't auto-load after the first tap, check that the file is
  really named `song.mp3` and really sits inside `assets/`.
