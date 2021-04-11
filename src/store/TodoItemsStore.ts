import {RootStore} from "./RootStore";
import { makeObservable, observable, action, runInAction } from 'mobx';
import ITodoItem from "../models/ITodoItem";
import agend from "../agend/agend";
import { v4 as uuidv4 } from 'uuid';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

class TodoItemsStore{
    rootStore:RootStore ;
    constructor(rootStore:RootStore){
        this.rootStore = rootStore
        makeObservable(this)
    }
    @observable TodoItems : ITodoItem[] | null = null;
    @observable IsLoading : boolean = false ;
    @observable HubConnection : HubConnection|null=null;
    @action SetItems = (data:ITodoItem[])=>{
        
        this.TodoItems = data
    }
    @action GetTodoLists = async  (id:string|undefined)=>{

        if(this.rootStore.todoLists.TodoListsMapped.get(id!)?.common){
            this.IsLoading = true 
            let  data= await agend.GetTodoItems(id);
            this.SetItems(data)
            this.IsLoading = false
            this.HubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/todoList?todoListId='+id,{
                accessTokenFactory:()=>this.rootStore.user.UserData?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information) 
            .build();
            this.HubConnection.start().catch(error=>console.log("some error with hub connection"));
            this.HubConnection.on('ReceiveTodoItem',(todoItem:ITodoItem)=>{
                runInAction(()=>this.TodoItems?.push(todoItem))
            })

        }else{
            
            this.IsLoading = true 
            this.StopHubConnection()
            let  data= await agend.GetTodoItems(id);
            this.SetItems(data)
            this.IsLoading = false

        
        console.log(this.TodoItems)
    }
}
@action StopHubConnection=()=>{
    this.HubConnection?.stop()
    this.HubConnection = null
}
    @action DeleteTodoItem = async (id:string|undefined)=>{
        let status = await agend.DeleteTodoItem(id)
        let todoItems = this.TodoItems?.filter((i)=>i.id!==id)
        if(todoItems !== undefined){
            this.TodoItems = todoItems
        }else{
            console.error("There isn't todoitem with this id")
        }
    }
    @action ChangeDoneStatus = async (id:string|undefined)=>{
        let status = await agend.SetDoneStatus(id)
        let todoItem = this.TodoItems?.filter((i)=>i.id===id)
        if(todoItem !==undefined){
            todoItem[0].done  = todoItem[0].done ? false:true
            this.TodoItems = this.TodoItems?.filter((i)=>i.id!==id) === undefined ? []:this.TodoItems?.filter((i)=>i.id!==id)
            this.TodoItems.push(todoItem[0])
        }else{
            console.error("There isn't todoitem with this id")
        }
    }
    @action ChangeDescription = async (id:string|undefined,desc:string)=>{
        let status = await agend.ChangeTodoItem(id,desc)
        let todoItem = this.TodoItems?.filter((i)=>i.id===id)
        if(todoItem !==undefined){
            todoItem[0].description  = desc
            this.TodoItems = this.TodoItems?.filter((i)=>i.id!==id) === undefined ? []:this.TodoItems?.filter((i)=>i.id!==id)
            this.TodoItems.push(todoItem[0])
        }else{
            console.error("There isn't todoitem with this id")
        }
    }
    @action CreateTodoItem = async (todoListId:string|undefined,desc:string)=>{
        if(this.HubConnection){
        try{
            await this.HubConnection.invoke("CreateTodoItem",{TodoListId:todoListId,Description:desc,CreatedByUserId:this.rootStore.user.UserData?.id})
        }catch{
            console.error("something went wrong")
        }
        
    }else{if(todoListId){
            let todoItem:ITodoItem = {todoListId:todoListId,id:uuidv4(),description:desc,done:false,createdByUserId:this.rootStore.user.UserData?.id}
            let status = await agend.CreateTodoItem(todoItem)
            this.TodoItems?.push(todoItem)
        }else{
            console.log("Invalid data")
        }}
}
}

export default TodoItemsStore