const ejs = require("ejs"),
    fs = require("fs");

let templateLocations = __dirname + "/../templates/";

function exportLegacy(str, filename) {
    let path = templateLocations + "/legacy/legacy.ejs";
    let path_css = templateLocations + "/legacy/legacy.css";
    let file = fs.readFileSync(path, "utf-8");
    let file_css = fs.readFileSync(path_css, "utf-8");
    let render = ejs.render(file, {page: {title: "Classic", content: str}});
    console.log(render);
    fs.writeFileSync(filename, render);
    fs.writeFileSync("legacy.css", file_css);
}

module.exports = {
    exportLegacy
};