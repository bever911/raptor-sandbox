// Pickup Entity
class Pickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, `pickup_${type}`);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.type = type;
        this.body.setAllowGravity(false);
        this.setScale(1.5);
        
        // Add glow effect
        this.glowCircle = scene.add.circle(x, y, 25, this.getGlowColor(), 0.3);
        this.glowCircle.setDepth(this.depth - 1);
        
        // Bobbing animation
        scene.tweens.add({
            targets: this,
            y: y - 5,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Pulsing glow
        scene.tweens.add({
            targets: this.glowCircle,
            scale: { from: 1, to: 1.2 },
            alpha: { from: 0.3, to: 0.5 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    getGlowColor() {
        switch(this.type) {
            case 'meat': return 0xff6464;
            case 'rapidfire': return 0x6496ff;
            case 'acidgun': return 0x64ff64;
            case 'boneclub': return 0xffe6b4;
            case 'armor': return 0x96c8ff;
            default: return 0xffffff;
        }
    }
    
    update() {
        if (this.glowCircle) {
            this.glowCircle.x = this.x;
            this.glowCircle.y = this.y;
        }
    }
    
    collect(player) {
        let collected = false;
        
        switch(this.type) {
            case 'meat':
                player.restoreHunger(GameConfig.SURVIVAL.MEAT_RESTORE);
                collected = true;
                break;
            case 'rapidfire':
                collected = player.pickupWeapon('rapidfire', GameConfig.WEAPONS.RAPID_FIRE.AMMO);
                break;
            case 'acidgun':
                collected = player.pickupWeapon('acidgun', GameConfig.WEAPONS.ACID_GUN.AMMO);
                break;
            case 'boneclub':
                collected = player.pickupWeapon('boneclub', GameConfig.WEAPONS.BONE_CLUB.AMMO);
                break;
            case 'armor':
                collected = player.pickupArmor();
                break;
        }
        
        if (collected) {
            this.destroy();
        }
    }
    
    destroy() {
        if (this.glowCircle) {
            this.glowCircle.destroy();
        }
        super.destroy();
    }
}
