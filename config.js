// Game Configuration
const GameConfig = {
    // Canvas
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 450,
    WORLD_WIDTH: 5000,
    
    // Physics
    GRAVITY: 980,
    
    // Player
    PLAYER: {
        SCALE: 1.4,
        SPEED: 180,
        SPEED_SLOW: 100,
        JUMP_FORCE: 340,
        MAX_HEALTH: 100,
        DAMAGE: 25,
        HP_REGEN_RATE: 5,
    },
    
    // Enemy
    ENEMY: {
        SCALE: 0.95,
        BASE_HEALTH: 60,
        BASE_DAMAGE: 15,
        BASE_SPEED: 80,
        BASE_CHASE_SPEED: 130,
        SIGHT_RANGE: 200,
        ATTACK_RANGE: 50,
        ATTACK_COOLDOWN: 0.8,
        RETREAT_DISTANCE: 80,
    },
    
    // Survival
    SURVIVAL: {
        MAX_HUNGER: 100,
        MAX_THIRST: 100,
        HUNGER_DRAIN: 1.5,
        THIRST_DRAIN: 2.0,
        STARVATION_DAMAGE: 3,
        DEHYDRATION_DAMAGE: 4,
        MEAT_RESTORE: 35,
        BERRY_RESTORE: 15,
        WATER_RESTORE: 25,
    },
    
    // Weapons
    WEAPONS: {
        BONE_CLUB: {
            DAMAGE: 50,
            FIRE_RATE: 0.7,
            AMMO: 15,
        },
        RAPID_FIRE: {
            DAMAGE: 12,
            FIRE_RATE: 0.12,
            SPEED: 350,
            AMMO: 40,
        },
        ACID_GUN: {
            DAMAGE: 25,
            FIRE_RATE: 0.5,
            SPEED: 280,
            AMMO: 20,
        },
    },
    
    // Spawning
    SPAWN: {
        DISTANCE: 400,
        MAX_ENEMIES: 10,
    },
    
    // Difficulty
    DIFFICULTY: {
        SCALE_START: 1000,
        SCALE_RATE: 0.0002,
    },
    
    // Day/Night
    DAY_NIGHT_CYCLE: 120, // seconds
    
    // Colors
    COLORS: {
        SKY_DAY: { top: 0x5a9fd4, mid: 0x8ec5e8, bottom: 0xb8ddf0 },
        SKY_NIGHT: { top: 0x1a1a3a, mid: 0x2a2a4a, bottom: 0x3a3a5a },
        GROUND: 0x4a9a3a,
        DIRT: 0x6a5040,
        STONE: 0x6a6a6a,
    },
};
