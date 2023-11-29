const fs = require("fs");
const p = require("path");

const pathToFiles = process.argv[2];
const pathToOutputFile = process.argv[3];

const filenames = fs.readdirSync(pathToFiles);

const result = [];
const widthMultiple = 0.042;

const getTemplate = ({ mapKey, u1 }) =>
  [
    '<node id="IconUV">',
    `  <attribute id="MapKey" type="FixedString" value="${mapKey}"/>`,
    `  <attribute id="U1" type="float" value="${u1}"/>`,
    '  <attribute id="U2" type="float" value="0.042"/>',
    '  <attribute id="V1" type="float" value="0.0"/>',
    '  <attribute id="V2" type="float" value="1.0"/>',
    "</node>",
  ].join("\n");

for (let i = 0; i < filenames.length; i++) {
  const filename = filenames[i];
  const conf = {
    mapKey: `FRE_${p.basename(filename, ".jpeg")}`,
    u1: i * widthMultiple,
  };
  result.push(getTemplate(conf));
}

fs.writeFileSync(pathToOutputFile, result.join("\n"));
