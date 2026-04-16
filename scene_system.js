/**
 * Contains methods related to system features of the lib, such as scene layout initialization.
 */
class SceneSystem {
    /**
     * Initializes `index.html` modifying styles for working with whale-lib.
     */
    static init() {
        document.body.setAttribute("style", `/* modified by whale-lib */
            padding: 0;
            margin: 0;
        `);

        if (document.getElementsByTagName("root").length == 0) {
            const root = document.createElement("root");
            root.setAttribute("style", `/* modified by whale-lib */
                box-sizing: border-box;
                display: block;
                background-color: black;

                width: 100vw;
                height: 100vh;

                overflow: hidden;

                padding: 0;
                margin: 0;
            `);

            document.body.appendChild(root);
        }
    }
}