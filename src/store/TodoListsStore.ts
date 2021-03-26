import { observable ,makeObservable, action,runInAction } from 'mobx';
import agend from '../agend/agend';
import ITodoList from '../models/ITodoList';
import { RootStore } from './RootStore';
import { v4 as uuidv4 } from 'uuid';
class TodoListsStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore;
  }
   @observable  TodoLists : ITodoList[]|null = null;
   @observable  TodoListsMapped = new Map<string,ITodoList>()
   @action SetTodoLists = (todolists : ITodoList[])=>{
      
      runInAction(()=>{
        this.TodoLists = todolists
      })
    }
    @action GetTodoLists = async  ()=>{

        let data = await agend.GetTodoLists()
        runInAction(()=>{
          this.SetTodoLists(data)
          data.forEach(i=>{
            this.TodoListsMapped.set(i.id,i)
          })
        })
        
    }
    @action CreateTodoList = async (name:string)=>{
      if(this.rootStore.user.UserData?.id){

      
       
      let todoList:ITodoList = {id:uuidv4(),tittle:name,
        userId:this.rootStore.user.UserData?.id}
      let status = await agend.CreateTodoList(todoList)
      runInAction(()=>{
        this.TodoLists?.push(todoList)
      })
    }else{
      console.log("LogIn please")
    }
  }
  @action DeleteTodoList = async (id:string)=>{
    let status = await agend.DeleteTodoList(id)
    let todoLists = this.TodoLists?.filter(i=>i.id!==id)
    this.TodoLists = todoLists?todoLists:[]
  }

}

export default TodoListsStore