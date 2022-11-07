const path = require("path");
const fs = require("fs");


const fsPromises = fs.promises;

const  projectDist = path.join(__dirname, " project-dist");

const styleFileName = "style.css";

const filePathToStyle = path.join(__dirname, "project-dist", `${styleFileName}`);
const pathToStyles = path.join(__dirname, "styles");

const pathToHtml = path.join(__dirname, "components")

const html = [];



const filePathToFilesCopy = path.join(__dirname, "project-dist");
fsPromises.mkdir(filePathToFilesCopy, { recursive: true })



const pathToDirectory = path.join(__dirname, "assets")
const pathToDirectoryAssets = path.join(__dirname, "project-dist", "assets")




function copyDirectory (filePathToFilesCopy, filePathToFiles) {

    const fsPromises = fs.promises;
    // fsPromises.mkdir(filePathToFilesCopy, { recursive: true })

    fsPromises.readdir(filePathToFiles, {withFileTypes: true})
        .then((results) => {

            results.forEach((item) => {

                const fileName = item.name;
                const pathFileInput = path.join(`${filePathToFiles}`, `${fileName}`)
                const filePathToOutput = path.join(`${filePathToFilesCopy}`, `${fileName}`);

                fsPromises.copyFile(pathFileInput, filePathToOutput)
                    .then((res) => {
                    })

            })

        })
        .catch( (error) => {
            console.log(error);
        })
}

function copy() {
    fsPromises.mkdir(pathToDirectoryAssets, { recursive: true })
        .then()

    fsPromises.readdir(pathToDirectory)
        .then((results) => {

            results.forEach((item) => {
                const directoryName = item;
                const filePathToFiles = path.join(__dirname, "assets", `${directoryName}`);
                const pathToDirectory = path.join(__dirname, "project-dist", "assets", `${directoryName}`)

                fsPromises.mkdir(pathToDirectory, { recursive: true })
                    .then()

                copyDirectory(pathToDirectory, filePathToFiles)
            })
        })
        .catch( (error) => {
            console.log(error);
        })

}

copy()


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

createAndMergeFile(filePathToStyle, pathToStyles)



function storeHtml() {
    fsPromises.readdir(pathToHtml)
        .then((results) => {

            results.forEach((item, index) => {
                const pathToFile = path.join(`${pathToHtml}`, `${item}`);
                const name = path.parse(pathToFile).name;
                const ext = path.parse(pathToFile).ext;

                if (".html") {
                    const reader = fs.createReadStream(`${pathToFile}`, {encoding: "utf-8"});
                    reader.on('data', function (chunk) {

                        const data = chunk

                        html.push({
                            name: name,
                            text: data
                        })

                    });

                    reader.on("end", () => {

                        if (results.length === index + 1) {
                            creatNewHtml()
                        }
                    });

                }
            })

        })

}

storeHtml()

const targetHtml = path.join(__dirname, "template.html")

const finishHtml = path.join(__dirname, "project-dist", "index.html")

function creatNewHtml() {
    fs.open(`${finishHtml}`, "a+", (err) => {
        if(err) throw err;
    });

    const writable = fs.createWriteStream(finishHtml)

    const reader = fs.createReadStream(`${targetHtml}`, {encoding: "utf-8"});
    reader.on('data', function (chunk) {

        html.forEach((item) => {

            switch (item.name) {
                case "header":
                    chunk = chunk.replace(/\{\{header\}\}/, `${item.text}`);
                    break;
                case "footer":
                    chunk = chunk.replace(/\{\{footer\}\}/, `${item.text}`);
                    break;
                case "articles":
                    chunk = chunk.replace(/\{\{articles\}\}/, `${item.text}`);
                    break;
            }
        })

        writable.write(chunk)

    });
}










