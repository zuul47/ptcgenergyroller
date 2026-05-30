/**
 * PTCG Pocket — Energy Roller
 * app.js
 *
 * To swap in your own PNG icons:
 *   1. Add your images to the /images/ folder
 *      e.g. images/fire.png, images/water.png, etc.
 *   2. For each type below, replace the `icon` emoji string with an img tag:
 *      icon: '<img src="images/fire.png" alt="Fire energy" style="width:100%;height:100%;object-fit:contain;">'
 *   3. Also remove the `.icon { background: ... }` lines in style.css for that type
 *      since the image will fill the circle itself.
 */

const TYPES = [
  { id: 'fire',      name: 'Fire',      icon: '<img src="images/fire.png" alt="Fire energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#e8431a' },
  { id: 'water',     name: 'Water',     icon: '<img src="images/water.png" alt="Water energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#3a8fd4' },
  { id: 'grass',     name: 'Grass',     icon: '<img src="images/grass.png" alt="Grass energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#3aab3a' },
  { id: 'lightning', name: 'Lightning', icon: '<img src="images/lightning.png" alt="Lightning energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#c8a010' },
  { id: 'psychic',   name: 'Psychic',   icon: '<img src="images/psychic.png" alt="Psychic energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#d45aaf' },
  { id: 'fighting',  name: 'Fighting',  icon: '<img src="images/fighting.png" alt="Fighting energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#b85c2a' },
  { id: 'darkness',  name: 'Darkness',  icon: '<img src="images/darkness.png" alt="Darkness energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#4a3a6a' },
  { id: 'metal',     name: 'Metal',     icon: '<img src="images/metal.png" alt="Metal energy" style="width:32px;height:32px;object-fit:contain;">', bg: '#6a7a8a' },
 
];

// ── State ──────────────────────────────────────────
let selected = new Set();

// ── DOM refs ───────────────────────────────────────
const grid        = document.getElementById('energyGrid');
const rollBtn     = document.getElementById('rollBtn');
const resultArea  = document.getElementById('resultArea');
const turnsSlider = document.getElementById('turnsSlider');
const turnsValEl  = document.getElementById('turnsVal');
const resetBtn    = document.getElementById('resetBtn');

// ── Build energy buttons ───────────────────────────
TYPES.forEach(t => {
  const btn = document.createElement('button');
  btn.className = `energy-btn e-${t.id}`;
  btn.dataset.id = t.id;
  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', `${t.name} energy`);
  btn.innerHTML = `
    <div class="icon" aria-hidden="true">${t.icon}</div>
    <span class="name">${t.name}</span>
    <span class="check" aria-hidden="true">✓</span>
  `;

  btn.addEventListener('click', () => {
    if (selected.has(t.id)) {
      selected.delete(t.id);
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      selected.add(t.id);
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    }
    rollBtn.disabled = selected.size === 0;
  });

  grid.appendChild(btn);
});

// ── Turns slider ───────────────────────────────────
turnsSlider.addEventListener('input', () => {
  turnsValEl.textContent = turnsSlider.value;
});

// ── Roll ───────────────────────────────────────────
rollBtn.addEventListener('click', () => {
  const pool = TYPES.filter(t => selected.has(t.id));
  if (!pool.length) return;

  const turns = parseInt(turnsSlider.value, 10);
  resultArea.innerHTML = '';

  for (let i = 0; i < turns; i++) {
    const pick = pool[Math.floor(Math.random() * pool.length)];

    const row = document.createElement('div');
    row.className = 'result-turn';

    const lbl = document.createElement('span');
    lbl.className = 'turn-label';
    lbl.textContent = turns === 1 ? 'This turn' : `Turn ${i + 1}`;

    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.style.background = pick.bg;
    chip.style.animationDelay = `${i * 0.08}s`;
    chip.innerHTML = `<span class="chip-icon" aria-hidden="true">${pick.icon}</span>${pick.name}`;

    row.appendChild(lbl);
    row.appendChild(chip);
    resultArea.appendChild(row);

    if (i < turns - 1) {
      const sep = document.createElement('hr');
      sep.className = 'result-sep';
      resultArea.appendChild(sep);
    }
  }
});

// ── Reset ──────────────────────────────────────────
resetBtn.addEventListener('click', () => {
  selected.clear();
  document.querySelectorAll('.energy-btn').forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-pressed', 'false');
  });
  rollBtn.disabled = true;
  resultArea.innerHTML = '<span class="empty-msg">Pick your energy types above ↑</span>';
  turnsSlider.value = 1;
  turnsValEl.textContent = '1';
});
