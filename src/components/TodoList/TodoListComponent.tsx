import React from 'react'
import ITodoListProps from '../../models/ITodoListProps';
import { Button, Col,  Row } from 'react-bootstrap';
import { Link } from '@reach/router';
export const TodoListItem:React.FC<ITodoListProps> = (props) => {
    
    return(
        <Row key={props.id}>
            
            <Col><Link to={`/${props.id}`}>{props.tittle}</Link></Col>
            <Col><Button>Delete</Button></Col>
            
        </Row>
    )
}

export default TodoListItem