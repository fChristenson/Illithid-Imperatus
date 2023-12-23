const fs = require("fs");
const ejs = require("ejs");

const inputFiles = [
  ["mainItems", "src/Public/IllithidImperatus/RootTemplates/main_items.xml"],
  [
    "mindFlayerModels",
    "src/Public/IllithidImperatus/RootTemplates/mind_flayer_models.xml",
  ],
  [
    "vampiricMindFlayerModels",
    "src/Public/IllithidImperatus/RootTemplates/mind_flayer_models_vampiric.xml",
  ],
  [
    "portalShards",
    "src/Public/IllithidImperatus/RootTemplates/portal_shards.xml",
  ],
  [
    "gravityStones",
    "src/Public/IllithidImperatus/RootTemplates/gravity_stones.xml",
  ],
  [
    "resonanceStones",
    "src/Public/IllithidImperatus/RootTemplates/resonance_stones.xml",
  ],
  [
    "commonWeapons",
    "src/Public/IllithidImperatus/RootTemplates/common_weapons.xml",
  ],
  ["furniture", "src/Public/IllithidImperatus/RootTemplates/furniture.xml"],
  ["grenades", "src/Public/IllithidImperatus/RootTemplates/grenades.xml"],
  ["spells", "src/Public/IllithidImperatus/RootTemplates/spells.xml"],
  ["thralls", "src/Public/IllithidImperatus/RootTemplates/thralls.xml"],
  [
    "undeadThralls",
    "src/Public/IllithidImperatus/RootTemplates/undead_thralls.xml",
  ],
  ["weaponOils", "src/Public/IllithidImperatus/RootTemplates/weapon_oils.xml"],
  ["aquariums", "src/Public/IllithidImperatus/RootTemplates/aquarium.xml"],
  ["brainJars", "src/Public/IllithidImperatus/RootTemplates/brain_jars.xml"],
  ["chairs", "src/Public/IllithidImperatus/RootTemplates/chairs.xml"],
];
const template =
  "src/Public/IllithidImperatus/RootTemplates/_merged.lsx.template";
const outputFile = "src/Public/IllithidImperatus/RootTemplates/_merged.lsx";

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
