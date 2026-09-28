const fs = require("fs");
const path = require("path");

const directory = process.argv[2];

if (!directory) {
    console.log("Please provide a directory path.");
    process.exit(1);
}

function readDirectory(dir) {

    let files;

    try {
        files = fs.readdirSync(dir, { withFileTypes: true });
    } catch (error) {
        console.log(`Error reading directory: ${dir}`);
        return;
    }

    for (const file of files) {

        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {

            readDirectory(fullPath);

        } else {

            const extension = path.extname(file.name);

            if (extension === ".js" || extension === ".ts") {

                try {

                    const content = fs.readFileSync(fullPath, "utf8");

                    const lines = content.split("\n").length;

                    console.log(`${fullPath} - ${lines} lines`);

                } catch (error) {

                    console.log(`Error reading file: ${fullPath}`);
                }
            }
        }
    }
}

readDirectory(directory);