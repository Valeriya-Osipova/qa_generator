const express = require("express");
const archiver = require("archiver");
const fs = require("fs");

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(source, out, callback) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  stream.on("close", () => callback(null));
  archive.on("error", (err) => callback(err));

  archive.directory(source, false).pipe(stream);

  archive.finalize();
}

module.exports = { zipDirectory };
