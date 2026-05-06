/**
 * Useful methods in addiction to the `Math` class.
 */
class MathHelper {
    /**
     * Converts radians angle to a degrees one.
     * @param {*} rad angle value.
     * @returns angle in degrees.
     */
    static toDegrees(rad) {
        return (180 / this.PI) * rad;
    }
    /**
     * Converts degrees angle to a radians one.
     * @param {*} deg angle value.
     * @returns angle in radians.
     */
    static toRadians(deg) {
        return (this.PI / 180) * deg;
    }
    /**
     * Emulates FNA's `Vector2.Lerp()`, but for numeric values.
     * Put this in update method to make smooth transition 
     * between `from` and `to` values with a `weight` specified.
     */
    static Lerp(from, to, weight) {
        return from + (to - from) * weight;
    }
}