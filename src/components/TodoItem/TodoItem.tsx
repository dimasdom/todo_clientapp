import React from 'react';
import ITodoItemProps from '../../models/ITodoItemProps';
import { Col, Row } from 'react-bootstrap';
export const TodoItem:React.FC<ITodoItemProps> = (props) => {
    debugger
    return(
        <Row>
            <Col><input onChange={()=>{props.setDoneStatus(props.id)}} type="checkbox" checked={props.done}/></Col>
            <Col><p>{props.description}</p></Col>
            <Col><a></a></Col>
        </Row>
    )
}

export default TodoItem