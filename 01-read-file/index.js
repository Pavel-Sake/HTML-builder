const path = require("path");
const fs = require("fs");


const filePath = path.join(__dirname, "text.txt");


const stream = new fs.ReadStream(filePath, {encoding: "utf-8"});

stream.on("readable", () => {
    const data = stream.read()

    if (data !== null) {
        console.log(data)
    }
})

stream.on("end", () => {

});