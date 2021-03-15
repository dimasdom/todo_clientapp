import { observable ,makeObservable, action,runInAction } from 'mobx';
import agend from '../agend/agend';
import ITodoList from '../models/ITodoList';
import { RootStore } from './RootStore';

class TodoListsStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this,{
      TodoLists:observable ,
      GetTodoLists:action,
    })
    this.rootStore = rootStore;
  }
     TodoLists : ITodoList[]|null = null;
    SetTodoLists = (todolists : ITodoList[])=>{
      debugger
      runInAction(()=>{
        this.TodoLists = todolists
      })
    }
    GetTodoLists = async  ()=>{

        let data = await agend.GetTodoLists()
        runInAction(()=>{
          this.SetTodoLists(data)
        })
        
    }
    

}

export default TodoListsStore