const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const contentDir = "./docs/content";
const outDir = "./docs";
const inputFiles = fs.readdirSync(contentDir);
const templateData = fs.readFileSync("./docs/template.html", "utf8");

for (const filename of inputFiles) {
  const data = fs.readFileSync(path.join(contentDir, filename));
  const renderedContent = ejs.render(templateData, { content: data });
  fs.writeFileSync(path.join(outDir, filename), renderedContent);
}

console.log("Done!");
