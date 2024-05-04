// import JSZip from 'jszip';
// import { saveAs } from 'file-saver'

// export function GET(){
//     const zip = new JSZip
//     const folder = "../../../../server/projects/projectJavaMaven"

//     zip.folder(folder.name).file("Hello.txt", "Hello World\n")


//     zip.generateAsync({type:"blob"}).then(function(content) {
//         saveAs(content, "yourProject.zip");
//     });

//     // return new Response(JSON.stringify({test: true}),{
//     //     status: 200,
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     }
//     // })
// }