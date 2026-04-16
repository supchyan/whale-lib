// this is main script file of the scene.
// use it to invoke code from other `.js` files related to scene directory.

// call a method from scene related `/misc/other_script.js` file.
SceneInvoker.invoke("/misc/other_script.js");

// store scene path upon load
var old_scene = SceneLoader.getCurrentScene();

// offset to play with animations
// in example bounce() loop function
var offset = 0;

// bounce animation example loop
(function bounce() {
    if (SceneLoader.getCurrentScene() == old_scene) {
        document.getElementById("example_element").style.scale = `${1.25 + .1 * Math.sin(.1 * offset)}`;

        offset++;

        // repeat call if scene is still loaded
        // update loops implementation!
        setTimeout(() => { bounce() }, 1);
    }
})();