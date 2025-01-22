class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed, type) {
        super(scene, x, y, texture, speed, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);

    
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
                break;
        }
    }

    update() {
        if (this.body.blocked.left || this.body.blocked.right) {
            this.setVelocityX(-this.body.velocity.x);
        }
        if (this.body.blocked.up || this.body.blocked.down) {
            this.setVelocityY(-this.body.velocity.y);
        }
    }
}

export default Enemigo;