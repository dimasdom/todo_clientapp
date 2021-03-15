import { createContext } from 'react';
import TodoItemsStore from "./TodoItemsStore"
import TodoListsStore from "./TodoListsStore"
import UserStore from "./UserStore"

export class RootStore {
    constructor(){
        this.todoItems = new TodoItemsStore(this)
        this.todoLists = new TodoListsStore(this)
        this.user = new UserStore(this)
    }
todoLists:TodoListsStore
todoItems:TodoItemsStore
user:UserStore
}

export default createContext(new RootStore())