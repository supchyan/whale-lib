/**
 * Scene class handles general scene methods.
 */
class Scene {
    /**
     * @param {*} parent `HTMLElement` reference. Use something like `document.getElementById()`. 
    *                    It will be used as a container to load/unload scene content.
     */
    constructor(parent) {
        parent.setAttribute("style", `/* modified by whale-lib */
            box-sizing: border-box;
            display: block;

            width: 100%;
            height: 100%;

            flex-grow: 1;

            padding: 0;
            margin: 0;
        `);

        this.parent = parent;
    }

    /**
     * `true` whenever `SceneStorage` is empty.
     */
    isEmpty() {
        return this.parent.innerHTML == "";
    }

    /**
     * Loads scene content by `scenePath` specified.
     * @param {*} scenePath path to scene directory.
     */
    load(scenePath) {
        if (!this.parent) return;

        // remove "/" as a last char if exists
        if (scenePath.endsWith("/")) {
            scenePath = scenePath.substring(0, scenePath.length - 1);
        }

        // load html
        fetch(`${scenePath}/layout.html`).then(res => {
            if (!res.ok) return this.unload();
            
            res.text().then(content => {
                this.parent.innerHTML = content;

                // execute javascript
                fetch(`${scenePath}/main.js`).then(res => {
                    if (!res.ok) return this.unload();

                    res.text().then(code => {
                        eval(code);
                    }).catch(e => {
                        console.error(e);
                    });
                });
            });
        });
    }

    /**
     * Clears scene storage. Doesn't affect evaluating javascript code, 
     * so it have to be stopped from the inside.
     */
    clear() {
        if (!this.parent) {
            return;
        }

        this.parent.innerHTML = "";
    }
    
    /**
     * General update loop. Breaks after scene is being cleared (i.e. has an empty body).
     * @param {*} _void a function to be looped.
     */
    update(_void) {
        if (!this.isEmpty()) {
            _void();
            setTimeout(() => { this.update(_void) }, 1);
        }
    }
}