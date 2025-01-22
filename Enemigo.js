class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed, type) {
        super(scene, x, y, texture);
        this.speed = speed;
        this.type = type;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }
    
    createAnimations() {
        this.anims.create({
            key: 'enemy_pig_anim',
            frames: this.anims.generateFrameNumbers('enemy_pig_walk', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
    }

    create() {
        this.createAnimations(); 

        switch (this.type) {
            case 'pig':
                this.setTexture('enemy_pig_walk');
                this.play('enemy_pig_anim');
                this.setVelocityX(this.speed);
                break;
        }
    }

    update() {
        if (this.body.blocked.left || this.body.touching.left) {
            this.setVelocityX(this.speed);
        } else if (this.body.blocked.right || this.body.touching.right) {
            this.setVelocityX(-this.speed);
        }

    }
}

export default Enemigo;