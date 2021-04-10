import React, { Fragment, useState } from 'react';
import ITodoItemProps from '../../models/ITodoItemProps';
import { Button, Col, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
export const TodoItem:React.FC<ITodoItemProps> = (props) => {
    const [desc,setDesc] = useState(props.description);
    let [isChange,setChange]=useState(false)
    return(
        <Row className="scale-up-top">
            <Col><input  type="checkbox" checked={props.done} onChange={()=>{props.setDoneStatus(props.id)}}/></Col>
            {isChange?<Fragment><Col><p><input value={desc} onChange={(e)=>{setDesc(e.target.value)}}/></p></Col>
            <Col><Icon.Check2 onClick={()=>{props.changeTodoItem(props.id,desc);setChange(false)}} ></Icon.Check2></Col>
            <Col><Icon.XCircle onClick={()=>{setChange(false)}}></Icon.XCircle></Col></Fragment>
            :
            <Col><a onClick={()=>{setChange(true)}}>{props.description}</a></Col>}
            <Col>{isChange?<></>:<Icon.X onClick={()=>{props.deleteTodoItem(props.id)}} ></Icon.X>}</Col>
            
        </Row>
    )
}





export default TodoItem