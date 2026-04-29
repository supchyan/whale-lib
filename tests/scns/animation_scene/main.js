const element = document.getElementById("element");

AnimationManager.load(element, { 
    name:           "testAnimation", 
    duration:       500,
    fillMode:       AnimationManager.FillMode.Forwards, // doesn't do anything here
    iterationCount: AnimationManager.IterationCount.Infinite,
    timingFunction: AnimationManager.TimingFunction.cubicBezier(0, -3, 1, 4),
    direction:      AnimationManager.Direction.Alternate
});

setTimeout(() => { // replace animation after some time
    AnimationManager.load(element, { 
        name:           "testAnimation2", 
        duration:       500,
        iterationCount: AnimationManager.IterationCount.Infinite,
        timingFunction: AnimationManager.TimingFunction.cubicBezier(.25, 0, .25, 1),
        direction:      AnimationManager.Direction.Alternate
    });
}, 3000);

// just testing the hex color parsing here
console.info(Color.fromHEX("#f10f"));