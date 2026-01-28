// Dino Sprite Generator
class DinoSprites {
    static generateRaptorTexture(scene, key = 'raptor') {
        const width = 60;
        const height = 56;
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        
        // Define colors
        const colors = {
            scalesDark: 0x2d4a3d,
            scalesMid: 0x3d6a4d,
            scalesLight: 0x4d8a5d,
            scalesHighlight: 0x6aaa6a,
            bellyMid: 0xaa9a6a,
            bellyLight: 0xcaba8a,
            stripeDark: 0x1a3a2a,
            eye: 0xffaa00,
            eyeRing: 0xaa6600,
            pupil: 0x1a1a1a,
            eyeShine: 0xffffff,
            clawDark: 0x2a2a2a,
            teeth: 0xf0f0e0,
        };
        
        // Draw raptor (simplified for now - facing right)
        // Tail
        graphics.fillStyle(colors.scalesMid);
        graphics.fillRect(2, 22, 8, 10);
        graphics.fillRect(-1, 20, 6, 8);
        graphics.fillRect(-4, 21, 5, 5);
        
        // Back leg
        graphics.fillRect(10, 34, 10, 8);
        graphics.fillRect(8, 40, 8, 10);
        graphics.fillRect(6, 48, 12, 4);
        
        // Body
        graphics.fillRect(10, 24, 26, 16);
        graphics.fillStyle(colors.scalesLight);
        graphics.fillRect(12, 26, 22, 12);
        
        // Belly
        graphics.fillStyle(colors.bellyMid);
        graphics.fillRect(16, 34, 16, 6);
        
        // Front leg
        graphics.fillStyle(colors.scalesMid);
        graphics.fillRect(28, 34, 8, 6);
        graphics.fillRect(30, 38, 6, 10);
        graphics.fillRect(28, 46, 10, 4);
        
        // Arms
        graphics.fillRect(32, 24, 6, 5);
        graphics.fillRect(36, 22, 8, 4);
        
        // Neck
        graphics.fillRect(32, 12, 10, 14);
        
        // Head
        graphics.fillRect(34, 4, 16, 14);
        graphics.fillStyle(colors.scalesLight);
        graphics.fillRect(36, 6, 12, 10);
        graphics.fillRect(46, 8, 8, 8);
        
        // Eye
        graphics.fillStyle(colors.eyeRing);
        graphics.fillRect(39, 7, 6, 6);
        graphics.fillStyle(colors.eye);
        graphics.fillRect(40, 8, 4, 4);
        graphics.fillStyle(colors.pupil);
        graphics.fillRect(42, 8, 2, 4);
        graphics.fillStyle(colors.eyeShine);
        graphics.fillRect(40, 8, 1, 1);
        
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }
    
    static generateSpinoTexture(scene, key = 'spino') {
        const width = 50;
        const height = 52;
        const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
        
        const colors = {
            scalesMid: 0x4a6070,
            scalesLight: 0x5a7888,
            sailMid: 0xaa5a3a,
            sailLight: 0xca7a4a,
            sailSpine: 0x6a2a1a,
            bellyMid: 0x9a9a8a,
            eye: 0xff6600,
            eyeRing: 0xaa4400,
            pupil: 0x1a1a1a,
            eyeShine: 0xffffff,
            clawDark: 0x2a2a2a,
            teeth: 0xf0f0e0,
        };
        
        // Tail
        graphics.fillStyle(colors.scalesMid);
        graphics.fillRect(-4, 26, 10, 6);
        graphics.fillRect(4, 24, 8, 8);
        
        // Back leg
        graphics.fillRect(12, 34, 8, 7);
        graphics.fillRect(10, 40, 7, 10);
        graphics.fillRect(8, 48, 10, 4);
        
        // Body
        graphics.fillRect(10, 26, 24, 14);
        graphics.fillStyle(colors.scalesLight);
        graphics.fillRect(12, 28, 20, 10);
        
        // Sail spines
        graphics.fillStyle(colors.sailSpine);
        for (let i = 0; i < 6; i++) {
            const sh = 12 + Math.sin(i * 0.8) * 4;
            graphics.fillRect(14 + i * 4, 10 - sh, 2, sh);
        }
        
        // Sail
        graphics.fillStyle(colors.sailMid);
        graphics.fillRect(14, 6, 24, 14);
        graphics.fillStyle(colors.sailLight);
        graphics.fillRect(16, 8, 20, 10);
        
        // Front leg
        graphics.fillStyle(colors.scalesMid);
        graphics.fillRect(28, 34, 6, 5);
        graphics.fillRect(29, 38, 5, 10);
        graphics.fillRect(27, 46, 8, 4);
        
        // Neck
        graphics.fillRect(32, 18, 8, 14);
        
        // Head
        graphics.fillRect(36, 14, 12, 10);
        graphics.fillRect(46, 16, 12, 6);
        graphics.fillRect(44, 22, 14, 4);
        
        // Eye
        graphics.fillStyle(colors.eyeRing);
        graphics.fillRect(39, 15, 4, 4);
        graphics.fillStyle(colors.eye);
        graphics.fillRect(40, 16, 3, 3);
        graphics.fillStyle(colors.pupil);
        graphics.fillRect(41, 16, 2, 3);
        graphics.fillStyle(colors.eyeShine);
        graphics.fillRect(40, 16, 1, 1);
        
        graphics.generateTexture(key, width, height);
        graphics.destroy();
    }
    
