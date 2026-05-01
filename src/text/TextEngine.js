/**
 * Modifies text containers, turning them ***special***.
 * 
 * It's desgined for letter characters, so won't work with emoji.
 */
class TextEngine {
    /**
     * Turns the text with a ***rainbow***.
     * @param {*} textElement a `TextElement` reference. 
     * 
     * @param {*} duration  an animation duration.
     * @param {*} amplitude an animation wave amplitude.
     * @param {*} period    an animation wave period.
     */
    static rainbowText(textElement, {duration = 1000, amplitude = 0.2, period = 0.5 } = {}) {
        // clean the root
        textElement.node.innerHTML = "";
        textElement.node.offsetWidth;
        textElement.node.setAttribute("style", "display: flex; flex-direction: row; white-space: pre;");

        // fill element node with chars of original text
        // but as independent containers
        for(var i = 0; i < textElement.text.length; i++) {
            // returns a hue value, depending on char index
            function hue(deg) {
                return `hsl(${10 * i + deg},100%,50%)`;
            }
            // returns a translate value, depending on char index
            function translate(value) { // 2 * value * PI => 0 ... 2PI
                return `translateY(${amplitude * Math.cos((1 - period * i) + 2 * value * Math.PI)}rem)`;
            }

            const keyframes = [
                { color: hue(0),   transform: translate(0.00) },
                { color: hue(45),  transform: translate(.125) },
                { color: hue(90),  transform: translate(.250) },
                { color: hue(135), transform: translate(.375) },
                { color: hue(180), transform: translate(0.50) },
                { color: hue(225), transform: translate(.625) },
                { color: hue(270), transform: translate(.750) },
                { color: hue(315), transform: translate(.875) },
                { color: hue(360), transform: translate(1.00) },
            ];

            const options = {
                duration: duration,
                iterations: Infinity,
                easing: AnimationManager.TimingFunction.Linear
            };

            const cElement = document.createElement("div");

            cElement.innerHTML = textElement.text[i];
            cElement.animate(keyframes, options);

            textElement.node.appendChild(cElement);
        }
    }
    /**
     * Turns the text with a ***tremor***.
     * @param {*} textElement a `TextElement` reference. 
     * 
     * @param {*} duration  an animation duration.
     * @param {*} strength  an animation tremor strength.
     */
    static tremorText(textElement, {duration = 80, strength = .4 } = {}) {
        // clean the root
        textElement.node.innerHTML = "";
        textElement.node.offsetWidth;
        textElement.node.setAttribute("style", "display: flex; flex-direction: row; white-space: pre;");

        // fill element node with chars of original text
        // but as independent containers
        for(var i = 0; i < textElement.text.length; i++) {
            // returns a translate value, depending on char index
            function translate(value) { // 2 * value * PI => 0 ... 2PI
                var offset = i % 2 ? Math.cos(i + 2*value * Math.PI) :
                                     Math.sin(i + 2*value * Math.PI);

                return `scale(${1 + strength * .2 * offset}) 
                        rotate(${strength * 10 * offset}deg)`;
            }

            const keyframes = [
                { transform: translate(0.00) },
                { transform: translate(.125) },
                { transform: translate(.250) },
                { transform: translate(.375) },
                { transform: translate(0.50) },
                { transform: translate(.625) },
                { transform: translate(.750) },
                { transform: translate(.875) },
                { transform: translate(1.00) },
            ];

            const options = {
                duration: duration,
                iterations: Infinity,
                easing: AnimationManager.TimingFunction.Linear
            };

            const cElement = document.createElement("div");

            cElement.innerHTML = textElement.text[i];
            cElement.animate(keyframes, options);

            textElement.node.appendChild(cElement);
        }
    }
    /**
     * Clears text effects.
     * @param {*} textElement a `TextElement` reference. 
     */
    static clear(textElement) {
        textElement.node.innerHtml = textElement.text;
        textElement.node.offsetWidth;
    }
}