import React, { useContext, useState,useEffect } from "react"
import {observer} from 'mobx-react-lite'
import TodoListComponent from "./TodoListComponent"
import { Button, Col, Container, Row } from "react-bootstrap"
import RootStore  from "../../store/RootStore"
import { RouteComponentProps } from "react-router-dom"


let TodoListsMain:React.FC<RouteComponentProps> = (props)=>{
    const context = useContext(RootStore)
    let [name,setName] = useState("")
    let [isCreate,setCreate] = useState(false)
    useEffect(() => {
        context.user.CheckLogin()
        if(!context.user.IsLogin){
            props.history.push("/login")
        }else{
            context.todoLists.GetTodoLists()
        }
       
    } , [context])
    let CreateNewTodoList = (name:string)=>{
        context.todoLists.CreateTodoList(name)
        setName("")
    }
    return(
        <div>
            <Container>
            <Row>
                <Col xs={10}><h1 className="display-3 m-3">Welcome {context.user.UserData?.userName}</h1></Col><Col xs={2}><a className="mt-3" onClick={()=>{context.user.SignOut(); props.history.push("/login")}}>LogOut</a></Col>
            </Row>
            {isCreate?<Row><Col><input value={name} onChange={(e)=>{setName(e.target.value)}}/></Col><Col><Button onClick={()=>{CreateNewTodoList(name);setCreate(false)}}>Create new List</Button></Col>
            <Col><Button onClick={()=>{setCreate(false)}}>Cancel</Button></Col>
            </Row> :
            <Button onClick={()=>{setCreate(true)}}>Create new one ?</Button>}
                
                {context.todoLists.TodoLists?.map(t=><TodoListComponent deleteTodoList={context.todoLists.DeleteTodoList} id={t.id} userId={t.userId} tittle={t.tittle}/>)}
            </Container>
        </div>
    )
}

export default observer(TodoListsMain)