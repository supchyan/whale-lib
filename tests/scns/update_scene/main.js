// this is main script file of the scene.
// use it to invoke code from other `.js` files related to scene directory.

// offset to play with animations
// in update() function
var offset = 0;

// evaluate additional `.js` file.
Tools.eval("./scns/update_scene/src/text_replacer.js");

// get mouse coords
var mouseCoords = new Vector2(0, 0);
document.onpointermove = (ev) => {
    mouseCoords.x = ev.clientX;
    mouseCoords.y = ev.clientY;
}

// circles to follow the cursor
var circleElementVanilla = document.getElementById("circleElementVanilla");
var circleElementLerp = document.getElementById("circleElementLerp");
var circleElementInstant = document.getElementById("circleElementInstant");

// parse top/left style values as x,y coords and return them in vector object
function parseCoords(element) {
    var top  = getComputedStyle(element).top.replace("px","");
    var left = getComputedStyle(element).left.replace("px","");

    return new Vector2(parseFloat(left), parseFloat(top));
}

Scene.get("updateScene").update(() => {
    document.getElementById("updateElement").style.scale = `${1.25 + .1 * Math.sin(.1 * offset++)}`;
    console.debug(`Invoked at: ${Date.now()}`);

    // vector2 lerp test using mathhelper
    var circleLerpCoords = parseCoords(circleElementLerp);
    
    circleLerpCoords.x = MathHelper.Lerp(circleLerpCoords.x, mouseCoords.x, .06);
    circleLerpCoords.y = MathHelper.Lerp(circleLerpCoords.y, mouseCoords.y, .06);

    circleElementLerp.style.left = `${circleLerpCoords.x}px`;
    circleElementLerp.style.top  = `${circleLerpCoords.y}px`;
    // ---

    // vanilla lerp test with a `transition` style in css applied
    circleElementVanilla.style.left = `${mouseCoords.x}px`;
    circleElementVanilla.style.top  = `${mouseCoords.y}px`;
    // ---

    // instant test, just follows the mouse instantly
    circleElementInstant.style.left = `${mouseCoords.x}px`;
    circleElementInstant.style.top  = `${mouseCoords.y}px`;
    // ---
});