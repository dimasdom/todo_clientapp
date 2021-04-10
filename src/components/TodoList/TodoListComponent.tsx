import React from 'react'
import ITodoListProps from '../../models/ITodoListProps';
import { Button, Col,  Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
export const TodoListItem:React.FC<ITodoListProps> = (props) => {
    
    return(
        <Row key={props.id} className="m-3">
            
            <Col><Link  to={`/TodoItems/${props.id}`}>{props.tittle}</Link></Col>
            <Col><Icon.X onClick={()=>{props.deleteTodoList(props.id)}}>Delete</Icon.X></Col>
            
        </Row>
    )
}

export default TodoListItem