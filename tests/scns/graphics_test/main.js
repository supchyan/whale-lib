const viewport = document.getElementById("viewport");
const vmanager = new ViewportManager(viewport);

var t = 0;
var mesh;

Tools.readFile("./scns/graphics_test/res/cube.obj", FileType.text()).then(wavefrontData => {
    mesh = MeshManager.createMesh(wavefrontData);
});

(function update() {
    if (!otherContainer.isEmpty()) { // from `index.html` definitions
        if (mesh) {
            var offset = 0.05 * t++;

            vmanager.drawObject(mesh, ColorHelper.byAngle(30 * offset).toGreyscale(), 
                new Vector3(0, offset, offset), 
                Vector2.Zero
            );
        }
        setTimeout(() => { update(); }, 1);
    }
})();