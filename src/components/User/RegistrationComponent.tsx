
import React, { useContext, useEffect,useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import  RootStore  from '../../store/RootStore';
import {Alert} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';

let RegistrationComponent:React.FC<RouteComponentProps> = (props) => {
    const context  = useContext(RootStore)
    useEffect(()=>{
        if(context.user.IsLogin){
            props.history.push("/") 
        }
    },[context.user.IsLogin])
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [userName,setUserName]=useState("")
    let [isSended,setIsSended] = useState(false)
    let Register = ()=>{
        setIsSended(true)
        context.user.SignUp({Email:email,Password:password,UserName:userName});
        
}
if(isSended&&context.user.IsError===null){
    return(
        <Container>
            <Row className="justify-content-md-center m-4">
                <p className="h1">Registration Complete</p>
                
            
            </Row>
            <Row className="justify-content-md-center m-4">
                <Link to="/login" className="h4">Login</Link>
            </Row>
        </Container>
    )
}else{
    return(
        <Container>
            <Row className="justify-content-md-center m-4">
                <p className="display-4">Registration</p>
            
            </Row>
            <Row className="justify-content-md-center mt-4 ">{isSended? email===""?<Alert variant="danger">Email Is Required</Alert>:<p>Email</p>:<p>Email</p>}</Row>
            <Row className="justify-content-md-center ">
            <input value={email} type="email" onChange={(e)=>{setEmail(e.target.value);setIsSended(false)}} ></input>
            </Row >
            <Row className="justify-content-md-center ">{isSended ? userName===""?<Alert variant="danger">User Name Is Required</Alert>:<p>User Name</p>:<p>User Name</p>}</Row>
            <Row className="justify-content-md-center mt-1">
            
            <input value={userName} onChange={(e)=>{setUserName(e.target.value);setIsSended(false)}}></input> 
            </Row>
            <Row className="justify-content-md-center ">{isSended? password===""?<Alert variant="danger">Password Is Required</Alert>:<p>Password</p>:<p>Password</p>}</Row>
            <Row className="justify-content-md-center mt-1">
            
            <input value={password} type="password" onChange={(e)=>{setPassword(e.target.value);setIsSended(false)}}></input> 
            </Row>
            <Row className="justify-content-md-center mt-4" >
            <Button onClick={()=>{Register()
            }}>Register</Button>
            </Row>{context.user.IsError?
            <Row className="justify-content-md-center mt-4" >
            <Alert variant="danger">Invalid Data</Alert>
            </Row>:<></>}
        </Container>
    )
}
}

export default observer(RegistrationComponent)