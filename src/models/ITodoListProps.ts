export default interface ITodoListProps {
    tittle:string,
    id:string,
    userId?:string ,
    deleteTodoList:(id:string)=>void
}