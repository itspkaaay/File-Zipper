import { binaryHeap } from './heap.js';

export { HuffmanEncoder }

class HuffmanEncoder{
    /*  
    USEFUL VARIABLES OF CLASS OBJECT
    huffmanTree contains the huffman tree
    mappings contain character to binary mapping */

    /// To get a stringified huffman tree
    huffmanString(huffmanTreeNode)
    {
        //console.log(huffmanTreeNode);
        if(huffmanTreeNode===undefined)
        {
            return;
        }
        if(typeof(huffmanTreeNode[1])==='string')
        {
            return "^"+huffmanTreeNode[1];
        }
        let lstr= "0"+this.huffmanString(huffmanTreeNode[1][0]);
        let rstr= "1"+this.huffmanString(huffmanTreeNode[1][1]);

        return lstr+rstr;
    }
    /// get binary mappings of each character in string
    getBinaryCodes(huffmanTreeNode,path)
    {
        if(huffmanTreeNode===null)
        {
            return;
        }
        if(typeof(huffmanTreeNode[1])==="string")
        {
            this.mappings[huffmanTreeNode[1]]=path;
            return;
        }

        this.getBinaryCodes(huffmanTreeNode[1][0],path+"0");
        this.getBinaryCodes(huffmanTreeNode[1][1],path+"1");
        
    }
    /// encoding method
    encode(data)
    {
        // get the frequency map of character contained in string to be encoded!
        const mp= new Map();
        for(let i=0;i<data.length;i++)
        {
            if(data[i] in mp)
            {
                mp[data[i]]+=1;
            }
            else
            {
                mp[data[i]]=1;
            }
        }

        this.heap= new binaryHeap();
        for(const key in mp)
        {
            this.heap.insert([-mp[key],key]);
        }

        while(this.heap.size()>1)
        {
            const node1= this.heap.remove_max();
            const node2= this.heap.remove_max();
            const newNode= [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(newNode);

        }

        let huffmanTree= this.heap.remove_max();
        this.mappings={};
        this.getBinaryCodes(huffmanTree,"");

        //default binary encoded string
        let binaryEncodedString="";
        for(let i=0;i<data.length;i++)
        {
            binaryEncodedString+= this.mappings[data[i]];
        }

        /// create 8 bits buckets to get a unique character with its associated ascii values

        let rem= 8-(binaryEncodedString.length%8);
        let paddedstring="";
        for(let i=0;i<rem;i++)
        {
            paddedstring+="0";
        }
        binaryEncodedString+=paddedstring;
        console.log("binary encoded string:", binaryEncodedString);

        /// separating buckets of 8 and replacing with a character
        let characterisedString="";
        for(let i=0;i<binaryEncodedString.length;i+=8)
        {
            characterisedString+=String.fromCharCode(parseInt(binaryEncodedString.slice(i,i+8),2));
        }

        const retString= this.huffmanString(huffmanTree).concat("\n",rem,"\n"+characterisedString);
        const retInfo= "The compression ratio for this file is: "+ String(data.length/retString.length)
        console.log(retInfo);
        console.log(this.mappings);
        this.decode(retString);
        return retString;

    }


    // convert huffman tree from string to parsable tree format
    destringHuffman(data)
    {
        let node = [];
        if(data[this.ind]==='^'){
            this.ind++;
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }
        this.ind++;
        let left = this.destringHuffman(data);
        node.push(left);
        this.ind++;
        let right = this.destringHuffman(data);
        node.push(right);

        return node;


    }

    // decode the encoded string
    decode(encoded_data)
    {
        console.log("String to decode:");
        console.log(encoded_data);
        encoded_data=encoded_data.split("\n");
        let encoded_og= encoded_data[2];          /// actual string sans meta data
        let htreeString= encoded_data[0];
        let rem= encoded_data[1];

        let binarised_og="";

        /// return binarised string to be parsed in the tree
        for(let i=0;i<encoded_og.length;i++)
        {
            let bin = encoded_og.charCodeAt(i).toString(2);
            binarised_og+= "0".repeat(8-bin.length)+bin;
        }
        binarised_og=binarised_og.substr(0, binarised_og.length-rem);
        this.ind=0;
        let decoder=this.destringHuffman(htreeString);
        console.log("decoder:", decoder);
        console.log("string to decode:",binarised_og);
        let currentNode= decoder;
        let res="";
        for(let i=0;i<binarised_og.length;i++)
        {
            if(binarised_og[i]==='0')
            {
                currentNode=currentNode[0];
            }
            else if(binarised_og[i]==='1')
            {
                currentNode= currentNode[1];
            }

            if(typeof(currentNode[0])==='string')
            {
                res+=currentNode;
                currentNode=decoder;
            }
        }
        console.log("decoded string: ",res);

        
        
    }
  



}

