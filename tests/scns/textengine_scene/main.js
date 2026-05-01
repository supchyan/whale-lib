// get node instances
const rainbowTextNode = document.getElementById("rainbowTextNode");
const tremorTextNode = document.getElementById("tremorTextNode");

// invoke text engine
TextEngine.rainbowText(
    new TextElement(rainbowTextNode), // use `TextElement` instance
    { duration: 750, amplitude: .5, period: .5 }
);

TextEngine.tremorText(
    new TextElement(tremorTextNode)
);