
export { binaryHeap }
class binaryHeap{
    // heap constructor
    constructor(){
        this.heap=[];
    }


    // returns the size of the heap
    size(){
       return this.heap.length;
    }

    //return T/F values if a heap is empty or not
    isEmpty(){
        if(this.size()===0)
        {
            return true;
        }

        else{
            return false;
        }
    }

    // inserting elements
    insert(element)
    {
        if(this.heap.size===0)
        {
            this.heap[0]= element;
            return;
        }

        this.heap[this.size()]=element;
        this.heapify(this.heap.length-1);
        
    }

    // reorganization of tree to form a heap;
    heapify(cI){
        // cI is current index
        if(cI===0)
        {
            return;
        }
        let parentNode= Math.floor((cI-1)/2);
        while(cI>0)
        {
          
       
            if(this.heap[parentNode][0]>= this.heap[cI][0])
            {
                return;
            }
            let temp= this.heap[cI];
            this.heap[cI]= this.heap[parentNode];
            this.heap[parentNode]=temp;
            cI= parentNode;
            parentNode= Math.floor((cI-1)/2);
        }
        
    }

    // get Maximum Value from heap or removal
    remove_max()
    {
        let maxValue;
        if(this.size()===1)
        {
            return this.heap.pop();
        }
        else if(this.size===0){
            return null;
        }
        else{
            maxValue= this.heap[0];
            this.heap[0]= this.heap.pop();
            this.down_heapify(0);
            return maxValue;
        }
    }

    down_heapify(cI)
    {
        let child1= 2*cI+1; //index
        let child2= 2*cI+2; //index
        let currSize= this.size();
        
        while(true)
        {
            let maxInd=-100000;
            let maxVal=-100000;
            if(child1 <currSize && this.heap[child1][0]>maxVal)
            {
                maxVal=this.heap[child1][0];
                maxInd= child1;
            }
            if(child2<currSize && this.heap[child2][0]>maxVal)
            {
                maxInd= child2;
                maxVal= this.heap[child2][0];
            }
            if(maxInd<0)
            {
                return;
            }

            if(maxVal>this.heap[cI][0]){
            let temp_dh= this.heap[maxInd];
            this.heap[maxInd]= this.heap[cI];
            this.heap[cI]= temp_dh;

            cI= maxInd;
            child1=2*cI+1;
            child2=child1+1;
            }
            else{
                break;
            }


        }
        
    };




}







