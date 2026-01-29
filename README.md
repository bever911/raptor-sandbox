# Dino Survival - Phaser 3

A pixel art dinosaur survival game built with Phaser 3.

## How to Play

### Controls

**Keyboard:**
- Arrow Keys / WASD - Move
- Space - Jump
- Z - Attack (claw attack or bone club swing)
- X - Shoot (when you have a gun)

**Touch/Mobile:**
- D-Pad on left - Movement
- JUMP button - Jump
- ATK button - Attack
- GUN button - Shoot

### Gameplay

You play as a raptor trying to survive in a prehistoric jungle. You must:

1. **Stay Fed** - Collect berries from bushes (restores hunger)
2. **Stay Hydrated** - Drink from puddles and ponds (restores thirst)
3. **Fight Enemies** - Defeat spinosaurus enemies that spawn as you explore
4. **Collect Weapons** - Find powerful weapons to help you survive

### Weapons

- **Rapid Fire Gun** (Blue) - Fast shooting, moderate damage
- **Acid Spit Gun** (Green) - Slower, higher damage with arc trajectory
- **Bone Club** (Tan) - Powerful melee weapon, high damage

### Pickups

- **Meat** (Red) - Dropped by enemies, restores hunger significantly
- **Armor** (Blue Shield) - Reduces damage by 50%, lasts 5 hits

### Survival Tips

- Your health regenerates when both hunger AND thirst are full
- Ponds provide continuous hydration while standing in them
- Puddles respawn after 25 seconds
- Enemies get faster when they spot you

## Running the Game

Simply open `index.html` in a modern web browser. The game loads Phaser 3 from CDN.

For local development, you can use any simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Create a new GitHub repository
2. Upload the contents of this folder
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose `main` branch
5. Your game will be live at `https://yourusername.github.io/repository-name/`

## Technical Details

- Built with Phaser 3.60
- All sprites generated programmatically (no external assets needed)
- Responsive design works on desktop and mobile
- Touch controls for mobile play

## Credits

Created as a family game development project.
