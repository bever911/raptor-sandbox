# 🦕 Dino Survival - Phaser 3

A pixel-art dinosaur survival game built with Phaser 3.

## 🎮 Features

- **Survival Mechanics**: Manage hunger, thirst, and health
- **Combat System**: Melee attacks and ranged weapons (Rapid Fire, Acid Gun, Bone Club)
- **Enemy AI**: Baby Spinosaurus enemies with patrol, chase, and attack behaviors
- **Progressive Difficulty**: Enemies get stronger as you progress
- **Day/Night Cycle**: Beautiful sky transitions
- **Pickups**: Weapons, armor, meat, and water sources
- **Score System**: Track distance traveled and enemies defeated
- **High Score**: Persistent leaderboard using localStorage

## 📁 Project Structure

```
phaser-dino-survival/
├── index.html              # Main HTML file
├── config.js               # Game configuration constants
├── main.js                 # Phaser initialization
├── sprites/
│   └── DinoSprites.js      # Procedural sprite generation
├── entities/
│   ├── Player.js           # Player class
│   ├── Enemy.js            # Enemy class
│   ├── Pickup.js           # Pickup items
│   └── Bullet.js           # Projectiles
└── scenes/
    ├── BootScene.js        # Asset loading
    ├── GameScene.js        # Main gameplay
    ├── UIScene.js          # HUD overlay
    └── GameOverScene.js    # Game over screen
```

## 🚀 Local Development

1. **Clone or download** this folder
2. **Start a local server** (required for file loading):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. **Open browser** to `http://localhost:8000`

## 🌐 GitHub Pages Deployment

### Option 1: Deploy entire folder
1. Create a new GitHub repository
2. Upload all files from `phaser-dino-survival/` to the repository
3. Go to **Settings** → **Pages**
4. Set source to **main branch** → **/ (root)**
5. Save and wait a few minutes
6. Your game will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Deploy from docs folder
1. Create a `docs` folder in your repository root
2. Copy all files from `phaser-dino-survival/` into `docs/`
3. Go to **Settings** → **Pages**
4. Set source to **main branch** → **/docs**
5. Save and your game is live!

## 🎯 Controls

- **Arrow Keys / WASD**: Move
- **Space**: Jump
- **Z**: Melee attack / Use bone club
- **X**: Shoot weapon (if equipped)

## 🛠️ Customization

### Adjust Difficulty
Edit `config.js`:
```javascript
DIFFICULTY: {
    SCALE_START: 1000,  // Distance before difficulty increases
    SCALE_RATE: 0.0002, // How fast difficulty increases
}
```

### Change Player Stats
```javascript
PLAYER: {
    MAX_HEALTH: 100,
    SPEED: 180,
    JUMP_FORCE: 340,
    ...
}
```

### Modify Day/Night Cycle
```javascript
DAY_NIGHT_CYCLE: 120, // seconds for full cycle
```

## 🎨 Adding Custom Sprites

Replace procedural sprites in `sprites/DinoSprites.js`:
```javascript
// Instead of drawing with graphics, load images:
this.load.image('raptor', 'assets/raptor.png');
```

## 📝 To-Do / Enhancement Ideas

- [ ] Add more enemy types (Triceratops, Pteranodon)
- [ ] Power-ups (speed boost, invincibility)
- [ ] Environmental hazards (tar pits, spike traps)
- [ ] Sound effects and music
- [ ] Mobile touch controls
- [ ] Better sprite animations
- [ ] Procedurally generated levels
- [ ] Save game progress

## 🐛 Known Issues

- Sprites are basic (procedurally generated rectangles)
- No animations yet (static sprites)
- Could use sound effects
- Mobile controls need improvement

## 📜 License

Free to use and modify for your own projects!

## 🙏 Credits

Built with:
- [Phaser 3](https://phaser.io/) - Game framework
- Pixel art style inspired by retro games

---

**Have fun surviving in the dino jungle!** 🦖🌴
