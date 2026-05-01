/**
 * Text element structure.
 */
class TextElement {
    constructor(ref) {
        this.text = ref.innerHTML;
        this.node = ref;
    }
}