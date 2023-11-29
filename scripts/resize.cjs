const J = require("jimp");
const fs = require("fs");

const sizeStr = process.argv[2];
const size = parseInt(sizeStr);
const pathToFiles = process.argv[3];
const pathToOutput = process.argv[4];
const filenames = fs.readdirSync(pathToFiles);

(async () => {
  for (const filename of filenames) {
    await J.read(`${pathToFiles}/${filename}`).then((p) =>
      p.resize(size, size).write(`${pathToOutput}/${filename}`)
    );
  }
})();
