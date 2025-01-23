class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed, health) {
        super(scene, x, y, texture);
        this.speed = speed;
        this.health = health;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(this.speed); 
    }
    
    createAnimations() {
        this.anims.create({
            key: 'enemy_pig',
            frames: this.anims.generateFrameNumbers('enemy_pig', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
    }

    create() {
        this.createAnimations(); 

    }

    update() {
        if (!this.body) return; 
        if (this.body.blocked.left || this.body.touching.left) {
            this.setVelocityX(this.speed);
            this.flipX = false;
        } else if (this.body.blocked.right || this.body.touching.right) {
            this.setVelocityX(-this.speed);
            this.flipX = true;
        }
    }
}

export default Enemigo;