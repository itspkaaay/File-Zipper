/// implementation of max heap;
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
        let parentNode= Math.floor((cI-1)/2);
        if(cI<=0)
        {
            return;
        }
        else{
            if(this.heap[parentNode][0]>= this.heap[cI][0])
            {
                return;
            }
            else{
                let temp= this.heap[cI];
                this.heap[cI]= this.heap[parentNode];
                this.heap[parentNode]=temp;
                this.heapify(parentNode);
            }
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
        if(child1>= currSize)
        {
            return;
        }

        if(this.heap[child2]===undefined)
        {
            if(this.heap[child1][0]<=this.heap[cI][0])
            {
                return;
            }
            else
            {
                let temp= this.heap[child1];
                this.heap[child1]=this.heap[cI];
                this.heap[cI]=temp;
                this.down_heapify(child2);
            }
        }

        let maxInd;
        if(Math.max(this.heap[child1][0],this.heap[child2][0])===this.heap[child1][0])
        {
            maxInd=child1;
        }
        else{
            maxInd=child2;
        }

        let temp= this.heap[maxInd];
        this.heap[maxInd]=this.heap[cI];
        this.heap[cI]=temp;
        this.down_heapify(maxInd);

        
    };




}

let bh= new binaryHeap();
bh.insert([1,"one"]);
console.log(bh.heap);
bh.remove_max();
console.log(bh.heap);




