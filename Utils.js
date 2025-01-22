import Plataforma from './Plataforma.js';

class Utils {

    static staircase(scene, positionX, positionY, height, step = 1, inverted = false) {
        for (let i = 0; i < height; i++) {
            const platform = new Plataforma(scene, 'single_platform', 18, 18);

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
}

export default Utils;