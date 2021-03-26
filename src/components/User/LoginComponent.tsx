
import React, { useContext, useEffect,useState } from 'react'
import { observer } from 'mobx-react-lite';
import  RootStore from '../../store/RootStore';
import { Button, Container, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';


let LoginComponent:React.FC<RouteComponentProps> = (props) => {
    console.log("Component ReRender")
    const context  = useContext(RootStore)
    let Login = (email:string,password:string)=>{
        console.log(email+password)
        context.user.SignIn({Email:email , Password:password},remember)
    }
    useEffect(()=>{
        if(context.user.IsLogin){
            props.history.push("/")
        }
    },[context.user.IsLogin])
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [remember,setRemember] = useState(false)
    return(
        <Container>
            <Row className="justify-content-md-center mt-4">
                <p className="display-4">LogIn</p>
            </Row>
            <Row className="justify-content-md-center mt-4">Email</Row>
            <Row className="justify-content-md-center ">
                
            <input value={email} type="email" onChange={(e)=>{setEmail(e.target.value)}} ></input>
            </Row >
            <Row className="justify-content-md-center mt-3">Password</Row>
            <Row className="justify-content-md-center ">
            <input value={password} type="password" onChange={(e)=>{setPassword(e.target.value)}}></input> 
            </Row>
            
            <Row className="justify-content-md-center mt-4" >
            <Button onClick={()=>{Login(email,password)}}>LogIn</Button>
            </Row>
            <Row className="justify-content-md-center mt-4" >
            <p className="mr-2">Remember me</p><input onClick={(e)=>{setRemember(remember?false:true)}} type="checkbox"></input>
            </Row>
            <Row className="justify-content-md-center mt-4" >
            <Link to="/registration">Don't have account </Link>
            </Row>
        </Container>
    )
}

export default observer(LoginComponent)