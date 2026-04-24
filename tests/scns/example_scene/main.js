// this is main script file of the scene.
// use it to invoke code from other `.js` files related to scene directory.

// offset to play with animations
// in update() function
var offset = 0;

// evaluate additional `.js` file.
Tools.eval("./scns/example_scene/src/text_replacer.js");

exampleScene.update(() => { // reference to a scene instance
    document.getElementById("exampleElement").style.scale = `${1.25 + .1 * Math.sin(.1 * offset++)}`;
    console.debug(`Invoked at: ${Date.now()}`);
});