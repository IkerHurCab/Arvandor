class Bomba extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bomb');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.create();
        this.play('bomb_anim');
        this.scene = scene;
    }

    create() {
        this.anims.create({
            key: 'bomb_anim',
            frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: 0
        });
    }

    explode() {
        const radius = 150;
        const toDestroy = [];

        this.scene.platforms.forEach(platform => {
            platform.getChildren().forEach(child => {
                if (child.texture.key === 'single_cracked_stone') {
                    const dist = Phaser.Math.Distance.Between(this.x, this.y, child.x, child.y);
                    if (dist <= radius) {
                        toDestroy.push(child);
                    }
                }
                else if (child.texture.key === 'single_stone') {
                    const dist = Phaser.Math.Distance.Between(this.x, this.y, child.x, child.y);
                    if (dist <= radius) {
                        child.setTexture('single_cracked_stone');
                    }
                }
            });
        });

        toDestroy.forEach(child => child.destroy());
        this.destroy();
    }

    static throw(scene) {
        const bomba = new Bomba(scene, scene.main_character.x, scene.main_character.y).setScale(2);
        scene.physics.add.collider(bomba, scene.platforms, () => {
        });

        scene.time.delayedCall(2000, function() {
            bomba.explode(scene);
        }, [], scene);
    }
}

export default Bomba;