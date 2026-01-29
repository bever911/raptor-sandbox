// Background Environment Manager
class BackgroundEnvironment {
    constructor(scene) {
        this.scene = scene;
        this.clouds = [];
        this.mountains = [];
        this.trees = [];
        this.palmTrees = [];
        this.bushes = [];
        this.flowers = [];
        this.rocks = [];
    }
    
    create() {
        // Create all environmental elements
        this.createMountains();
        this.createClouds();
        this.createTrees();
        this.createPalmTrees();
        this.createGroundDecorations();
    }
    
    createMountains() {
        // Far mountains (slowest parallax)
        for (let i = 0; i < 20; i++) {
            const x = i * 300 + Math.random() * 100;
            const height = 120 + Math.random() * 40;
            const mountain = this.scene.add.graphics();
            
            mountain.fillStyle(0x7a9ab0, 1);
            mountain.beginPath();
            mountain.moveTo(-100, 0);
            mountain.lineTo(0, -height);
            mountain.lineTo(100, 0);
            mountain.closePath();
            mountain.fill();
            
            // Snow cap
            mountain.fillStyle(0xe8f0f0, 1);
            mountain.beginPath();
            mountain.moveTo(-20, -height + 20);
            mountain.lineTo(0, -height);
            mountain.lineTo(20, -height + 20);
            mountain.lineTo(10, -height + 15);
            mountain.lineTo(0, -height + 25);
            mountain.lineTo(-10, -height + 15);
            mountain.closePath();
            mountain.fill();
            
            mountain.setPosition(x, GameConfig.CANVAS_HEIGHT - 50);
            mountain.setDepth(-90);
            mountain.setScrollFactor(0.08, 1);
            this.mountains.push({ graphics: mountain, baseX: x, parallax: 0.08 });
        }
        
        // Mid mountains
        for (let i = 0; i < 25; i++) {
            const x = i * 250 + Math.random() * 80;
            const height = 90 + Math.random() * 30;
            const mountain = this.scene.add.graphics();
            
            mountain.fillStyle(0x6a8a98, 1);
            mountain.beginPath();
            mountain.moveTo(-80, 0);
            mountain.lineTo(0, -height);
            mountain.lineTo(80, 0);
            mountain.closePath();
            mountain.fill();
            
            mountain.setPosition(x, GameConfig.CANVAS_HEIGHT - 50);
            mountain.setDepth(-80);
            mountain.setScrollFactor(0.12, 1);
            this.mountains.push({ graphics: mountain, baseX: x, parallax: 0.12 });
        }
        
        // Near mountains (greenish)
        for (let i = 0; i < 30; i++) {
            const x = i * 200 + Math.random() * 60;
            const height = 70 + Math.random() * 25;
            const mountain = this.scene.add.graphics();
            
            mountain.fillStyle(0x5a7a6a, 1);
            mountain.beginPath();
            mountain.moveTo(-70, 0);
            mountain.lineTo(0, -height);
            mountain.lineTo(70, 0);
            mountain.closePath();
            mountain.fill();
            
            mountain.setPosition(x, GameConfig.CANVAS_HEIGHT - 50);
            mountain.setDepth(-70);
            mountain.setScrollFactor(0.18, 1);
            this.mountains.push({ graphics: mountain, baseX: x, parallax: 0.18 });
        }
    }
    
    createClouds() {
        for (let i = 0; i < 15; i++) {
            const x = i * 400 + Math.random() * 200;
            const y = 30 + Math.random() * 60;
            const size = 40 + Math.random() * 30;
            
            const cloud = this.scene.add.graphics();
            cloud.fillStyle(0xffffff, 0.9);
            
            // Main cloud body with multiple circles
            cloud.fillCircle(0, 0, size * 0.6);
            cloud.fillCircle(-size * 0.5, 5, size * 0.4);
            cloud.fillCircle(size * 0.5, 3, size * 0.5);
            cloud.fillCircle(size * 0.9, 8, size * 0.35);
            
            cloud.setPosition(x, y);
            cloud.setDepth(-95);
            cloud.setScrollFactor(0.05, 0);
            
            this.clouds.push({
                graphics: cloud,
                baseX: x,
                speed: 5 + Math.random() * 10,
                y: y
            });
        }
    }
    
    createTrees() {
        // Regular trees with detailed branches
        for (let i = 0; i < 60; i++) {
            const x = i * 120 + Math.random() * 60;
            const treeData = {
                x: x,
                height: 60 + Math.random() * 30,
                width: 35 + Math.random() * 20,
                type: Math.floor(Math.random() * 3)
            };
            
            const tree = this.createDetailedTree(treeData);
            tree.setDepth(-50);
            tree.setScrollFactor(0.7, 1);
            this.trees.push({ container: tree, data: treeData });
        }
    }
    
