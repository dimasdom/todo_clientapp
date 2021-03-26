
export default interface ITodoItemProps {
    description:string,
    todoListId?:string,
    done:boolean,
    id:string,
    setDoneStatus:(id:string|undefined)=>void,
    changeTodoItem:(id:string|undefined,desc:string)=>void
    deleteTodoItem:(id:string|undefined)=>void
}