import React, { Fragment, useState } from 'react';
import ITodoItemProps from '../../models/ITodoItemProps';
import { Button, Col, Row } from 'react-bootstrap';
export const TodoItem:React.FC<ITodoItemProps> = (props) => {
    const [desc,setDesc] = useState(props.description);
    let [isChange,setChange]=useState(false)
    return(
        <Row>
            <Col><input  type="checkbox" checked={props.done} onChange={()=>{props.setDoneStatus(props.id)}}/></Col>
            {isChange?<Fragment><Col><p><input value={desc} onChange={(e)=>{setDesc(e.target.value)}}/></p></Col>
            <Col><Button onClick={()=>{props.changeTodoItem(props.id,desc);setChange(false)}} >Change Item</Button></Col>
            <Col><Button onClick={()=>{setChange(false)}}>Cancel</Button></Col></Fragment>:<Col><a onClick={()=>{setChange(true)}}>{props.description}</a></Col>}
            <Col><Button onClick={()=>{props.deleteTodoItem(props.id)}} >Delete</Button></Col>
        </Row>
    )
}





export default TodoItem