    createDetailedTree(data) {
        const container = this.scene.add.container(data.x, GameConfig.CANVAS_HEIGHT - 50);
        
        const trunkWidth = data.width * 0.25;
        const trunkHeight = data.height * 0.6;
        
        // Trunk
        const trunk = this.scene.add.graphics();
        trunk.fillStyle(0x3a2a1a, 1);
        trunk.beginPath();
        trunk.moveTo(-trunkWidth / 2, 0);
        trunk.lineTo(-trunkWidth / 2 - 2, -trunkHeight);
        trunk.lineTo(trunkWidth / 2 + 2, -trunkHeight);
        trunk.lineTo(trunkWidth / 2, 0);
        trunk.closePath();
        trunk.fill();
        
        // Trunk highlight
        trunk.fillStyle(0x5a4030, 1);
        trunk.fillRect(-trunkWidth * 0.2, -trunkHeight + 5, trunkWidth * 0.4, trunkHeight - 10);
        
        // Trunk texture (horizontal lines)
        trunk.lineStyle(2, 0x2a1a0a, 1);
        for (let i = 1; i <= 4; i++) {
            trunk.beginPath();
            trunk.moveTo(-trunkWidth / 2 - 2, -trunkHeight * 0.2 * i);
            trunk.lineTo(trunkWidth / 2 + 2, -trunkHeight * 0.2 * i);
            trunk.strokePath();
        }
        
        container.add(trunk);
        
        // Branches (using simple lines since Phaser Graphics doesn't have quadraticCurveTo)
        const branches = this.scene.add.graphics();
        branches.lineStyle(3, 0x3a2a1a, 1);
        
        // Left branch (approximate curve with multiple line segments)
        branches.beginPath();
        branches.moveTo(0, -trunkHeight * 0.7);
        branches.lineTo(-data.width * 0.15, -trunkHeight * 0.73);
        branches.lineTo(-data.width * 0.28, -trunkHeight * 0.78);
        branches.lineTo(-data.width * 0.4, -trunkHeight * 0.85);
        branches.strokePath();
        
        // Right branch
        branches.beginPath();
        branches.moveTo(0, -trunkHeight * 0.6);
        branches.lineTo(data.width * 0.18, -trunkHeight * 0.62);
        branches.lineTo(data.width * 0.32, -trunkHeight * 0.67);
        branches.lineTo(data.width * 0.45, -trunkHeight * 0.75);
        branches.strokePath();
        
        container.add(branches);
        
        // Foliage - multiple irregular blobs
        const foliage = this.scene.add.graphics();
        
        // Dark layer
        foliage.fillStyle(0x1a5a2a, 1);
        foliage.fillCircle(0, -data.height + 15, data.width * 0.5);
        foliage.fillCircle(-data.width * 0.3, -data.height + 25, data.width * 0.35);
        foliage.fillCircle(data.width * 0.3, -data.height + 23, data.width * 0.38);
        
        // Mid layer
        foliage.fillStyle(0x2a8a3a, 1);
        foliage.fillCircle(0, -data.height + 12, data.width * 0.45);
        foliage.fillCircle(-data.width * 0.25, -data.height + 22, data.width * 0.32);
        foliage.fillCircle(data.width * 0.28, -data.height + 20, data.width * 0.35);
        foliage.fillCircle(0, -data.height - 3, data.width * 0.28);
        
        // Light layer
        foliage.fillStyle(0x4aba4a, 1);
        foliage.fillCircle(0, -data.height + 10, data.width * 0.4);
        foliage.fillCircle(-data.width * 0.2, -data.height + 19, data.width * 0.28);
        foliage.fillCircle(data.width * 0.25, -data.height + 17, data.width * 0.3);
        
        // Highlights
        foliage.fillStyle(0x6ada5a, 1);
        for (let i = 0; i < 6; i++) {
            const hx = (Math.sin(i * 1.3) * 0.3) * data.width;
            const hy = -data.height + 10 + Math.cos(i * 1.7) * 15;
            foliage.fillCircle(hx, hy, 4 + Math.sin(i) * 2);
        }
        
        container.add(foliage);
        
        // Shadow
        const shadow = this.scene.add.ellipse(0, -2, data.width * 1.4, 8, 0x000000, 0.2);
        container.add(shadow);
        
        return container;
    }
    
    createPalmTrees() {
        for (let i = 0; i < 20; i++) {
            const x = 200 + i * 250 + Math.random() * 100;
            const height = 70 + Math.random() * 20;
            
            const palm = this.createPalmTree(x, height);
            palm.setDepth(-55);
            palm.setScrollFactor(0.6, 1);
            this.palmTrees.push({ container: palm, x: x, height: height });
        }
    }
    
