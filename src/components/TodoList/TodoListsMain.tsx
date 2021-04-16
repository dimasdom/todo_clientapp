import React, { useContext, useState,useEffect } from "react"
import {observer} from 'mobx-react-lite'
import TodoListComponent from "./TodoListComponent"
import { Button, Col, Container, Row } from "react-bootstrap"
import RootStore  from "../../store/RootStore"
import { RouteComponentProps } from "react-router-dom"
import { store } from 'react-notifications-component';

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
    useEffect(()=>{
        if(context.todoLists.Error){
            store.addNotification({
                title: "Sorry!",
                message: "Internal Server Error",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
              });
        }
    },[context.todoLists.Error])
    let CreateNewTodoList = (name:string)=>{
        if(name!==""){
            context.todoLists.CreateTodoList(name)
            store.addNotification({
                title: "Wonderful!",
                message: "TodoList Was Created",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
              });
            setName("")
            setCreate(false)
        }else{
            store.addNotification({
                title: "Error!",
                message: "TodoList can't be empty",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  onScreen: true
                }
              });
        }
        
        
    }
  
    return(
        <div>
            <Container>
            <Row>
                <Col><h1 className="display-3 m-3">Welcome {context.user.UserData?.userName}</h1></Col>
            </Row>
            {isCreate?<Row><Col><input value={name} onChange={(e)=>{setName(e.target.value)}}/></Col><Col><Button onClick={()=>{CreateNewTodoList(name);}}>Create new List</Button></Col>
            <Col><Button onClick={()=>{setCreate(false)}}>Cancel</Button></Col>
            </Row> :
            <Button onClick={()=>{setCreate(true)}}>Create new one ?</Button>}
                
                {context.todoLists.TodoLists?.map(t=><TodoListComponent deleteTodoList={context.todoLists.DeleteTodoList} id={t.id} userId={t.userId} tittle={t.tittle}/>)}
            </Container>

        </div>
    )
}

export default observer(TodoListsMain)