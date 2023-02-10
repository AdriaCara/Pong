import Palletes from "../gameObjects/palletes.js";

export default class Scene_play extends Phaser.Scene {
    velocity = 300;
    score_left = 0;
    score_right = 0;
    constructor() {
        super({key: "Scene_play", active: true});
    }
    create() {
        const center_width = this.sys.game.config.width/2;
        const center_height = this.sys.game.config.height/2;

        this.add.image(center_width, center_height, "separator");
        this.scoreTextLeft = this.add.text(center_width/2, center_height/30, 'score: ' + this.score_left, { fontsize: '32px', fill: '#fff' });
        this.scoreTextRight = this.add.text(center_width*1.5, center_height/30, 'score: ' + this.score_right, { fontsize: '32px', fill: '#fff' });

        //this.left_pallete = this.add.image(center_width/30, center_height, "left_pallete");
        //this.right_pallete = this.add.image(((center_width*2)/1.015), center_height, "right_pallete");
        this.left_pallete = new Palletes(this, center_width/30, center_height, "left_pallete");
        this.right_pallete = new Palletes(this, ((center_width*2)/1.015), center_height, "right_pallete");
        this.left_pallete.setScale(2);
        this.right_pallete.setScale(2);
        this.ball = this.physics.add.image(center_width, center_height, "ball");

        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-300);
        this.ball.setScale(2);

        this.physics.add.collider(this.ball, this.left_pallete, this.palleteHit, null, this);
        this.physics.add.collider(this.ball, this.right_pallete, this.palleteHit, null, this);
        
        this.cursor = this.input.keyboard.createCursorKeys();

        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update() {
        if (this.ball.x < 0) {
            this.score_right ++;
            this.scoreTextRight.setText('score: ' + this.score_right);
        } else if(this.ball.x > this.sys.game.config.width) {
            this.score_left ++;
            this.scoreTextLeft.setText('score: ' + this.score_left);
        }
        if (this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
            this.ball.setVelocityY(0);
            this.velocity = 300,
            this.ball.setVelocityX(this.velocity);
        }

        if (this.cursor.down.isDown) {
            this.right_pallete.body.setVelocityY(this.right_pallete.velocity);
        } else if (this.cursor.up.isDown) {
            this.right_pallete.body.setVelocityY(this.right_pallete.velocity*-1)
        } else {
            this.right_pallete.body.setVelocityY(0);
        }

        if (this.cursor_S.isDown) {
            this.left_pallete.body.setVelocityY(this.left_pallete.velocity);
        } else if (this.cursor_W.isDown) {
            this.left_pallete.body.setVelocityY(this.left_pallete.velocity*-1);
        } else {
            this.left_pallete.body.setVelocityY(0);
        }
    }
    palleteHit() {
        this.ball.setVelocityY(Phaser.Math.Between(-300, 300));
        if (this.velocity>0) {
            if (this.velocity<800) {
                this.velocity += this.velocity/100
            }
        } else {
            if (this.velocity>-800) {
                this.velocity -= (this.velocity*-1)/100;
            }
        }
        this.velocity*=-1;
        this.ball.setVelocityX(this.velocity);
    }
}