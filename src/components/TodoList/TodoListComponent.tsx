import React from 'react'
import ITodoListProps from '../../models/ITodoListProps';
import { Button, Col,  Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const TodoListItem:React.FC<ITodoListProps> = (props) => {
    
    return(
        <Row key={props.id} className="m-3">
            
            <Col><Link  to={`/TodoItems/${props.id}`}>{props.tittle}</Link></Col>
            <Col><Button onClick={()=>{props.deleteTodoList(props.id)}}>Delete</Button></Col>
            
        </Row>
    )
}

export default TodoListItem