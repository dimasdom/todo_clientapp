import React, { useContext,useState,useEffect} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom'
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react-lite';


const UserPage: React.FC<RouteComponentProps> = (props) => {
    let [search,setSearch]=useState("")
    
    const context = useContext(RootStore)


    return (
        <Container>
            <Row><Col><img></img></Col>
                <Col><p>{context.user.UserData?.userName}</p>
                <p>Friends:{context.user.UserData?.usersFriends.length}</p>
                <p>Lists:{context.todoLists.TodoLists?.length}</p></Col></Row>
                <Row>
                    <p>Friend Requests</p>
                    {
                        context.user.UserData?.userFriendsRequests.map(i=><><p>{i}</p><Button onClick={()=>{context.user.AcceptFriendRequest(i)}}>Accept</Button>
                        </>)
                    }
                </Row>
            <Row><Col><p>Friends:</p>
            
            </Col></Row>
            <Row>{context.user.UserData?.usersFriends.map(i=><p>{i}</p>)}</Row>
            <Row><Col><p>Find your friend</p></Col><Col><input value={search} onChange={(e)=>{setSearch(e.target.value)}}></input></Col><Button onClick={()=>{context.user.SearchUserByUserName(search)}} >Search</Button></Row>
            <Row>{search.length? context.user.SearchResult ?<> <p>{context.user.SearchResult?.userName}</p>
            <Button onClick={()=>{context.user.SendFriendRequest(context.user.SearchResult?.id!)}}>Add to Friends</Button></>:"No User with that nickname" :""}</Row>
        </Container>
    )
}

export default observer(UserPage)