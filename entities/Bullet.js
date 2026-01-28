// Bullet Entity
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, type, damage, speed) {
        const textureKey = type === 'acidgun' ? 'bullet_acid' : 'bullet_rapid';
        super(scene, x, y, textureKey);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.damage = damage;
        this.type = type;
        
        // Physics
        this.body.setAllowGravity(type === 'acidgun'); // Acid has arc
        if (type === 'acidgun') {
            this.body.setGravityY(150);
        }
        
        this.setVelocityX(direction * speed);
        
        // Auto-destroy after traveling off screen or timeout
        scene.time.delayedCall(3000, () => {
            this.destroy();
        });
    }
    
    update() {
        // Destroy if off screen
        if (this.x < -50 || this.x > GameConfig.WORLD_WIDTH + 50 || 
            this.y < -50 || this.y > GameConfig.CANVAS_HEIGHT + 50) {
            this.destroy();
        }
    }
}
