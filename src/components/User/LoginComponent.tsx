
import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import RootStore from '../../store/RootStore';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';

let LoginComponent: React.FC<RouteComponentProps> = (props) => {
    console.log("Component ReRender")
    const context = useContext(RootStore)
    let Login = (email: string, password: string) => {
        console.log(email + password)
        context.user.SignIn({ Email: email, Password: password })

    }
    useEffect(() => {
        if (context.user.IsLogin) {
            props.history.push("/")
        }
    }, [context.user.IsLogin])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    if (context.user.IsLoading) {
        return (
            <Container className="LoaderContainer">
                <div className="lds-heart"><div></div></div>
            </Container>
        )
    } else {
        return (
            <Container>

                <Row className="justify-content-md-center mt-4">
                    <p className="display-4">LogIn</p>
                </Row>
                <Row className="justify-content-md-center mt-4">Email</Row>
                <Row className="justify-content-md-center ">

                    <input value={email} type="email" onChange={(e) => { setEmail(e.target.value) }} ></input>
                </Row >
                <Row className="justify-content-md-center mt-3">Password</Row>
                <Row className="justify-content-md-center ">
                    <input value={password} type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                </Row>

                <Row className="justify-content-md-center mt-4" >
                    <Button type="submit" onClick={() => { Login(email, password) }}>LogIn</Button>
                </Row>
                {
                    context.user.IsError ? <Row className="justify-content-md-center mt-4">
                        <Alert variant="danger">User with this data doesn't exist</Alert>
                    </Row> : <></>
                }
                <Row className="justify-content-md-center mt-4" >
                    <Link to="/registration">Don't have account </Link>
                </Row>
            </Container>
        )
    }

}

export default observer(LoginComponent)