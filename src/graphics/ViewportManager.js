/**
 * Works with 3D graphics using wavefront objects as a reference.
 * 
 * If you use Blender as editing software 
 * make sure exported `.obj` files have [line elements](https://en.wikipedia.org/wiki/Wavefront_.obj_file#Line_elements).
 * To let Blender properly export your mesh data use `Delete -> 'Only Faces'` in `Edit Mode`.
 * 
 * `ViewportManager` is performant 3D engine, so all of decisions is built following this construct. 
 * There is no animation support or texture draw calls. This engine works with wireframe graphics only,
 * using vanilla [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) methods.
 */
class ViewportManager {
    /**
     * @param {*} ref **DO NOT** create instance manually!
     *                Use `ViewportManager.getInstanceOf(canvasElement)` instead. 
     */
    constructor(ref) {
        if (!ViewportManager.#isUsingFactory) {
            throw new Error("You have to access the class instance using `ViewportManager.instanceOf()`.");
        }

        ref.width  = ref.offsetWidth;
        ref.height = ref.offsetHeight;

        this.rect = new Rect(ref.offsetWidth, ref.offsetHeight);
        this.ctx = ref.getContext("2d");
    }
    
    /**
     * True whenever the class instance can be created.
     */
    static #isUsingFactory = false;

    /**
     * Returns a new instance of `ViewportManager` by a `canvasElement` element specified.
     * 
     * You may call this every time before drawing any objects, using the `ViewportManager` class.
     * @param {*} canvasElement canvas element reference.
     * @returns a new `ViewportManager` object.
     */
    static instanceOf(canvasElement) {
        // enable an instance creation
        ViewportManager.#isUsingFactory = true;
        var vm = new ViewportManager(canvasElement);
        // disable an instance creation
        ViewportManager.#isUsingFactory = false;

        return vm;
    }

    /**
     * Fills canvas with a color specified.
     * @param {*} color preferred canvas color.
     */
    #fillRect(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.rect.w, this.rect.h);
    }

    /**
     * Draws a dot in specified position.
     * @param {*} color preferred dot color.
     * @param {*} position position vector as `Vector2`.
     */
    #drawDot(color, position) {
        const scl = 3; // 3
        this.ctx.fillStyle = color;
        this.ctx.fillRect(position.x - .5 * scl, position.y - .5 * scl, scl, scl);
    }

    /**
     * Draws a line from `beginVector` to `targetVector`.
     * @param {*} color line color.
     * @param {*} beginVector start coords as `Vector2`.
     * @param {*} targetVector destination coords as `Vector2`.
     */
    #drawLine(color, beginVector, targetVector) {
        this.ctx.lineWidth = 3; // 3
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(beginVector.x, beginVector.y);
        this.ctx.lineTo(targetVector.x, targetVector.y);
        this.ctx.stroke();
    }

    /**
     * Maps default `-1..1` wavefront coords to canvas related `0..w`.
     * @param {*} vector a `Vector2` to be mapped.
     * @returns New `Vector2` object.
     */
    #map(vector) {
        return new Vector2(
            ((vector.x + 1) / 2) * this.rect.w,
            (1 - (vector.y + 1) / 2) * this.rect.h
        );
    }

    /**
     * Draws an object with specified flags.
     * @param {*} mesh `Mesh` object. Use `MeshManager.createMesh()`.
     * @param {*} color `Color` object.
     * @param {*} rotation Object rotation vector as `Vector3`.
     * @param {*} position Object position as `Vector2` [centered at (0, 0) by default].
     */
    drawObject(mesh, color, rotation = new Vector3(), position = new Vector2()) {
        const vertices  = mesh.vertices;
        const edges     = mesh.edges;
        const points    = [];
        
        this.ctx.clearRect(0, 0, this.rect.w, this.rect.h); // clears the screen

        for (const vector3 of vertices) {
            var vector2 = vector3.toRotation(rotation).toVector2();     // point projection in local coords
            var point   = this.#map(vector2).add(position);   // point projection in canvas coords

            points.push(point); // add point to a list
        }

        for (let i = 0; i < points.length; i++) {
            // draw a vertex (im not sure if it's needed, maybe not.)
            this.#drawDot(color.toHEX(), points[i]);
        }

        for (let j = 0; j < edges.length; j++) {
            const beginVector   = points[ edges[j].begin ];
            const targetVector  = points[ edges[j].end   ];
            this.#drawLine(color.toHEX(), beginVector, targetVector);
        }
    }
}