import {HuffmanEncoder} from "./Huffman.js";
window.onload= function(){
// testing onload funtion 
console.log("hello world!");
const ebtn= document.getElementById("ebtn");
const dbtn= document.getElementById("dbtn");
const ubtn= document.getElementById("ubtn");
const upload= document.getElementById("upload");
const download= document.getElementById("download");
const span1= document.getElementById("span1");
/// cant encode or decode till file is added
ebtn.disabled=true;
dbtn.disabled=true;
let uploaded_file_string="";

let t2u="";
// uploading function
ubtn.onchange=function(){
        upload.style.color="black";
        download.style.color="black";
        ebtn.disabled=false;
        dbtn.disabled=false;
        console.log("file uploading!");
        const reader= new FileReader();
        reader.readAsText(ubtn.files[0]);
        reader.onload=function(){
            t2u=reader.result;
            //console.log("input document string-",t2u);
            upload.innerHTML=t2u;
        }

        
    }

ebtn.onclick=()=>{
 
    upload.style.fontWeight="bolder";
    upload.style.display="flex";
    upload.style.justifyContent="center";
    upload.style.alignItems="center";
    upload.style.color="black";
    download.style.color="black";
    upload.style.fontSize="bolder";
    let he= new HuffmanEncoder();
    let encoding_info= he.encode(t2u);
    download.innerHTML=encoding_info[0];
    upload.innerHTML=encoding_info[1];
    
 

    downloadFile(ubtn.files[0]['name'].split('.')[0] +'_encoded.txt', encoding_info[0]);
    
}

dbtn.onclick=()=>{
    let he= new HuffmanEncoder();
    let decoded_info=he.decode(t2u); 
    download.innerHTML=decoded_info;
    window.alert("decoding in process!");
    downloadFile(ubtn.files[0]['name'].split('.')[0]+'_decoded.txt',decoded_info);
}




function downloadFile(name,data)
{
    window.alert("Downloading File!");
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = name;
    a.click();
};


}








