/**
 * Contains methods to work with colors.
 */
class Color {
    /** Color object. Define `r` channel only to greyscale the color.
     * @param {*} r Red   color channel `0...255`.
     * @param {*} g Green color channel `0...255`.
     * @param {*} b Blue  color channel `0...255`.
     */
    constructor(r, g, b) {
        this.r = r;

        if (g === undefined && b === undefined) {
            this.g = r;
            this.b = r;
        }
        else {
            this.g = g;
            this.b = b;
        }
    }
    toGreyscale() {
        return new Color(Math.floor((this.r + this.g + this.b) / 3));
    }
    toHEX() {
        var r = this.r.toString(16).padStart(2, "0");
        var g = this.g.toString(16).padStart(2, "0");
        var b = this.b.toString(16).padStart(2, "0");

        return `#${r}${g}${b}`;
    }
}