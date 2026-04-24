class Converter {
    /**
     * Converts string to a [utf-8] HEX string.
     * @param {*} ref a string reference.
     * @returns a [utf-8] HEX string.
     */
    static toHEX(ref) {
        return ref.split("")
            .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
    }
}