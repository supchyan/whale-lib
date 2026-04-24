class Edge {
    /**
     * 
     * @param {*} begin Start index of a vertex 
     * pointing to the verticies array instance of the `Mesh` object.
     * @param {*} end End index of a vertex 
     * pointing to the verticies array instance of the `Mesh` object.
     */
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;
    }
}