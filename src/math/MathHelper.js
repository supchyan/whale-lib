/**
 * Extends `Math` class providing more useful methods to work with.
 */
class MathHelper {
    /**
     * Converts radians angle to a degrees one.
     * @param {*} rad angle value.
     * @returns angle in degrees.
     */
    static toDegrees(rad) {
        return (180 / Math.PI) * rad;
    }
    /**
     * Converts degrees angle to a radians one.
     * @param {*} deg angle value.
     * @returns angle in radians.
     */
    static toRadians(deg) {
        return (Math.PI / 180) * deg;
    }
}