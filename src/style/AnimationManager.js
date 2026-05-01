/**
 * Class to work with `HTMLElement` animations. 
 * Before loading any animation, you need to create one in your `.css` file,
 * so you can invoke it by name, using the `load()` method.
 * 
 * If you plan to write animations for `ViewportManager`, you need to use it's internal tools.
 * 
 * This class is for `HTMLElement` instances only.
 */
class AnimationManager {
    /**
     * Contains values for `css:animation-timing-function`.
     */
    static TimingFunction = {
        Linear:     "linear",
        EaseInOut:  "ease-in-out",
        EaseIn:     "ease-in",
        EaseOut:    "ease-out",
        cubicBezier(x1 = 0, y1 = 0, x2 = 1, y2 = 1) {
            return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
        }
    }
    /**
     * Contains values for `css:animation-iteration-count`.
     */
    static IterationCount = {
        Infinite: "infinite"
    }
    /**
     * Contains values for `css:animation-fill-mode`.
     */
    static FillMode = {
        Forwards:   "forwards",
        Backwards:  "backwards"
    }
    /**
     * Contains values for `css:animation-direction`.
     */
    static Direction = {
        Normal:     "normal",
        Reverse:    "reverse",
        Alternate:  "alternate"
    }
    /**
     * Invokes the animation on the `element` by properties specified. Replaces existing animation.
     * @param {*} element           `HTMLElement` reference.
     * 
     * @param {*} name              Animation name.
     * @param {*} duration          Animation duration in `ms`.
     * @param {*} delay             Animation delay in `ms`.
     * @param {*} timingFunction    Animation timing function. Use `TimingFunction` field for this.
     * @param {*} iterationCount    Animation interation count. 
     *                              Put a number or use `IterationCount` field to get misc values.
     * @param {*} fillMode          Animation fill mode. Use `FillMode` field for values.
     * @param {*} direction         Animation direction. Use `Direction` field for values.
     */
    static load(element, { 
        name            = "", 
        duration        = 220,
        delay           = 0,
        timingFunction  = this.TimingFunction.EaseInOut, 
        iterationCount  = 1, 
        fillMode        = this.FillMode.Forwards, 
        direction       = this.Direction.Normal
    })
    {
        element.style.animation = "";
        element.offsetWidth;
        element.style.animation = `${name} ${duration}ms ${delay}ms ${timingFunction} ${iterationCount} ${fillMode} ${direction}`;
    }
    /**
     * Unloads specified element animation.
     * @param {*} element `HTMLElement` reference.
     */
    static unload(element) {
        element.style.animation = "";
        element.offsetWidth;
    }
}