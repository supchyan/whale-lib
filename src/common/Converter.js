class Converter {
    /**
     * Converts anything to a HEX string.
     * @param {*} ref data reference.
     * @returns HEX string.
     */
    static toHEX(ref) {
        return ref.toString(16).padStart(2, "0");
    }
}