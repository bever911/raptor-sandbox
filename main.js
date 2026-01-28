// Main Game Initialization
const config = {
    type: Phaser.AUTO,
    width: GameConfig.CANVAS_WIDTH,
    height: GameConfig.CANVAS_HEIGHT,
    parent: 'game-container',
    backgroundColor: '#0a0a12',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        GameScene,
        UIScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
