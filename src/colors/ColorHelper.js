/**
 * Extension class to work with colors.
 */
class ColorHelper {
    /**
     * Returns a new `Color` object by a hue `value` specified.
     * 
     * @param {*} value hue angle in degrees.
     */
    static byAngle(value) { // 0...360...720...etc. -> 0...255

        // loop angle in between `0...360`
        value -= 360 * Math.floor(value / 360);

        // color definitions
        var r, g, b;

        /**
         * Returns a color channel byte in between `255...0`
         * by a start angle `offset` specified.
         */
        function decreaseFrom(offset) {
            return Math.floor(255 * (1 - ((value - offset) / 60)))
        }
        /**
         * Returns a color channel byte in between `0...255`
         * by a start angle `offset` specified.
         */
        function increaseFrom(offset) {
            return Math.floor(255 * ((value - offset) / 60));
        }

        // check each 60deg interval on a hue circle
        if (value <= 60) {
            r = 255;
            // 0...60 -> 0...60x (60x = 255; x = 255/60 = 4.25)
            g = increaseFrom(0);
            b = 0;
        }
        else if (value > 60 && value < 120) {
            // 60...120 -> 0...60 -> 0...1 -> 1...0 -> 255...0
            r = decreaseFrom(60);
            g = 255;
            b = 0;
        }
        else if (value >= 120 && value < 180) {
            r = 0;
            g = 255;
            // 120...180 -> 0...60 -> 0...1 -> 0...255
            b = increaseFrom(120);
        }
        else if (value >= 180 && value < 240) {
            r = 0;
            // 180...240 -> 0...60 -> 0...1 -> 1...0 -> 255...0
            g = decreaseFrom(180);
            b = 255;
        }
        else if (value >= 240 && value < 300) {
            // 240...300 -> 0...60 -> 0...1 -> 0...255
            r = increaseFrom(240);
            g = 0;
            b = 255;
        }
        else if (value >= 300) {
            r = 255;
            g = 0;
            // 300...360 -> 0...60 -> 0...1 -> 1...0 -> 255...0
            b = decreaseFrom(300);
        }

        return new Color(r, g, b);
    }
}