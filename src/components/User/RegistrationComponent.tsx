
import React, { useContext, useEffect,useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import  RootStore  from '../../store/RootStore';


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
    return(
        <Container>
            <Row className="justify-content-md-center m-4">
                <p className="display-4">Registration</p>
            </Row>
            <Row className="justify-content-md-center mt-4 "><p>Email</p></Row>
            <Row className="justify-content-md-center ">
                
                
            <input value={email} type="email" onChange={(e)=>{setEmail(e.target.value)}} ></input>
            </Row >
            <Row className="justify-content-md-center "><label>User Name</label></Row>
            <Row className="justify-content-md-center mt-1">
            
            <input value={userName} onChange={(e)=>{setUserName(e.target.value)}}></input> 
            </Row>
            <Row className="justify-content-md-center "><label>Password</label></Row>
            <Row className="justify-content-md-center mt-1">
            
            <input value={password} type="password" onChange={(e)=>{setPassword(e.target.value)}}></input> 
            </Row>
            <Row className="justify-content-md-center mt-4" >
            <Button onClick={()=>{context.user.SignUp({Email:email,Password:password,UserName:userName})}}>Register</Button>
            </Row>
        </Container>
    )
}

export default RegistrationComponent