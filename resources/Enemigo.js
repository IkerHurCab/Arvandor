class Enemigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, speed, health) {
        super(scene, x, y, texture);
        this.speed = speed;
        this.health = health;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(this.speed);
        this.invincible = false;
        this.hitOnce = false;

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

    getHit(damage) {
        if (this.hitOnce) {
            this.scene.time.delayedCall(2000, () => {
                this.hitOnce = false;
            });
            return;
        }

        else {
            this.hitOnce = true;
            this.health -= damage;

            let damageText = this.scene.add.text(this.x, this.y, `-${damage}`, { fontFamily: '"Press Start 2P"', fontSize: '24px', fill: '#ff0000' });
            this.scene.tweens.add({
                targets: damageText,
                y: this.y - 50,
                alpha: 0,
                duration: 1000,
                ease: 'Power1',
                onComplete: () => {
                    damageText.destroy();
                }
            });
            if (this.health <= 0) {
                this.destroy();
            } else {
                this.invincible = true;
                this.scene.time.addEvent({
                    delay: 100,
                    repeat: 15,
                    callback: () => {
                        this.setVisible(!this.visible);
                    }
                });

                this.scene.time.delayedCall(1600, () => {
                    this.invincible = false;
                    this.setVisible(true);
                }, [], this);
            }
        }
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