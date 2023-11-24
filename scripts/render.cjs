const fs = require("fs");
const ejs = require("ejs");

const inputFiles = [
  ["mainItems", "src/Public/RingOfTheUlitharid/RootTemplates/main_items.xml"],
  [
    "mindFlayerModels",
    "src/Public/RingOfTheUlitharid/RootTemplates/mind_flayer_models.xml",
  ],
  [
    "portalShards",
    "src/Public/RingOfTheUlitharid/RootTemplates/portal_shards.xml",
  ],
  [
    "gravityStones",
    "src/Public/RingOfTheUlitharid/RootTemplates/gravity_stones.xml",
  ],
  [
    "resonanceStones",
    "src/Public/RingOfTheUlitharid/RootTemplates/resonance_stones.xml",
  ],
  [
    "commonWeapons",
    "src/Public/RingOfTheUlitharid/RootTemplates/common_weapons.xml",
  ],
  ["furniture", "src/Public/RingOfTheUlitharid/RootTemplates/furniture.xml"],
  ["grenades", "src/Public/RingOfTheUlitharid/RootTemplates/grenades.xml"],
  ["spells", "src/Public/RingOfTheUlitharid/RootTemplates/spells.xml"],
  ["thralls", "src/Public/RingOfTheUlitharid/RootTemplates/thralls.xml"],
  ["weaponOils", "src/Public/RingOfTheUlitharid/RootTemplates/weapon_oils.xml"],
];
const template =
  "src/Public/RingOfTheUlitharid/RootTemplates/_merged.lsx.template";
const outputFile = "src/Public/RingOfTheUlitharid/RootTemplates/_merged.lsx";

const dataStore = {};

for (const t of inputFiles) {
  const [key, path] = t;
  const inputData = fs.readFileSync(path, "utf8");
  dataStore[key] = inputData;
}

const templateData = fs.readFileSync(template, "utf8");
const renderedContent = ejs.render(templateData, dataStore);

fs.writeFileSync(outputFile, renderedContent);
console.log("Done!");
