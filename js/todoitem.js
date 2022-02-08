export default class ToDoItem{
    constructor(){
        this.id=null;
        this.item=null;
    }

    getItemId(){
        return this.id;
    }
    setItemId(id){
        this.id=id;
    }
    getItem(){
        return this.item;
    }
    setItem(item){
        this.item=item;
    }   
}
