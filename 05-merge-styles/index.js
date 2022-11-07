const path = require("path");
const fs = require("fs");

const bundle = "bundle.css";
const fsPromises = fs.promises

const pathToProjectDist = path.join(__dirname, "project-dist");
const pathToStyles = path.join(__dirname, "styles");
const filePathToBundle = path.join(__dirname, "project-dist", `${bundle}`);


function createAndMergeFile(fileStyles, pathToStyles) {
    fs.open(`${fileStyles}`, "a+", (err) => {
        if(err) throw err;
    });

    const writable = fs.createWriteStream(fileStyles)


    fsPromises.readdir(pathToStyles)
        .then((results) => {

            results.forEach((item) => {

                const pathToFile = path.join(__dirname, "styles", `${item}`);
                const ext = path.parse(pathToFile).ext;

                if (ext === ".css") {

                    const reader = fs.createReadStream(`${pathToFile}`, {encoding: "utf-8"});
                    reader.on('data', function (chunk) {

                        writable.write(chunk)
                    });

                    reader.on("end", () => {

                    });
                }
            })
        })
}


createAndMergeFile(filePathToBundle, pathToStyles)
