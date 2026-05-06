/**
 * Modifies text containers, turning them ***special***.
 * 
 * It's desgined for letter characters, so won't work with emoji.
 */
class TextEngine {
    /**
     * Prepares `textElement` node before being animated via `TextEngine`,
     * by clearing it's innerHTML and applying specified styles to it.
     * @param {*} textElement a `TextElement` reference.
     */
    static #clearNode(textElement) {
        textElement.node.innerHTML = "";
        textElement.node.offsetWidth;
        textElement.node.setAttribute("style", "display: flex; flex-direction: row; white-space: pre;");
    }
    /**
     * Appends a indexed character into a `TextElement` node with an animation specified.
     * @param {*} textElement   a `TextElement` reference.
     * @param {*} index         a character index of a TextElement().text[].
     * @param {*} keyframes     character animation keyframes.
     * @param {*} duration      character animation duraction.
     * @param {*} iterations    character animation interations (Inifinity by default).
     * @param {*} easing        character animation easing function (Linear by default).
     */
    static #addAnimatedChar(
        textElement, index, keyframes, 
        { duration = 0, iterations = Infinity, easing = AnimationManager.TimingFunction.Linear }
    ) {
        const cElement = document.createElement("div");

        const options = { duration, iterations, easing };

        cElement.innerHTML = textElement.text[index];
        cElement.animate(keyframes, options);

        textElement.node.appendChild(cElement);
    }

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
        TextEngine.#clearNode(textElement);

        // fill element node with chars of original text
        // but as independent containers
        for(var i = 0; i < textElement.text.length; i++) {
            // returns a hue value, depending on char index
            function hue(deg) {
                return `hsl(${10 * i + deg},100%,50%)`;
            }
            // returns a translate value, depending on character index
            function translate(value) { // 2*value * PI => 0 ... 2PI
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

            TextEngine.#addAnimatedChar(textElement, i, keyframes, { duration });
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
        TextEngine.#clearNode(textElement);

        // fill element node with chars of original text
        // but as independent containers
        for(var i = 0; i < textElement.text.length; i++) {
            // returns a tremor value, depending on character index
            function tremor(value) { // 2*value * PI => 0 ... 2PI
                var offset = i % 2 ? Math.cos(i + 2*value * Math.PI) :
                                     Math.sin(i + 2*value * Math.PI);

                return `scale(${1 + strength * .2 * offset}) 
                        rotate(${strength * 10 * offset}deg)`;
            }

            const keyframes = [
                { transform: tremor(0.00) },
                { transform: tremor(.125) },
                { transform: tremor(.250) },
                { transform: tremor(.375) },
                { transform: tremor(0.50) },
                { transform: tremor(.625) },
                { transform: tremor(.750) },
                { transform: tremor(.875) },
                { transform: tremor(1.00) },
            ];

            TextEngine.#addAnimatedChar(textElement, i, keyframes, { duration });
        }
    }
    /**
     * Clears text effects.
     * @param {*} textElement a `TextElement` reference. 
     */
    static clear(textElement) {
        textElement.node.innerHTML = textElement.text;
        textElement.node.offsetWidth;
        textElement.node.removeAttribute("style");
    }
}