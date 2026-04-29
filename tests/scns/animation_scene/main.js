const element = document.getElementById("element");

AnimationManager.load(element, { 
    name:           "testAnimation", 
    duration:       500,
    fillMode:       AnimationManager.FillMode.Forwards, // doesn't do anything here
    iterationCount: AnimationManager.IterationCount.Infinite,
    timingFunction: AnimationManager.TimingFunction.cubicBezier(0, -3, 1, 4),
    direction:      AnimationManager.Direction.Alternate
});
// just testing the hex color parsing here
console.info(Color.fromHEX("#f10f"));