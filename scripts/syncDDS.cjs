const fs = require("fs");
const path = require("path");
const readline = require("readline");

const pathsToProcess = [
  {
    targetPath: "src/Public/Game/GUI/Assets/Tooltips/Icons",
    ddsPath: "src/Icons/dds/abilities",
  },
  {
    targetPath: "src/Public/Game/GUI/Assets/Tooltips/ItemIcons",
    ddsPath: "src/Icons/dds/items",
  },
];

const searchPaths = [
  "src/Public/IllithidImperatus/RootTemplates",
  "src/Public/IllithidImperatus/Stats/Generated/Data",
];

const run = ({ ddsPath, targetPath }) => {
  const ddsFilenames = fs.readdirSync(ddsPath);
  const ddsFilePaths = ddsFilenames.map((f) => `${ddsPath}/${f}`);

  const iconNames = ddsFilenames
    .map((f) => f.split("."))
    .map((fa) => fa.slice(0, fa.length - 1).join(""));

  const iconNameRegexes = iconNames.map((s) => new RegExp(s));

  const filesWithIconRefs = searchPaths
    .map((p) => [p, fs.readdirSync(p)])
    .map(([p, fa]) => fa.map((f) => `${p}/${f}`))
    .flat()
    .filter((f) => /xml|txt/.test(path.extname(f)));

  const getFiles = async () => {
    const iconsToSync = new Set();

    for (const p of filesWithIconRefs) {
      const stream = fs.createReadStream(p);
      const reader = readline.createInterface(stream);
      for await (const line of reader) {
        for (let i = 0; i < iconNameRegexes.length; i++) {
          const regex = iconNameRegexes[i];
          if (regex.test(line)) {
            iconsToSync.add(ddsFilePaths[i]);
          }
        }
      }
    }

    return iconsToSync;
  };

  fs.rmSync(targetPath, { recursive: true, force: true });
  fs.mkdirSync(targetPath, { recursive: true });

  return getFiles().then((fa) =>
    fa.forEach((f) => fs.copyFileSync(f, `${targetPath}/${path.basename(f)}`))
  );
};

(async () => {
  for (const p of pathsToProcess) {
    await run(p);
  }
})();