    createPalmTree(x, height) {
        const container = this.scene.add.container(x, GameConfig.CANVAS_HEIGHT - 50);
        
        // Simplified trunk - just draw as segments
        const trunk = this.scene.add.graphics();
        trunk.fillStyle(0x6a5040, 1);
        
        // Draw trunk as a series of rectangles that curve
        const segments = 10;
        for (let i = 0; i < segments; i++) {
            const y = -i * (height / segments);
            const nextY = -(i + 1) * (height / segments);
            const curve = Math.sin(i / segments * Math.PI) * 8;
            const nextCurve = Math.sin((i + 1) / segments * Math.PI) * 8;
            
            trunk.fillStyle(0x6a5040, 1);
            trunk.beginPath();
            trunk.moveTo(-4 + curve, y);
            trunk.lineTo(-4 + nextCurve, nextY);
            trunk.lineTo(4 + nextCurve, nextY);
            trunk.lineTo(4 + curve, y);
            trunk.closePath();
            trunk.fillPath();
        }
        
        // Trunk segments
        trunk.fillStyle(0x3a2a1a, 1);
        for (let i = 1; i <= 5; i++) {
            const segY = -height * 0.2 * i;
            const curve = Math.sin((height * 0.2 * i) / height * Math.PI) * 8;
            trunk.fillRect(-2 + curve, segY, 8, 3);
        }
        
        container.add(trunk);
        
        // Palm fronds (using triangular shapes)
        const fronds = this.scene.add.graphics();
        const frondCount = 8;
        
        for (let i = 0; i < frondCount; i++) {
            const angle = (i / frondCount) * Math.PI * 2;
            const frondLen = 30 + Math.sin(i * 2) * 10;
            const color = i % 2 === 0 ? 0x3a8a3a : 0x5aaa4a;
            
            fronds.fillStyle(color, 1);
            fronds.beginPath();
            fronds.moveTo(5, -height);
            
            const endX = 5 + Math.cos(angle) * frondLen;
            const endY = -height + Math.sin(angle) * frondLen * 0.6 - 5;
            
            // Draw as triangle
            fronds.lineTo(endX, endY);
            fronds.lineTo(endX - Math.cos(angle) * 5, endY - Math.sin(angle) * 5);
            fronds.closePath();
            fronds.fillPath();
        }
        
        container.add(fronds);
        
        return container;
    }
    
    createGroundDecorations() {
        const groundY = GameConfig.CANVAS_HEIGHT - 50;
        
        // Bushes
        for (let i = 0; i < 40; i++) {
            const x = 250 + i * 150 + Math.random() * 80;
            const bush = this.createBush(x);
            bush.setDepth(-45);
            bush.setScrollFactor(0.9, 1);
            this.bushes.push(bush);
        }
        
        // Rocks
        for (let i = 0; i < 50; i++) {
            const x = i * 150 + Math.random() * 100;
            const size = 12 + Math.random() * 15;
            const rock = this.createRock(x, size);
            rock.setDepth(-40);
            rock.setScrollFactor(0.9, 1);
            this.rocks.push(rock);
        }
        
        // Flowers
        for (let i = 0; i < 80; i++) {
            const x = i * 70 + Math.random() * 50;
            const flower = this.createFlower(x);
            flower.setDepth(-40);
            flower.setScrollFactor(0.95, 1);
            this.flowers.push(flower);
        }
    }
    
    createBush(x) {
        const container = this.scene.add.container(x, GameConfig.CANVAS_HEIGHT - 50);
        
        const bush = this.scene.add.graphics();
        
        // Dark base
        bush.fillStyle(0x1a5a2a, 1);
        bush.fillCircle(0, -12, 16);
        
        // Mid layer
        bush.fillStyle(0x2a8a3a, 1);
        bush.fillCircle(-6, -14, 10);
        bush.fillCircle(7, -13, 9);
        
        // Top highlight
        bush.fillStyle(0x4aba4a, 1);
        bush.fillCircle(-2, -16, 6);
        
        container.add(bush);
        return container;
    }
    
    createRock(x, size) {
        const container = this.scene.add.container(x, GameConfig.CANVAS_HEIGHT - 50);
        
        const rock = this.scene.add.graphics();
        
        // Main rock
        rock.fillStyle(0x7a7a7a, 1);
        rock.fillEllipse(0, -size * 0.35, size, size * 0.55);
        
        // Highlight
        rock.fillStyle(0x9a9a9a, 1);
        rock.fillEllipse(-size * 0.25, -size * 0.55, size * 0.4, size * 0.25);
        
        // Shadow
        rock.fillStyle(0x5a5a5a, 1);
        rock.fillEllipse(size * 0.3, -size * 0.2, size * 0.3, size * 0.2);
        
        container.add(rock);
        return container;
    }
    
    createFlower(x) {
        const container = this.scene.add.container(x, GameConfig.CANVAS_HEIGHT - 50);
        
        const flower = this.scene.add.graphics();
        
        // Stem
        flower.fillStyle(0x2a8a3a, 1);
        flower.fillRect(-1, -10, 2, 10);
        
        // Random flower color
        const colors = [0xda4a5a, 0xea8aaa, 0xeaca4a, 0xf8f8f0];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        flower.fillStyle(color, 1);
        flower.fillCircle(0, -12, 5);
        
        // Center
        flower.fillStyle(0xeaca4a, 1);
        flower.fillCircle(0, -12, 2);
        
        container.add(flower);
        return container;
    }
    
    update(time) {
        // Animate clouds
        const dt = time / 1000;
        this.clouds.forEach(cloud => {
            const newX = (cloud.baseX + dt * cloud.speed * 10) % (GameConfig.WORLD_WIDTH + 400) - 200;
            cloud.graphics.setPosition(newX, cloud.y);
        });
    }
}
