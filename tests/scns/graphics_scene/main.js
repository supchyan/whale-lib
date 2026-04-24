const viewport = document.getElementById("viewport");
const vmanager = new ViewportManager(viewport);

var t = 0;
var mesh;

Tools.readFile("./scns/graphics_scene/res/cube.obj", FileType.Text).then(wavefrontData => {
    mesh = MeshManager.createMesh(wavefrontData);
});

graphicsScene.update(() => { // reference to a scene instance
    if (mesh) {
        var offset = 0.05 * t++;
        vmanager.drawObject(mesh, ColorHelper.byAngle(30 * offset).toGreyscale(), 
            new Vector3(0, offset, 0), 
            Vector2.Zero
        );
    }
});