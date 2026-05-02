// get node instances
const rainbowTextNode = document.getElementById("rainbowTextNode");
const tremorTextNode = document.getElementById("tremorTextNode");
const clearTextNode = document.getElementById("clearTextNode");

// invoke text engine
TextEngine.rainbowText(
    new TextElement(rainbowTextNode),
    { duration: 750, amplitude: .5, period: .5 }
);

TextEngine.tremorText(
    new TextElement(tremorTextNode),
    { duration: 80, strength: .4 }
);

// check `clear()` behaviour
const clearTextElement = new TextElement(clearTextNode);

TextEngine.rainbowText(
    clearTextElement
);

setTimeout(() => {
    TextEngine.clear(clearTextElement);
}, 4000);