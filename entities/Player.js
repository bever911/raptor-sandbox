// Player Entity
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'raptor');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Physics
        this.setScale(GameConfig.PLAYER.SCALE);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(GameConfig.GRAVITY);
        this.body.setSize(40, 45);
        this.body.setOffset(10, 5);
        
        // Stats
        this.health = GameConfig.PLAYER.MAX_HEALTH;
        this.maxHealth = GameConfig.PLAYER.MAX_HEALTH;
        this.hunger = GameConfig.SURVIVAL.MAX_HUNGER;
        this.thirst = GameConfig.SURVIVAL.MAX_THIRST;
        
        // State
        this.isDead = false;
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.invulnerable = 0;
        this.flashTimer = 0;
        
        // Weapon
        this.weapon = null;
        this.weaponAmmo = 0;
        this.shootCooldown = 0;
        
        // Armor
        this.hasArmor = false;
        this.armorHits = 0;
        
        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = scene.input.keyboard.addKeys({
            w: 'W', a: 'A', s: 'S', d: 'D',
            space: 'SPACE', z: 'Z', x: 'X'
        });
    }
    
    update(time, delta) {
        const dt = delta / 1000;
        
        if (this.isDead) return;
        
        // Timers
        if (this.attackCooldown > 0) this.attackCooldown -= dt;
        if (this.invulnerable > 0) this.invulnerable -= dt;
        if (this.flashTimer > 0) this.flashTimer -= dt;
        if (this.shootCooldown > 0) this.shootCooldown -= dt;
        
        // Survival
        this.hunger -= GameConfig.SURVIVAL.HUNGER_DRAIN * dt;
        this.thirst -= GameConfig.SURVIVAL.THIRST_DRAIN * dt;
        this.hunger = Math.max(0, this.hunger);
        this.thirst = Math.max(0, this.thirst);
        
        // Starvation/Dehydration damage
        if (this.hunger <= 0) {
            this.takeDamage(GameConfig.SURVIVAL.STARVATION_DAMAGE * dt);
        }
        if (this.thirst <= 0) {
            this.takeDamage(GameConfig.SURVIVAL.DEHYDRATION_DAMAGE * dt);
        }
        
        // HP Regen when well-fed
        if (this.hunger >= GameConfig.SURVIVAL.MAX_HUNGER && 
            this.thirst >= GameConfig.SURVIVAL.MAX_THIRST && 
            this.health < this.maxHealth) {
            this.health = Math.min(this.maxHealth, this.health + GameConfig.PLAYER.HP_REGEN_RATE * dt);
        }
        
        // Movement
        const isSlowed = this.hunger <= 0 || this.thirst <= 0;
        const speed = isSlowed ? GameConfig.PLAYER.SPEED_SLOW : GameConfig.PLAYER.SPEED;
        
        if (this.cursors.left.isDown || this.keys.a.isDown) {
            this.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (this.cursors.right.isDown || this.keys.d.isDown) {
            this.setVelocityX(speed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }
        
        // Jump
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
            Phaser.Input.Keyboard.JustDown(this.keys.w) ||
            Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            if (this.body.touching.down) {
                this.setVelocityY(-GameConfig.PLAYER.JUMP_FORCE);
            }
        }
        
        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.keys.z) && this.attackCooldown <= 0) {
            this.attack();
        }
        
        // Shoot
        if (Phaser.Input.Keyboard.JustDown(this.keys.x)) {
            this.shoot();
        }
        
        // Visual feedback
        if (this.flashTimer > 0) {
            this.setAlpha(0.5 + Math.sin(time * 0.05) * 0.5);
        } else {
            this.setAlpha(1);
        }
    }
    
    attack() {
        this.isAttacking = true;
        this.attackCooldown = 0.5;
        
        // Create attack hitbox temporarily
        this.scene.time.delayedCall(100, () => {
            this.isAttacking = false;
        });
        
        return true;
    }
    
    shoot() {
        if (!this.weapon || this.shootCooldown > 0 || this.weaponAmmo <= 0) return;
        
        const weaponConfig = GameConfig.WEAPONS[this.weapon.toUpperCase().replace('_', '_')];
        if (!weaponConfig) return;
        
        this.shootCooldown = weaponConfig.FIRE_RATE;
        this.weaponAmmo--;
        
        if (this.weaponAmmo <= 0) {
            this.weapon = null;
        }
        
        // Emit event for bullet creation
        this.scene.events.emit('player-shoot', {
            x: this.x + (this.flipX ? -20 : 20),
            y: this.y,
            direction: this.flipX ? -1 : 1,
            type: this.weapon,
            damage: weaponConfig.DAMAGE,
            speed: weaponConfig.SPEED
        });
    }
    
    takeDamage(amount) {
        if (this.invulnerable > 0 || this.isDead) return;
        
        // Armor reduces damage
        if (this.hasArmor) {
            amount = Math.floor(amount * 0.5);
            this.armorHits++;
            if (this.armorHits >= 5) {
                this.hasArmor = false;
                this.armorHits = 0;
            }
        }
        
        this.health -= amount;
        this.flashTimer = 0.3;
        this.invulnerable = 0.5;
        
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    restoreHunger(amount) {
        this.hunger = Math.min(GameConfig.SURVIVAL.MAX_HUNGER, this.hunger + amount);
    }
    
    restoreThirst(amount) {
        this.thirst = Math.min(GameConfig.SURVIVAL.MAX_THIRST, this.thirst + amount);
    }
    
    pickupWeapon(type, ammo) {
        if (!this.weapon || this.weapon === type) {
            this.weapon = type;
            this.weaponAmmo += ammo;
            return true;
        }
        return false;
    }
    
    pickupArmor() {
        if (!this.hasArmor) {
            this.hasArmor = true;
            this.armorHits = 0;
            return true;
        }
        return false;
    }
    
    die() {
        this.isDead = true;
        this.setVelocity(0, 0);
        
        // Death animation
        this.scene.tweens.add({
            targets: this,
            angle: 90,
            alpha: 0,
            duration: 1500,
            onComplete: () => {
                this.scene.events.emit('player-died');
            }
        });
    }
    
    getAttackHitbox() {
        const offsetX = this.flipX ? -40 : 40;
        return new Phaser.Geom.Rectangle(
            this.x + offsetX,
            this.y - 20,
            40,
            50
        );
    }
}
