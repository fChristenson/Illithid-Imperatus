const fs = require("fs");
const path = require("path");

function copyFiles(sourcePath, destinationPath) {
  // Check if the source exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source path ${sourcePath} does not exist.`);
    return;
  }

  // Check if the source is a directory or a file
  if (fs.statSync(sourcePath).isDirectory()) {
    // If it's a directory, copy its contents recursively

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Read the contents of the source directory
    const files = fs.readdirSync(sourcePath);

    // Loop through each file and folder in the source directory
    files.forEach((file) => {
      const sourceFilePath = path.join(sourcePath, file);
      const destinationFilePath = path.join(destinationPath, file);

      // Recursively copy files and folders
      copyFiles(sourceFilePath, destinationFilePath);
    });

    console.log(
      `Files and folders copied from ${sourcePath} to ${destinationPath}`
    );
  } else {
    // If it's a file, create any missing folders in the destination path and copy the file
    const destinationDirectory = path.dirname(destinationPath);
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory, { recursive: true });
    }

    // Copy the file to the destination directory
    fs.copyFileSync(sourcePath, destinationPath);
    console.log(`File copied from ${sourcePath} to ${destinationPath}`);
  }
}

// Replace 'source' and 'destination' with your actual paths
const sourcePath = process.argv[2];
const destinationPath = process.argv[3];

copyFiles(sourcePath, destinationPath);
