import Plataforma from './Plataforma.js';

class Utils {

    static staircase(scene, texture, positionX, positionY, height, step = 1, inverted = false) {
        for (let i = 0; i < height; i++) {
            const platform = new Plataforma(scene, texture, 18, 18);

            if (!inverted)
                platform.createGrid(500 + 54 * positionX + 54 * i * step, window.innerHeight - 54 * positionY - (54 * i), 1, height * step - i * step);

            else
                platform.createGrid(500 + 54 * positionX + 54 * step, window.innerHeight - 54 * positionY - (54 * i), 1, height * step - i * step);
            scene.platforms.push(platform.getPlatforms());
        }
    }

    static line(scene, positionX, positionY, length, horizontal = false) {
        const platform = new Plataforma(scene, 'single_platform', 18, 18);
        if (horizontal) {
            platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * positionY, 1, length, 3);
        } else {
            platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * positionY, length, 1, 3);
        }
        scene.platforms.push(platform.getPlatforms());
    }

    static rectangle(scene, texture, positionX, positionY, width, height) {
        const platform = new Plataforma(scene, texture, 18, 18);
        platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * positionY, width, height, 3);
        scene.platforms.push(platform.getPlatforms());
    }

    static unfilledRectangle(scene, texture, positionX, positionY, width, height) {
        const platform = new Plataforma(scene, texture, 18, 18);

        platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * positionY, 1, width, 3);
        platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * (positionY - height + 1), 1, width, 3);
        platform.createGrid(500 + 54 * positionX, window.innerHeight - 54 * positionY, height, 1, 3);
        platform.createGrid(500 + 54 * (positionX + width - 1), window.innerHeight - 54 * positionY, height, 1, 3);
        scene.platforms.push(platform.getPlatforms());
    }

    static grass(scene, positionX, positionY, height, width) {
        const platform = new Plataforma(scene, 'single_grass_middle', 18, 18);
        const platformIni = new Plataforma(scene, 'single_grass_left', 18, 18);
        const platformEnd = new Plataforma(scene, 'single_grass_right', 18, 18);

        for (let i = 0; i < height; i++) {
            if (i == height - 1) {
                platformIni.createGrid(500 + 54 * positionX, window.innerHeight - 54 * (positionY + i), 1, 1, 3);
                platform.createGrid(500 + 54 * (positionX + 1), window.innerHeight - 54 * (positionY + i), 1, width - 2, 3);
                platformEnd.createGrid(500 + 54 * (positionX + width - 1), window.innerHeight - 54 * (positionY + i), 1, 1, 3);
            } else {
                const platformDirt = new Plataforma(scene, 'single_dirt_middle', 18, 18);
                const platformIni = new Plataforma(scene, 'single_dirt_left', 18, 18);
                const platformEnd = new Plataforma(scene, 'single_dirt_right', 18, 18);
                platformIni.createGrid(500 + 54 * positionX, window.innerHeight - 54 * (positionY + i), 1, 1, 3);
                platformDirt.createGrid(500 + 54 * (positionX + 1), window.innerHeight - 54 * (positionY + i), 1, width - 2, 3);
                platformEnd.createGrid(500 + 54 * (positionX + width - 1), window.innerHeight - 54 * (positionY + i), 1, 1, 3);
                scene.platforms.push(platformDirt.getPlatforms());
                scene.platforms.push(platformIni.getPlatforms());
                scene.platforms.push(platformEnd.getPlatforms());
            }
        }

        scene.platforms.push(platform.getPlatforms());
        scene.platforms.push(platformIni.getPlatforms());
        scene.platforms.push(platformEnd.getPlatforms());
    }

    static lava(scene, positionX, positionY, height, width, group = scene.lavaGroup) {
        const platformTop = new Plataforma(scene, 'single_lava_top', 18, 18);
        const platformMiddle = new Plataforma(scene, 'single_lava_middle', 18, 18);

        for (let i = 0; i < height; i++) {
            if (i == height - 1) {
                platformTop.createGrid(500 + 54 * positionX, window.innerHeight - 54 * (positionY + i), 1, width, 3);
                group.addMultiple(platformTop.getPlatforms().getChildren());
            } else {
                platformMiddle.createGrid(500 + 54 * positionX, window.innerHeight - 54 * (positionY + i), 1, width, 3);
                group.addMultiple(platformMiddle.getPlatforms().getChildren());
            }
        }

        scene.anims.create({
            key: 'lava_top_anim',
            frames: scene.anims.generateFrameNumbers('single_lava_top', { start: 0, end: -1 }),
            frameRate: 1,
            repeat: -1
        });

        scene.anims.create({
            key: 'lava_middle_anim',
            frames: scene.anims.generateFrameNumbers('single_lava_middle', { start: 0, end: -1 }),
            frameRate: 1,
            repeat: -1
        });

        group.children.iterate(child => {
            if (child.texture.key === 'single_lava_top') {
                child.play('lava_top_anim');
            } else if (child.texture.key === 'single_lava_middle') {
                child.play('lava_middle_anim');
            }
        });
    }
    
}

export default Utils;