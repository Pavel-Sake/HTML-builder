const path = require("path");
const fs = require("fs");

const fsPromises = fs.promises

const filePathToFiles = path.join(__dirname, "files");
const filePathToFilesCopy = path.join(__dirname, "files-copy");

fsPromises.mkdir(filePathToFilesCopy, { recursive: true })

fsPromises.readdir(filePathToFiles, {withFileTypes: true})
    .then((results) => {

        const pathFile = path.join(__dirname, "files", ``)

        results.forEach((item) => {

            const fileName = item.name;
            const pathFileInput = path.join(__dirname, "files", `${fileName}`)
            const filePathToOutput = path.join(__dirname, "files-copy", `${fileName}`);

             fsPromises.copyFile(pathFileInput, filePathToOutput)
        })

    })
    .catch( (error) => {
        console.log(error);
    })
