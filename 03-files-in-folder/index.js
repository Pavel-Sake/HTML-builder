const path = require("path");
const fs = require("fs");


const fsPromises = fs.promises;
const stat = fs.stat;


const filePath = path.join(__dirname, "secret-folder");

const results = [];

fsPromises.readdir(filePath, {withFileTypes: true})
    .then(function (result) {

        result.forEach((item) => {
            const isDirectory = item.isDirectory()

            if (!isDirectory) {
                const pathToFile = path.join(__dirname, "secret-folder", `${item.name}`);
                const name = path.parse(pathToFile).name;
                const ext = path.parse(pathToFile).ext;

                let fileInfo = null;

                stat(pathToFile, (err, stats) => {

                    if (err) {
                        throw err
                    }
                    const size = `${stats.size / 1000}kb`
                     fileInfo = `${name} - ${ext} - ${size}`;
                    results.push(fileInfo)
                    console.log(results)
                } )
            }
        })
    })
    .catch(function (error) {
        console.log(error);
    })


