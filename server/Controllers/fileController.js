const expresss = require("express")
const archiver = require('archiver');
const archive = archiver('zip');
const zlib = require('zlib')
const fs = require("node:fs");
const path = "../projects/projectJavaMaven"
// class FileController{
//
//     async zipFile(path) {
//         try{
//
//         } catch (e){
//             console.log(e)
//         }
//     }
// }

const readStream = fs.createReadStream(path)
const writeStream = fs.createWriteStream("projectJavaMaven.zip")
const gzip = zlib.gzip();
readStream.pipe(gzip).pipe(writeStream).on('finish', function(){
    console.log("completed")
})