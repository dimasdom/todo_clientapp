import { createContext } from 'react';
import TodoItemsStore from './TodoItemsStore';
import TodoListsStore from "./TodoListsStore"
import UserStore from "./UserStore"

export class RootStore {
    constructor(){
        this.todoLists = new TodoListsStore(this)
        this.todoItems = new TodoItemsStore(this)
        this.user = new UserStore(this)
    }
todoLists:TodoListsStore
user:UserStore
todoItems:TodoItemsStore
}

export default createContext(new RootStore())