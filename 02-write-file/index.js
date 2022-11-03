const path = require("path");
const fs = require("fs");
const process = require('process');

const filePath = path.join(__dirname, "text.txt");
const writable = fs.createWriteStream(filePath)


process.stdout.write("Hello")

const initialString = "Hello dear friend! You can write some text.\n"
const finishString = "Goodbye dear friend!"

process.stdout.write(initialString)

process.stdin.on("data", (chunk) => {
    const chunkString = chunk.toString()

    if (chunkString.match("exit")) {

        process.stdout.write(finishString)
        process.exit()
    }

    writable.write(chunk)
})


