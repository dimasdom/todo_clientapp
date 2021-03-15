export default interface ITodoItemProps {
    description:string,
    todoListId?:string,
    done:boolean,
    id:string,
    setDoneStatus:(i:string|undefined)=>void
}