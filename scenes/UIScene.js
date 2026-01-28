// UI Scene - HUD Overlay
class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }
    
    init(data) {
        this.gameScene = data.gameScene;
    }
    
    create() {
        const width = GameConfig.CANVAS_WIDTH;
        
        // Stats bars background
        const barBg = this.add.rectangle(8, 8, 300, 40, 0x000000, 0.7);
        barBg.setOrigin(0, 0);
        
        // Health bar
        this.healthBarBg = this.add.rectangle(10, 10, 90, 10, 0x333333);
        this.healthBarBg.setOrigin(0, 0);
        this.healthBar = this.add.rectangle(10, 10, 90, 10, 0x55aa55);
        this.healthBar.setOrigin(0, 0);
        
        this.healthText = this.add.text(12, 11, '♥', {
            font: '8px "Press Start 2P"',
            fill: '#ffffff'
        });
        
        // Hunger bar
        this.hungerBarBg = this.add.rectangle(108, 10, 90, 10, 0x333333);
        this.hungerBarBg.setOrigin(0, 0);
        this.hungerBar = this.add.rectangle(108, 10, 90, 10, 0xaa8844);
        this.hungerBar.setOrigin(0, 0);
        
        this.hungerText = this.add.text(110, 11, '🍖', {
            font: '8px "Press Start 2P"',
            fill: '#ffffff'
        });
        
        // Thirst bar
        this.thirstBarBg = this.add.rectangle(206, 10, 90, 10, 0x333333);
        this.thirstBarBg.setOrigin(0, 0);
        this.thirstBar = this.add.rectangle(206, 10, 90, 10, 0x4488aa);
        this.thirstBar.setOrigin(0, 0);
        
        this.thirstText = this.add.text(208, 11, '💧', {
            font: '8px "Press Start 2P"',
            fill: '#ffffff'
        });
        
        // Weapon display
        this.weaponBg = this.add.rectangle(10, 26, 90, 20, 0x000000, 0.7);
        this.weaponBg.setOrigin(0, 0);
        
        this.weaponText = this.add.text(12, 28, '', {
            font: '8px "Press Start 2P"',
            fill: '#ffffff'
        });
        
        this.ammoText = this.add.text(12, 37, '', {
            font: '6px "Press Start 2P"',
            fill: '#aaaaaa'
        });
        
        // Armor indicator
        this.armorText = this.add.text(108, 28, '', {
            font: '8px "Press Start 2P"',
            fill: '#8090a0'
        });
        
        // Score display (top right)
        const scoreBg = this.add.rectangle(width - 100, 8, 92, 40, 0x000000, 0.7);
        scoreBg.setOrigin(0, 0);
        
        this.scoreTitleText = this.add.text(width - 95, 11, 'SCORE', {
            font: '8px "Press Start 2P"',
            fill: '#ffd700'
        });
        
        this.scoreText = this.add.text(width - 95, 21, '0', {
            font: '8px "Press Start 2P"',
            fill: '#ffffff'
        });
        
        this.highScoreText = this.add.text(width - 95, 32, 'HI: 0', {
            font: '6px "Press Start 2P"',
            fill: '#aaaaaa'
        });
        
        // Controls hint
        this.controlsText = this.add.text(width / 2, 10, 'ARROWS: Move • SPACE: Jump • Z: Attack • X: Shoot', {
            font: '7px "Press Start 2P"',
            fill: '#4a9a3a',
            alpha: 0.6
        }).setOrigin(0.5, 0);
    }
    
    update() {
        if (!this.gameScene || !this.gameScene.player) return;
        
        const player = this.gameScene.player;
        
        // Update health bar
        const healthPct = player.health / player.maxHealth;
        this.healthBar.width = 90 * healthPct;
        this.healthBar.setFillStyle(healthPct > 0.3 ? 0x55aa55 : 0xaa3333);
        
        // Update hunger bar
        const hungerPct = player.hunger / GameConfig.SURVIVAL.MAX_HUNGER;
        this.hungerBar.width = 90 * hungerPct;
        this.hungerBar.setFillStyle(hungerPct > 0.3 ? 0xaa8844 : 0xaa3333);
        
        // Update thirst bar
        const thirstPct = player.thirst / GameConfig.SURVIVAL.MAX_THIRST;
        this.thirstBar.width = 90 * thirstPct;
        this.thirstBar.setFillStyle(thirstPct > 0.3 ? 0x4488aa : 0xaa3333);
        
        // Update weapon
        if (player.weapon) {
            const weaponNames = {
                'rapidfire': 'RAPID',
                'acidgun': 'ACID',
                'boneclub': 'CLUB'
            };
            this.weaponText.setText(weaponNames[player.weapon] || player.weapon.toUpperCase());
            this.ammoText.setText(`x${player.weaponAmmo}`);
        } else {
            this.weaponText.setText('');
            this.ammoText.setText('');
        }
        
        // Update armor
        this.armorText.setText(player.hasArmor ? 'ARMOR' : '');
        
        // Update score
        this.scoreText.setText(this.gameScene.score.toString());
        
        const savedHigh = localStorage.getItem('dinoSurvivalHighScore') || 0;
        this.highScoreText.setText(`HI: ${savedHigh}`);
    }
}
