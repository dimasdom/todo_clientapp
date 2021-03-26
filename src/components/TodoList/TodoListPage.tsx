import React, { useContext,useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Col, Container, Row, Button } from 'react-bootstrap';
import  RootStore  from '../../store/RootStore';

import TodoItem from '../TodoItem/TodoItem';
import { RouteComponentProps } from 'react-router-dom';

interface ITodoListPageProps {
    id?:string
}
const TodoListPage:React.FC<RouteComponentProps<ITodoListPageProps>> = (props) => {
    let [desc,setDesc]=useState("")
    let [isCreate,setCreate]=useState(false)
    let context = useContext(RootStore)
    useEffect(()=>{
        console.log(context.todoItems.IsLoading)
        context.todoItems.GetTodoLists(props.match.params.id)
        setTimeout(()=>{console.log(context.todoItems.IsLoading)},1000)
        },[])
    return(
        <Container>
            <Row>
                <h1 className="display-4">Your task in {props.match.params.id ?context.todoLists.TodoListsMapped.get(props.match.params.id)?.tittle:"Wrong"}</h1>
            </Row>
            {isCreate ?
            <Row className="m-4">
                
                <Col>
                <input value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                </Col>
                <Col>
                <Button onClick={()=>{context.todoItems.CreateTodoItem(props.match.params.id,desc);setDesc("");setCreate(false)}}>
                    Create new 
                    </Button>
                    </Col>
                    </Row>:<Button className="m-4" onClick={()=>{setCreate(true)}}>Need To Create New One</Button>}
           {context.todoItems.TodoItems?.map(i=><TodoItem 
            setDoneStatus={context.todoItems.ChangeDoneStatus}
            changeTodoItem={context.todoItems.ChangeDescription}
            deleteTodoItem={context.todoItems.DeleteTodoItem}
             key={i.id} 
             id={i.id} 
             description={i.description} 
             done={i.done} 
             todoListId={i.todoListId} />)}
        </Container>
    )
}

export default observer(TodoListPage)


           
            