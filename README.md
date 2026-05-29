# PTCG Pocket — Energy Roller

A mobile-friendly web tool for paper PTCG Pocket play.
Select your deck's energy types and roll a random energy drop each turn.

## Files

```
ptcg-energy-roller/
├── index.html      ← Main page
├── style.css       ← All styles
├── app.js          ← All logic
├── images/         ← Drop your PNG energy icons here
└── README.md
```

## How to deploy

Upload all files to any static web host:
- **Netlify** — drag the folder into netlify.com/drop
- **GitHub Pages** — push to a repo and enable Pages
- **Vercel** — connect repo or drag & drop
- **Any web host** — upload via FTP/cPanel

No server or build step needed — it's plain HTML/CSS/JS.

## Swapping in your own PNG icons

1. Add your images to the `/images/` folder
   e.g. `images/fire.png`, `images/water.png`, `images/grass.png` etc.

2. In `app.js`, find the `TYPES` array at the top.
   For each type, replace the emoji `icon` value with an `<img>` tag:

   **Before:**
   ```js
   { id: 'fire', name: 'Fire', icon: '🔥', bg: '#e8431a' },
   ```

   **After:**
   ```js
   { id: 'fire', name: 'Fire', icon: '<img src="images/fire.png" alt="Fire energy" style="width:100%;height:100%;object-fit:contain;">', bg: '#e8431a' },
   ```

3. Optionally, in `style.css` remove the background color line for that type
   if your image already has its own background:
   ```css
   /* Remove or comment out this line for types with image icons: */
   .e-fire .icon { background: var(--fire); }
   ```

## Energy type IDs

| ID          | Name      |
|-------------|-----------|
| fire        | Fire      |
| water       | Water     |
| grass       | Grass     |
| lightning   | Lightning |
| psychic     | Psychic   |
| fighting    | Fighting  |
| darkness    | Darkness  |
| metal       | Metal     |
| colorless   | Normal    |
| dragon      | Dragon    |

---
Fan-made tool · Not affiliated with The Pokémon Company
