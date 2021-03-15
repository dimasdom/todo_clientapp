import React, { useContext,useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';
import  RootStore  from '../../store/RootStore';
import { RouteComponentProps } from "@reach/router"
import TodoItem from '../TodoItem/TodoItem';
interface ITodoListPageProps extends RouteComponentProps{
    id?:string
}
export const TodoListPage:React.FC<ITodoListPageProps> = (props) => {
    debugger
    const context = useContext(RootStore);
    useEffect(()=>{
            context.todoItems.GetTodoItems(props.id)
    },[context.todoItems,props.id])
    return(
        <Container>
            <div>
                {context.todoItems.TodoItems == null ?"its null" : "there is something"}
            </div>
            {context.todoItems.TodoItems?.map(i=><TodoItem setDoneStatus={context.todoItems.SetTodoItems} key={i.id} id={i.id} description={i.description} done={i.done} todoListId={i.todoListId} />) }
        </Container>
    )
}

export default observer(TodoListPage)