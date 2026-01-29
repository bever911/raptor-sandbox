// Enemy Entity
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, difficultyMult = 1.0) {
        super(scene, x, y, 'spino');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Physics
        this.setScale(GameConfig.ENEMY.SCALE);
        this.body.setGravityY(GameConfig.GRAVITY);
        this.body.setSize(40, 45);
        
        // Stats (scaled by difficulty)
        this.health = Math.floor(GameConfig.ENEMY.BASE_HEALTH * difficultyMult);
        this.maxHealth = this.health;
        this.damage = Math.floor(GameConfig.ENEMY.BASE_DAMAGE * difficultyMult);
        this.speed = GameConfig.ENEMY.BASE_SPEED * Math.min(1.5, difficultyMult);
        this.chaseSpeed = GameConfig.ENEMY.BASE_CHASE_SPEED * Math.min(1.5, difficultyMult);
        
        // State
        this.state = 'patrol';
        this.patrolDir = Math.random() > 0.5 ? 1 : -1;
        this.patrolTimer = 2 + Math.random() * 2;
        this.sawPlayer = false;
        this.attackCooldown = 0;
        this.attackTimer = 0;
        this.retreatTimer = 0;
        this.flashTimer = 0;
        this.isDead = false;
        this.player = null; // Will be set by GameScene
        
        this.setFlipX(this.patrolDir < 0);
    }
    
    update(time, delta) {
        const dt = delta / 1000;
        
        if (this.isDead || !this.player) return;
        
        const player = this.player;
        if (!player || player.isDead) {
            // No player or player is dead - just patrol
            this.patrol(dt);
            return;
        }
        
        // Timers
        if (this.attackCooldown > 0) this.attackCooldown -= dt;
        if (this.attackTimer > 0) this.attackTimer -= dt;
        if (this.retreatTimer > 0) this.retreatTimer -= dt;
        if (this.flashTimer > 0) this.flashTimer -= dt;
        
        // Check player visibility
        const dx = player.x - this.x;
        const distance = Math.abs(dx);
        
        if (this.canSeePlayer(player, dx)) {
            this.sawPlayer = true;
        }
        
        // AI State Machine
        if (this.attackTimer > 0) {
            this.state = 'attack';
            this.setVelocityX(0);
        } else if (this.retreatTimer > 0) {
            this.state = 'retreat';
            const retreatDir = dx > 0 ? -1 : 1;
            this.setFlipX(dx > 0);
            this.setVelocityX(retreatDir * this.speed);
        } else if (this.sawPlayer && distance < GameConfig.ENEMY.SIGHT_RANGE * 1.5 && !player.isDead) {
            this.state = 'chase';
            this.setFlipX(dx < 0);
            
            // Maintain distance
            if (distance > GameConfig.ENEMY.ATTACK_RANGE + 10) {
                this.setVelocityX((dx > 0 ? 1 : -1) * this.chaseSpeed);
            } else if (distance < GameConfig.ENEMY.RETREAT_DISTANCE) {
                this.setVelocityX((dx > 0 ? -1 : 1) * this.speed * 0.5);
            } else {
                this.setVelocityX(0);
            }
            
            // Attack if in range
            if (distance < GameConfig.ENEMY.ATTACK_RANGE && this.attackCooldown <= 0) {
                this.attack();
            }
        } else {
            // Patrol
            this.state = 'patrol';
            this.sawPlayer = false;
            this.patrolTimer -= dt;
            
            if (this.patrolTimer <= 0) {
                this.patrolDir *= -1;
                this.patrolTimer = 2 + Math.random() * 2;
            }
            
            this.setFlipX(this.patrolDir < 0);
            this.setVelocityX(this.patrolDir * this.speed);
        }
        
        // Visual feedback
        if (this.flashTimer > 0) {
            this.setAlpha(0.5 + Math.sin(time * 0.05) * 0.5);
        } else {
            this.setAlpha(1);
        }
    }
    
    canSeePlayer(player, dx) {
        if (Math.abs(dx) > GameConfig.ENEMY.SIGHT_RANGE) return false;
        return (dx > 0 && !this.flipX) || (dx < 0 && this.flipX);
    }
    
    patrol(dt) {
        this.state = 'patrol';
        this.patrolTimer -= dt;
        
        if (this.patrolTimer <= 0) {
            this.patrolDir *= -1;
            this.patrolTimer = 2 + Math.random() * 2;
        }
        
        this.setFlipX(this.patrolDir < 0);
        this.setVelocityX(this.patrolDir * this.speed);
    }
    
    attack() {
        this.attackTimer = 0.4;
        this.attackCooldown = GameConfig.ENEMY.ATTACK_COOLDOWN;
        this.state = 'attack';
        this.setVelocityX(0);
        
        this.scene.time.delayedCall(200, () => {
            if (this.attackTimer > 0) {
                // Attack happens here
                this.scene.events.emit('enemy-attack', this);
            }
        });
        
        this.scene.time.delayedCall(400, () => {
            this.retreatTimer = 0.6;
        });
    }
    
    takeDamage(amount) {
        if (this.isDead) return;
        
        this.health -= amount;
        this.flashTimer = 0.25;
        
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }
    
    die() {
        this.isDead = true;
        this.setVelocity(0, 0);
        this.state = 'dying';
        
        // Drop meat
        this.scene.events.emit('enemy-died', this.x, this.y);
        
        // Death animation
        this.scene.tweens.add({
            targets: this,
            angle: 90,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                this.destroy();
            }
        });
    }
    
    getAttackHitbox() {
        const offsetX = this.flipX ? -25 : 25;
        return new Phaser.Geom.Rectangle(
            this.x + offsetX,
            this.y - 15,
            30,
            35
        );
    }
}
