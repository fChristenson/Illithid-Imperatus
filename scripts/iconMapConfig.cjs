const fs = require("fs");
const p = require("path");

const pathToFiles = process.argv[2];
const pathToOutputFile = process.argv[3];

const filenames = fs.readdirSync(pathToFiles);

const result = [];
const start = 0.00024414062;
const width = 0.031005859;

const getTemplate = ({ mapKey, u1, u2 }) =>
  [
    '<node id="IconUV">',
    `  <attribute id="MapKey" type="FixedString" value="${mapKey}"/>`,
    `  <attribute id="U1" type="float" value="${u1}"/>`,
    `  <attribute id="U2" type="float" value="${u2}"/>`,
    '  <attribute id="V1" type="float" value="0.00024414062"/>',
    '  <attribute id="V2" type="float" value="0.031005859"/>',
    "</node>",
  ].join("\n");

for (let i = 0; i < filenames.length; i++) {
  const filename = filenames[i];
  const u1 = i === 0 ? start : (start + width) * i;
  const conf = {
    mapKey: `FRE_${p.basename(filename, ".jpeg")}`,
    u1,
    u2: u1 + width,
  };
  result.push(getTemplate(conf));
}

const configTemplate = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  "<save>",
  '    <version major="4" minor="0" revision="9" build="328"/>',
  '    <region id="IconUVList">',
  '        <node id="root">',
  "            <children>",
  result.join("\n"),
  "            </children>",
  "        </node>",
  "    </region>",
  '    <region id="TextureAtlasInfo">',
  '        <node id="root">',
  "            <children>",
  '                <node id="TextureAtlasIconSize">',
  '                    <attribute id="Height" type="int32" value="64"/>',
  '                    <attribute id="Width" type="int32" value="64"/>',
  "                </node>",
  '                <node id="TextureAtlasPath">',
  '                    <attribute id="Path" type="string" value="Assets/Textures/Icons/Icons_Skills.dds"/>',
  '                    <attribute id="UUID" type="FixedString" value="688d0348-2882-4949-89b9-8a9b86071788"/>',
  "                </node>",
  '                <node id="TextureAtlasTextureSize">',
  '                    <attribute id="Height" type="int32" value="2048"/>',
  '                    <attribute id="Width" type="int32" value="2048"/>',
  "                </node>",
  "            </children>",
  "        </node>",
  "    </region>",
  "</save>",
];

fs.writeFileSync(pathToOutputFile, configTemplate.join("\n"));
