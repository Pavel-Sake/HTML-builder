const path = require("path");
const fs = require("fs");



const filePathToFiles = path.join(__dirname, "files");
const filePathToFilesCopy = path.join(__dirname, "files-copy");


function copyDirectory (filePathToFilesCopy, filePathToFiles) {

    const fsPromises = fs.promises;
    fsPromises.mkdir(filePathToFilesCopy, { recursive: true })

    fsPromises.readdir(filePathToFiles, {withFileTypes: true})
        .then((results) => {

            results.forEach((item) => {

                const fileName = item.name;
                const pathFileInput = path.join(`${filePathToFiles}`, `${fileName}`)
                const filePathToOutput = path.join(`${filePathToFilesCopy}`, `${fileName}`);

                fsPromises.copyFile(pathFileInput, filePathToOutput)
            })

        })
        .catch( (error) => {
            console.log(error);
        })
}

copyDirectory (filePathToFilesCopy, filePathToFiles)
