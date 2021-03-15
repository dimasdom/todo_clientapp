import React, { useContext, useEffect, useState } from "react"
import {observer} from 'mobx-react-lite'
import TodoListComponent from "./TodoListComponent"
import { Container } from "react-bootstrap"
import RootStore  from "../../store/RootStore"
import { RouteComponentProps } from "@reach/router"

let TodoListsMain:React.FC<RouteComponentProps> = ()=>{
    const context = useContext(RootStore)
    useEffect(() => {
       context.todoLists.GetTodoLists()
    } , [context])
    return(
        <div>
            <Container>
                {context.todoLists.TodoLists?.map(t=><TodoListComponent id={t.id} userId={t.userId} tittle={t.tittle}/>)}
            </Container>
        </div>
    )
}

export default observer(TodoListsMain)