    static generatePickupTextures(scene) {
        // Meat
        const meatGfx = scene.make.graphics({ x: 0, y: 0, add: false });
        meatGfx.fillStyle(0x8a3a3a);
        meatGfx.fillRect(6, 8, 12, 8);
        meatGfx.fillStyle(0xaa5a5a);
        meatGfx.fillRect(8, 10, 8, 4);
        meatGfx.fillStyle(0xe0e0d0);
        meatGfx.fillRect(4, 10, 4, 4);
        meatGfx.fillRect(16, 10, 4, 4);
        meatGfx.generateTexture('pickup_meat', 24, 24);
        meatGfx.destroy();
        
        // Rapid Fire Gun
        const rapidGfx = scene.make.graphics({ x: 0, y: 0, add: false });
        rapidGfx.fillStyle(0x3a5a7a);
        rapidGfx.fillRect(0, 10, 24, 8);
        rapidGfx.fillStyle(0x5a7a9a);
        rapidGfx.fillRect(2, 11, 20, 6);
        rapidGfx.fillStyle(0x8abadf);
        rapidGfx.fillRect(4, 12, 6, 4);
        rapidGfx.fillStyle(0xffa500);
        rapidGfx.fillRect(22, 12, 4, 4);
        rapidGfx.generateTexture('pickup_rapidfire', 24, 24);
        rapidGfx.destroy();
        
        // Acid Gun
        const acidGfx = scene.make.graphics({ x: 0, y: 0, add: false });
        acidGfx.fillStyle(0x2a5a2a);
        acidGfx.fillRect(0, 9, 24, 10);
        acidGfx.fillStyle(0x4a8a4a);
        acidGfx.fillRect(2, 10, 20, 8);
        acidGfx.fillStyle(0x8afa8a);
        acidGfx.fillRect(6, 11, 8, 6);
        acidGfx.generateTexture('pickup_acidgun', 24, 24);
        acidGfx.destroy();
        
        // Bone Club
        const clubGfx = scene.make.graphics({ x: 0, y: 0, add: false });
        clubGfx.fillStyle(0x8a7a6a);
        clubGfx.fillRect(8, 10, 8, 16);
        clubGfx.fillStyle(0xd0c8b8);
        clubGfx.fillRect(4, -2, 16, 12);
        clubGfx.fillStyle(0xe8e0d0);
        clubGfx.fillRect(6, 0, 12, 8);
        clubGfx.generateTexture('pickup_boneclub', 24, 24);
        clubGfx.destroy();
        
        // Armor
        const armorGfx = scene.make.graphics({ x: 0, y: 0, add: false });
        armorGfx.fillStyle(0x5070a0);
        armorGfx.fillRect(3, 4, 18, 16);
        armorGfx.fillStyle(0x7090b0);
        armorGfx.fillRect(5, 6, 14, 12);
        armorGfx.fillStyle(0x90b0d0);
        armorGfx.fillRect(7, 8, 10, 8);
        armorGfx.fillStyle(0xb0d0f0);
        armorGfx.fillRect(11, 6, 2, 12);
        armorGfx.fillRect(7, 11, 10, 2);
        armorGfx.generateTexture('pickup_armor', 24, 24);
        armorGfx.destroy();
    }
    
    static generateBulletTextures(scene) {
        // Rapid fire bullet
        const rapidBullet = scene.make.graphics({ x: 0, y: 0, add: false });
        rapidBullet.fillStyle(0xff8800);
        rapidBullet.fillCircle(4, 4, 4);
        rapidBullet.fillStyle(0xffcc00);
        rapidBullet.fillCircle(4, 4, 2);
        rapidBullet.generateTexture('bullet_rapid', 8, 8);
        rapidBullet.destroy();
        
        // Acid bullet
        const acidBullet = scene.make.graphics({ x: 0, y: 0, add: false });
        acidBullet.fillStyle(0x2a8a2a);
        acidBullet.fillCircle(6, 6, 6);
        acidBullet.fillStyle(0x4afa4a);
        acidBullet.fillCircle(6, 6, 4);
        acidBullet.fillStyle(0x8afa8a);
        acidBullet.fillCircle(5, 5, 2);
        acidBullet.generateTexture('bullet_acid', 12, 12);
        acidBullet.destroy();
    }
}
