const Chalk = require("chalk")

function Debug(str) {
    return console.log(str)
}

function DebugString(str, color) {
    if (color == "blue") {
        color = Chalk.default.blue
    }
    if (color == "green") {
        color = Chalk.default.green
    }
    if (color == "red") {
        color = Chalk.default.red
    }
    if (color == "yellow") {
        color = Chalk.default.yellow
    }
    if (color == "cyan") {
        color = Chalk.default.cyan
    }
    if (color == "magenta") {
        color = Chalk.default.magenta
    }
    if (color == "white") {
        color = Chalk.default.white
    }
    if (color == "gray") {
        color = Chalk.default.gray
    }
    if (color == "black") {
        color = Chalk.default.black
    }

    return Debug(color(`[+] ${str}`))
}

module.exports = {
    Debug,
    DebugString
}