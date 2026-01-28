// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    
    init(data) {
        this.finalScore = data.score || 0;
        this.distance = data.distance || 0;
        this.enemiesDefeated = data.enemiesDefeated || 0;
        this.highScore = data.highScore || 0;
    }
    
    create() {
        const width = GameConfig.CANVAS_WIDTH;
        const height = GameConfig.CANVAS_HEIGHT;
        
        // Dark overlay
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);
        
        // Game Over title
        this.add.text(width / 2, height / 2 - 100, 'GAME OVER', {
            font: '32px "Press Start 2P"',
            fill: '#ff4444'
        }).setOrigin(0.5);
        
        // Score
        this.add.text(width / 2, height / 2 - 40, `SCORE: ${this.finalScore}`, {
            font: '16px "Press Start 2P"',
            fill: '#ffd700'
        }).setOrigin(0.5);
        
        // New high score?
        if (this.finalScore >= this.highScore && this.finalScore > 0) {
            this.add.text(width / 2, height / 2 - 10, 'NEW HIGH SCORE!', {
                font: '12px "Press Start 2P"',
                fill: '#44ff44'
            }).setOrigin(0.5);
        } else {
            this.add.text(width / 2, height / 2 - 10, `HIGH: ${this.highScore}`, {
                font: '12px "Press Start 2P"',
                fill: '#aaaaaa'
            }).setOrigin(0.5);
        }
        
        // Stats
        this.add.text(width / 2, height / 2 + 20, `Distance: ${this.distance}m`, {
            font: '10px "Press Start 2P"',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        this.add.text(width / 2, height / 2 + 40, `Enemies Defeated: ${this.enemiesDefeated}`, {
            font: '10px "Press Start 2P"',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Restart instruction
        const restartText = this.add.text(width / 2, height / 2 + 80, 'Press Z or SPACE to restart', {
            font: '12px "Press Start 2P"',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Pulsing animation
        this.tweens.add({
            targets: restartText,
            alpha: { from: 1, to: 0.3 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        // Input
        this.input.keyboard.once('keydown-Z', this.restart, this);
        this.input.keyboard.once('keydown-SPACE', this.restart, this);
    }
    
    restart() {
        this.scene.start('GameScene');
    }
}
