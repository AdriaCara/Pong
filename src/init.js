import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/scene_play.js";

const config = {
    width: 1000,
    height: 500,
    parent: "container",
    physics: {
        default: "arcade"
    },
    scene: [
        Bootloader, Scene_play
    ]
}

new Phaser.Game(config);