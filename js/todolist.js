export default class ToDoList{
    constructor(){
        this.list=[];
    }

    getList(){
        return this.list;
    }

    addListItem(item){
        this.list.push(item);
    }
    clearList(){
        this.list=[];
    }
    
    removeListItem(itemId){
       
        // const list=this.list;
        // for(let i=0; i<list.length; i++){
        //     if(list[i].id==itemId){
        //         list.splice(i,1);
        //         break;
        //     }
        // }
        this.list=this.list.filter(item=>{
            //console.log(item);
            return item.id!=itemId
        })
        //  console.log(list);
        
    }
}