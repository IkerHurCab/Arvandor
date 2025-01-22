class Plataforma {
    constructor(scene, texture, tileWidth, tileHeight) {
        this.scene = scene;
        this.texture = texture;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.platforms = this.scene.physics.add.staticGroup();
    }

    createGrid(startX, startY, rows, cols, scale = 3) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * this.tileWidth * scale;
                const y = startY + row * this.tileHeight * scale;
                const tile = this.platforms.create(x, y, this.texture);
                tile.setScale(scale);
                tile.setOrigin(0, 0);
                tile.refreshBody();
            }
        }
    }

    getPlatforms() {
        return this.platforms;
    }
}

export default Plataforma;
