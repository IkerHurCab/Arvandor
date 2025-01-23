class Moneda extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(3);
        this.body.setAllowGravity(false);
        this.create();
    }

    create() {
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
        });
    }

    static moneda(scene, x, y) {
        const coin = new Moneda(scene, 500 + (x + 0.5) * 54, window.innerHeight - 54 * (y + 0.5));
        coin.body.allowGravity = false;
        coin.play('coin');
        scene.coins.push(coin);
    }
}

export default Moneda;