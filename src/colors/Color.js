/**
 * Contains methods to work with colors.
 */
class Color {
    /** Color object. Define `r` channel only to greyscale the color.
     * @param {*} r Red   color channel `0...255`.
     * @param {*} g Green color channel `0...255`.
     * @param {*} b Blue  color channel `0...255`.
     * @param {*} a Alpha color channel `0...255`.
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        if (r === undefined) {
            this.r = 0;
        }
        if (g === undefined) {
            this.g = this.r;
        }
        if (b === undefined) {
            this.b = this.r;
        }
        if (a === undefined) {
            this.a = 255;
        }
    }
    /**
     * Returns a new `Color` object from a hex color string.
     * 
     *  You can use any of these variations: `#RRGGBB`, `#RRGGBBAA`, `#RGB`, `#RGBA`.
     * 
     * @param {*} hex a HEX color reference.
     */
    static fromHEX(hex) {
        if (hex[0] == "#") {
            hex = hex.substr(1); // remove #
        }

        var r, g, b, a;

        if (hex.length == 3) {
            r = parseInt(`${hex[0]}${hex[0]}`, 16);
            g = parseInt(`${hex[1]}${hex[1]}`, 16);
            b = parseInt(`${hex[2]}${hex[2]}`, 16);
        }

        if (hex.length == 4) {
            r = parseInt(`${hex[0]}${hex[0]}`, 16);
            g = parseInt(`${hex[1]}${hex[1]}`, 16);
            b = parseInt(`${hex[2]}${hex[2]}`, 16);
            a = parseInt(`${hex[3]}${hex[3]}`, 16);
        }

        if (hex.length >= 6) {
            r = parseInt(`${hex[0]}${hex[1]}`, 16);
            g = parseInt(`${hex[2]}${hex[3]}`, 16);
            b = parseInt(`${hex[4]}${hex[5]}`, 16);
        }

        if (hex.length == 8) {
            a = parseInt(`${hex[6]}${hex[7]}`, 16);
        }

        return new Color(r, g, b, a);
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