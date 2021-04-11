import React ,{useContext}from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RootStore from '../../store/RootStore'
import { observer } from 'mobx-react-lite';

export const Header:React.FC = () => {
  const context = useContext(RootStore)
  if(context.user.IsLogin){
    return(
        <Navbar bg="light" expand="lg">
  <Navbar.Brand >Le Carnet</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Item className="m-2" ><Link onClick={()=>{
        context.todoItems.StopHubConnection()
      }} to="/">Home</Link></Nav.Item>
      <Nav.Item className="m-2" ><Link onClick={()=>{
        context.todoItems.StopHubConnection()
      }} to="/userPage">Profile</Link></Nav.Item>
      
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
  }else{
    return(<></>)
  }
}

export default observer(Header);