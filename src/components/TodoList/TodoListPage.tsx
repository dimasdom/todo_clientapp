import React, { useContext,useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import  RootStore  from '../../store/RootStore';
import {Check2} from 'react-bootstrap-icons'
import TodoItem from '../TodoItem/TodoItem';
import { RouteComponentProps } from 'react-router-dom';

interface ITodoListPageProps {
    id?:string
}
const TodoListPage:React.FC<RouteComponentProps<ITodoListPageProps>> = (props) => {
    let [desc,setDesc]=useState("")
    let [isCreate,setCreate]=useState(false)
    let [changeStatus,setChStatus] = useState(false)
    let [IdfriendsToList,setFrTL] = useState<string[]>([])
    let[UserNameToList,setUNTL] = useState<string[]>([])
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
            <Row>
               <Button onClick={()=>{setChStatus(true)}}>Add More Users</Button> 
            </Row>
            {isCreate ?
            <Row className="m-4">
                
                <Col>
                <input value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                </Col>
                <Col>
                <Check2 onClick={()=>{context.todoItems.CreateTodoItem(props.match.params.id,desc);setDesc("");setCreate(false)}}>
                    Create new 
                    </Check2>
                    </Col>
                    </Row>:<Button className="m-4" onClick={()=>{setCreate(true)}}>Need To Create New One ?</Button>}
           {context.todoItems.TodoItems?.map(i=><TodoItem 
            setDoneStatus={context.todoItems.ChangeDoneStatus}
            changeTodoItem={context.todoItems.ChangeDescription}
            deleteTodoItem={context.todoItems.DeleteTodoItem}
             key={i.id} 
             id={i.id} 
             description={i.description} 
             done={i.done} 
             todoListId={i.todoListId} />)}
             <>
             <Modal show={changeStatus} onHide={()=>{setChStatus(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Add your friends to this TodoList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Add Users</p>
            {context.user.UserData?.usersFriends.map(i=><Button onClick={()=>{setFrTL([...IdfriendsToList,i.id]);setUNTL([...UserNameToList,i.userName])}} >{i.userName}</Button>)}
            <p>Who you're goint to add</p>
            {IdfriendsToList.length ?UserNameToList.map(i=><p>{i}</p>):<p></p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setChStatus(false)}}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{setChStatus(false);context.todoLists.ChangeCommonStatus(props.match.params.id!,IdfriendsToList)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
             </>
        </Container>
    )
}

export default observer(TodoListPage)


           
            