// Main Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }
    
    create() {
        // World setup
        this.physics.world.setBounds(0, 0, GameConfig.WORLD_WIDTH, GameConfig.CANVAS_HEIGHT);
        
        // Sky
        this.createBackground();
        
        // Background Environment (trees, mountains, clouds, etc)
        this.background = new BackgroundEnvironment(this);
        this.background.create();
        
        // Ground
        this.createGround();
        
        // Player
        this.player = new Player(this, 100, 200);
        
        // Groups
        this.enemies = this.physics.add.group({
            classType: Enemy
        });
        
        this.pickups = this.physics.add.group({
            classType: Pickup,
            runChildUpdate: true
        });
        
        this.bullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });
        
        // Spawn initial pickups
        this.spawnInitialPickups();
        
        // Collisions
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.overlap(this.player, this.pickups, this.collectPickup, null, this);
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        
        // Camera
        this.cameras.main.setBounds(0, 0, GameConfig.WORLD_WIDTH, GameConfig.CANVAS_HEIGHT);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        
        // Game state
        this.score = 0;
        this.distance = 0;
        this.enemiesDefeated = 0;
        this.difficultyMult = 1.0;
        
        // Spawn system
        this.spawnZones = [];
        for (let x = 400; x < GameConfig.WORLD_WIDTH - 200; x += GameConfig.SPAWN.DISTANCE) {
            this.spawnZones.push({ x, triggered: false });
        }
        
        // Events
        this.events.on('player-shoot', this.createBullet, this);
        this.events.on('player-died', this.gameOver, this);
        this.events.on('enemy-attack', this.enemyAttackPlayer, this);
        this.events.on('enemy-died', this.onEnemyDied, this);
        
        // Start UI scene
        this.scene.launch('UIScene', { gameScene: this });
        
        // Day/Night cycle
        this.dayNightTime = 0.35; // Start at day
    }
    
    update(time, delta) {
        const dt = delta / 1000;
        
        // Update background animation
        if (this.background) {
            this.background.update(time);
        }
        
        // Update player
        if (this.player && !this.player.isDead) {
            this.player.update(time, delta);
        }
        
        // Update enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.update(time, delta);
            }
        });
        
        if (!this.player || this.player.isDead) return;
        
        // Update score/distance
        this.distance = Math.floor(this.player.x / 10);
        this.score = this.distance + (this.enemiesDefeated * 100);
        
        // Update difficulty
        if (this.player.x > GameConfig.DIFFICULTY.SCALE_START) {
            const excess = this.player.x - GameConfig.DIFFICULTY.SCALE_START;
            this.difficultyMult = 1.0 + (excess * GameConfig.DIFFICULTY.SCALE_RATE);
        }
        
        // Spawn enemies
        this.checkSpawnZones();
        
        // Day/night cycle
        this.dayNightTime += dt / GameConfig.DAY_NIGHT_CYCLE;
        this.dayNightTime = this.dayNightTime % 1;
        this.updateSkyColor();
    }
    
    createBackground() {
        // Sky rectangle that will change color with day/night
        this.sky = this.add.rectangle(
            GameConfig.WORLD_WIDTH / 2, 
            GameConfig.CANVAS_HEIGHT / 2, 
            GameConfig.WORLD_WIDTH, 
            GameConfig.CANVAS_HEIGHT, 
            0x5a9fd4
        );
        this.sky.setDepth(-100);
        this.sky.setScrollFactor(0, 0);
    }
    
    createGround() {
        // Main ground
        this.ground = this.physics.add.staticGroup();
        
        const groundHeight = 50;
        const groundY = GameConfig.CANVAS_HEIGHT - groundHeight / 2;
        
        // Create ground tiles
        for (let x = 0; x < GameConfig.WORLD_WIDTH; x += 100) {
            const groundTile = this.add.rectangle(x + 50, groundY, 100, groundHeight, GameConfig.COLORS.GROUND);
            this.ground.add(groundTile);
        }
        
        // Dirt layer
        const dirtY = GameConfig.CANVAS_HEIGHT - 16;
        for (let x = 0; x < GameConfig.WORLD_WIDTH; x += 100) {
            this.add.rectangle(x + 50, dirtY, 100, 16, GameConfig.COLORS.DIRT);
        }
        
        // Stone border
        for (let x = 0; x < GameConfig.WORLD_WIDTH; x += 20) {
            this.add.rectangle(x + 10, GameConfig.CANVAS_HEIGHT - 8, 19, 15, GameConfig.COLORS.STONE);
        }
    }
    
    spawnInitialPickups() {
        const groundY = GameConfig.CANVAS_HEIGHT - 60;
        const pickupTypes = ['armor', 'rapidfire', 'boneclub', 'acidgun'];
        
        for (let i = 0; i < 10; i++) {
            const x = 250 + i * 250;
            const type = pickupTypes[i % pickupTypes.length];
            this.pickups.add(new Pickup(this, x, groundY, type));
        }
    }
    
    checkSpawnZones() {
        for (const zone of this.spawnZones) {
            if (!zone.triggered && Math.abs(this.player.x - zone.x) < 200) {
                if (this.enemies.getChildren().length < GameConfig.SPAWN.MAX_ENEMIES) {
                    const groundY = GameConfig.CANVAS_HEIGHT - 100;
                    const enemy = new Enemy(
                        this, 
                        zone.x + (Math.random() - 0.5) * 100, 
                        groundY, 
                        this.difficultyMult
                    );
                    enemy.player = this.player; // Set player reference
                    this.enemies.add(enemy);
                }
                zone.triggered = true;
            }
        }
    }
    
    collectPickup(player, pickup) {
        pickup.collect(player);
    }
    
    createBullet(data) {
        const bullet = new Bullet(
            this,
            data.x,
            data.y,
            data.direction,
            data.type,
            data.damage,
            data.speed
        );
        this.bullets.add(bullet);
    }
    
    bulletHitEnemy(bullet, enemy) {
        if (!enemy.isDead) {
            enemy.takeDamage(bullet.damage);
            bullet.destroy();
            
            // Particle effect
            this.createHitEffect(enemy.x, enemy.y);
        }
    }
    
    enemyAttackPlayer(enemy) {
        if (!this.player.isDead) {
            const attackBox = enemy.getAttackHitbox();
            const playerBox = new Phaser.Geom.Rectangle(
                this.player.x - 20,
                this.player.y - 25,
                40,
                50
            );
            
            if (Phaser.Geom.Rectangle.Overlaps(attackBox, playerBox)) {
                this.player.takeDamage(enemy.damage);
            }
        }
    }
    
    onEnemyDied(x, y) {
        this.enemiesDefeated++;
        
        // Drop meat
        const groundY = GameConfig.CANVAS_HEIGHT - 60;
        this.pickups.add(new Pickup(this, x, groundY, 'meat'));
        
        // Death particles
        this.createDeathEffect(x, y);
    }
    
    createHitEffect(x, y) {
        // Simple particle burst
        const particles = this.add.particles(x, y, 'bullet_rapid', {
            speed: { min: 50, max: 150 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            lifespan: 300,
            quantity: 8,
            blendMode: 'ADD'
        });
        
        this.time.delayedCall(500, () => particles.destroy());
    }
    
    createDeathEffect(x, y) {
        const particles = this.add.particles(x, y, 'bullet_rapid', {
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.5, end: 0 },
            tint: 0x8a6a50,
            lifespan: 500,
            quantity: 15,
            blendMode: 'NORMAL'
        });
        
        this.time.delayedCall(1000, () => particles.destroy());
    }
    
    updateSkyColor() {
        const t = this.dayNightTime;
        let color;
        
        if (t < 0.2) {
            // Night -> Dawn
            const phase = t / 0.2;
            color = this.lerpColor(0x1a1a3a, 0x4a5a8a, phase);
        } else if (t < 0.3) {
            // Dawn -> Day
            const phase = (t - 0.2) / 0.1;
            color = this.lerpColor(0x4a5a8a, 0x5a9fd4, phase);
        } else if (t < 0.7) {
            // Day
            color = 0x5a9fd4;
        } else if (t < 0.8) {
            // Dusk -> Night
            const phase = (t - 0.7) / 0.1;
            color = this.lerpColor(0x5a9fd4, 0x4a3a6a, phase);
        } else {
            // Night
            const phase = (t - 0.8) / 0.2;
            color = this.lerpColor(0x4a3a6a, 0x1a1a3a, phase);
        }
        
        this.sky.setFillStyle(color);
    }
    
    lerpColor(color1, color2, t) {
        const r1 = (color1 >> 16) & 0xff;
        const g1 = (color1 >> 8) & 0xff;
        const b1 = color1 & 0xff;
        
        const r2 = (color2 >> 16) & 0xff;
        const g2 = (color2 >> 8) & 0xff;
        const b2 = color2 & 0xff;
        
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);
        
        return (r << 16) | (g << 8) | b;
    }
    
    gameOver() {
        // Save high score
        const savedHigh = localStorage.getItem('dinoSurvivalHighScore') || 0;
        if (this.score > savedHigh) {
            localStorage.setItem('dinoSurvivalHighScore', this.score.toString());
        }
        
        this.scene.stop('UIScene');
        this.scene.start('GameOverScene', {
            score: this.score,
            distance: this.distance,
            enemiesDefeated: this.enemiesDefeated,
            highScore: Math.max(this.score, savedHigh)
        });
    }
}
