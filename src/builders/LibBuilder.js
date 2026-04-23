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
        const commonPath    = "./src/common";

        const bundleName = "whalelib.js";
        const testsIncludeFlag = "-ti";
        // file determines a directory have to be skipped
        // during the bundle process
        const skipFileName = ".skip";
        
        // stores content to write into a bundle file
        var buffer = "";

        console.clear();

        console.log(`Bundling ${bundleName}\n`);

        if (!fs.existsSync(srcPath)) {
            return console.error("[!!!] Source directory cannot be found. Make sure you run this script under root directory of the whalelib's source.\n")
        }

        if (!fs.existsSync(buildPath)) {
            fs.mkdirSync(buildPath);
        }

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

        const destination       = `${buildPath}/${bundleName}`;
        const cloneDestination  = `${testsPath}/${bundleName}`;
        
        fs.writeFileSync(destination, buffer);

        if (fs.existsSync(destination)) {
            console.log(`Bundle saved to ${path.resolve(destination)}`);
        }

        if (process.argv.includes(testsIncludeFlag) && fs.existsSync(testsPath)) {
            fs.copyFileSync(destination, cloneDestination);

            if (fs.existsSync(cloneDestination)) {
                console.log(`Bundle saved to ${path.resolve(cloneDestination)} [${testsIncludeFlag}]`);
            }
        }
    }
}