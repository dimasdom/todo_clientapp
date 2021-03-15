import { observable, action, runInAction, makeObservable } from 'mobx';
import ITodoItem from '../models/ITodoItem';
import agend from '../agend/agend';
import { RootStore } from './RootStore';

class TodoItemsStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore;
  }

    @observable TodoItems : ITodoItem[]|null = null;
    @action SetTodoItems = (data:ITodoItem[])=>{
      debugger
        runInAction(()=>{
          this.TodoItems = data
        })
    }
    @action GetTodoItems = async (id:string|undefined)=>{
       debugger
        let data = await agend.GetTodoItems(id)
        runInAction(()=>{
          this.SetTodoItems(data)
        })
    }
    @action SetDoneStatus = async (id:string|undefined)=>{
      let done = await agend.SetDoneStatus(id);
      runInAction(()=>{
        let a = this.TodoItems?.filter(i=>i.id==id)
        let todoitems = this.TodoItems?.filter(i=>i.id!=id)
        if(todoitems!=undefined){
          this.TodoItems = todoitems
        }
        if(a==undefined){

        }else{
          a[0].done = done
          this.TodoItems?.push(a[0]);
        }
        
      })
    }

}

export default TodoItemsStore