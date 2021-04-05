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

        let data = await agend.GetByUserId(this.rootStore.user.UserData?.id)
        runInAction(()=>{
          this.SetTodoLists(data)
          data.forEach((i:ITodoList)=>{
            this.TodoListsMapped.set(i.id,i)
          })
        })
        
    }
    
    @action CreateTodoList = async (name:string)=>{
      if(this.rootStore.user.UserData?.id){

      
       
      let todoList:ITodoList = {id:uuidv4(),tittle:name,
        userId:this.rootStore.user.UserData?.id,common:false,userIds:JSON.stringify([this.rootStore.user.UserData.id])}
      let status = await agend.CreateTodoList(todoList,this.rootStore.user.UserData.id)
      runInAction(()=>{
        this.TodoLists?.push(todoList)
      })
    }else{
      console.log("LogIn please")
    }
  }
  @action ChangeCommonStatus = async (id:string,userIds:string[])=>{
    await agend.ChangeCommonStatus(id,userIds)
    let newTodoListData = this.TodoLists?.filter(i=>i.id==id)
    if(newTodoListData){
      newTodoListData[0].common=true;
      newTodoListData[0].userId=JSON.stringify(userIds);
      this.TodoListsMapped.set(id,newTodoListData![0])
    }
    
    
  }
  @action DeleteTodoList = async (id:string)=>{
    let status = await agend.DeleteTodoList(id,this.rootStore.user.UserData?.id!)
    let todoLists = this.TodoLists?.filter(i=>i.id!==id)
    this.TodoLists = todoLists?todoLists:[]
  }

}

export default TodoListsStore