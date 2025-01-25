import Enemigo from './Enemigo.js';

class EnemyUtils {
    static pig(scene, x, y) {
        const enemy = new Enemigo(scene, x, y, 'enemy_pig', 50, 2);
        enemy.create();
        enemy.play('enemy_pig');
        enemy.setScale(4);

        scene.enemies_pig.push(enemy);
        scene.platforms.forEach(platform => {
            scene.physics.add.collider(enemy, platform);
        });

        scene.physics.add.collider(scene.main_character, enemy, (main_character, enemyPig) => {
            if (main_character.y < enemyPig.y - 20 && !enemyPig.invincible) {
                main_character.setVelocityY(-scene.speed);
                enemyPig.getHit(1);
            } else if (main_character.y < enemyPig.y - 20 && enemyPig.invincible) {
                main_character.setVelocityY(-scene.speed);
            }
            else if (!scene.invincible && !scene.isDefending) {
                scene.loseLife(1);
            }
        });

        enemy.update = function() {
            if (!this.body) return;
            if (this.body.blocked.left || this.body.touching.left) {
            this.setVelocityX(this.speed);
            this.flipX = false;
            } else if (this.body.blocked.right || this.body.touching.right) {
            this.setVelocityX(-this.speed);
            this.flipX = true;
            }
        };

        scene.events.on('update', enemy.update, enemy);
    }

    static carrot(scene, x, y) {
        const enemy = new Enemigo(scene, x, y, 'enemy_carrot', 0, 3);
        enemy.body.setAllowGravity(false); 
        enemy.body.setImmovable(true);


        enemy.create();
        enemy.play('enemy_carrot');
        enemy.setScale(4);
        
    
        scene.platforms.forEach(platform => {
            scene.physics.add.collider(enemy, platform);
        });

        scene.tweens.add({
            targets: enemy,
            y: y - 250,
            duration: 1250,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        scene.physics.add.collider(scene.main_character, enemy, (main_character, enemyCarrot) => {
            if (main_character.y < enemyCarrot.y - 60 && !enemyCarrot.invincible) {
                main_character.setVelocityY(-scene.speed);
                enemyCarrot.getHit(1);
            } else if (main_character.y < enemyCarrot.y - 20 && enemyCarrot.invincible) {
                main_character.setVelocityY(-scene.speed);
            }
            else if (!scene.invincible && !scene.isDefending) {
                scene.loseLife(1);
            }
        });

        scene.enemies_carrot.push(enemy);
    }


}

export default EnemyUtils;