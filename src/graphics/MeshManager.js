/**
 * Manages `Mesh` objects.
 */
class MeshManager {
    /**
     * Returns a new `Mesh` object by `wavefrontData` specified.
     * @param {*} wavefrontData Raw wavefront `.obj` data as string.
     */
    static createMesh(wavefrontData) {
        const vertices  = []; // vertices array
        const edges     = []; // edges array

        const fileLines = wavefrontData.split("\n");

        for (let fileLine of fileLines) {
            // if line is vertex data
            if (fileLine.startsWith("v ")) {
                const coords = fileLine.replace("v ", "").split(" "); // parse vertex coords
                const vertex  = new Vector3(
                    parseFloat(coords[0]), parseFloat(coords[1]), 1 - parseFloat(coords[2])
                );
                vertices.push(vertex);
            }
            if (fileLine.startsWith("l ")) {
                const indexes = fileLine.replace("l ", "").split(" "); // parse edges indexes
                const edge = new Edge(
                    parseInt(indexes[0]) - 1, parseInt(indexes[1]) - 1
                );
                edges.push(edge);
            }
        }

        return new Mesh(vertices, edges);
    }
}