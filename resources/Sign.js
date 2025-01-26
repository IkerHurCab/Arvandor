class Sign extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, text) {
        super(scene, x, y, 'sign'); 
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
        this.text = text;
        this.scene = scene; 

        this.overlapAction = false;

        scene.physics.add.overlap(scene.main_character, this, () => {
            this.overlapAction = true;
        }, null, this);

        scene.input.keyboard.on('keydown-ENTER', () => {
            if (this.overlapAction) {
                this.showSignContent();
            }
        });
    }

    showSignContent() {
        let textBox = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, this.text, {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 10 },
            align: 'center'
        }).setOrigin(0.5);

        this.scene.time.delayedCall(3000, () => {
            textBox.destroy();
        });
    }
}

export default Sign;
