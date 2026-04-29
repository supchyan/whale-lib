import fs from "fs"
import path from "path"

/**
 * Contains methods to bundle whalelib.
 */
export class LibBuilder {
    /**
     * Bundles whalelib.
     */
    static build() {
        const buildPath     = "./.build";
        const testsPath     = "./tests";
        const srcPath       = "./src";
        const serverPath    = "./src/server";

        const bundleName        = "whalelib.js";
        const serverFileName    = "server.js";

        const testsIncludeFlag  = "-ti";
        const serverIncludeFlag = "-si";

        // file determines a directory have to be skipped
        // during the bundle process
        const skipFileName = ".skip";
        
        // stores content to write into a bundle file
        var buffer = "";

        console.clear();

        if (!fs.existsSync(srcPath)) {
            return console.error("[!!!] ./src/ directory cannot be found. Make sure you run this script under the root directory of the whalelib's repository.\n")
        }

        if (!fs.existsSync(buildPath)) {
            fs.mkdirSync(buildPath);
        }
        else { // remove old files.
            const files = fs.readdirSync(buildPath);

            for (var file of files) {
                try {
                    fs.unlinkSync(`${buildPath}/${file}`);
                    console.log(`Removed the old file: <${file}>`);
                }
                catch(e) {
                    console.log(`Cannot remove the old file: <${file}>. Error Message: ${e.message}`);
                }
            }
        }

        console.log();

        console.log(`Bundling <${bundleName}>`);
        
        console.log();

        /**
         * Recursively check each folder and file in specified directory 
         * to write it's data into a `buffer`.
         * @param {*} recursePath have to be a `srcPath` directory at the beginning.
         */
        (function writeBuffer(recursePath) {
            if (fs.lstatSync(recursePath).isDirectory()) {
                var items = fs.readdirSync(recursePath);

                if (!items.includes(skipFileName)) {
                    items.forEach(item => {
                        writeBuffer(`${recursePath}/${item}`);
                    });
                }

                return;
            }
            
            buffer += `${fs.readFileSync(recursePath)}\n`;
            console.log(recursePath);
        })(srcPath);

        console.log();

        const bundleDest    = `${buildPath}/${bundleName}`;
        const serverDest    = `${buildPath}/${serverFileName}`;
        
        fs.writeFileSync(bundleDest, buffer);

        if (fs.existsSync(bundleDest)) {
            console.log(`Bundle saved to ${path.resolve(bundleDest)}`);
        }

        // clone server.js file to a build directory
        if (process.argv.includes(serverIncludeFlag)) {
            fs.copyFileSync(`${serverPath}/${serverFileName}`, serverDest);
        }

        if (fs.existsSync(serverDest)) {
            console.log(`Server saved to ${path.resolve(serverDest)}`);
        }
        
        console.log();

        // clone .build files into tests directory
        if (process.argv.includes(testsIncludeFlag) && fs.existsSync(testsPath)) {
            const files = fs.readdirSync(buildPath);

            files.forEach(file => {
                console.log(`Attempting to clone <${file}> into ${path.resolve(testsPath)}`);
                fs.copyFileSync(`${buildPath}/${file}`, `${testsPath}/${file}`);
            });
        }

        console.log();
    }
}