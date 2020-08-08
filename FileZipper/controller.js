import {HuffmanEncoder} from "./Huffman.js";
var onload= function(){
// testing onload funtion 
console.log("hello world!");
const ebtn= document.getElementById("ebtn");
const dbtn= document.getElementById("dbtn");
const ubtn= document.getElementById("ubtn");
const upload= document.getElementById("upload");
const download= document.getElementById("download");

/// cant encode or decode till file is added
ebtn.disabled=true;
dbtn.disabled=true;
let uploaded_file_string="";

let t2u="";
// uploading function
ubtn.onchange=function(){
        ebtn.disabled=false;
        dbtn.disabled=false;
        console.log("file uploading!");
        const reader= new FileReader();
        reader.readAsText(ubtn.files[0]);
        reader.onload=function(){
            t2u=reader.result;
            console.log(t2u);
            upload.innerHTML=t2u;
        }

        
    }

ebtn.onclick=()=>{

    let he= new HuffmanEncoder();
    download.innerHTML(he.encode(t2u));
    
}

}








