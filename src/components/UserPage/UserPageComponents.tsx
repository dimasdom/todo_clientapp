import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom'
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import PhotoDropZone from '../PhotoUpload/PhotoDropZone';
import * as Icon from 'react-bootstrap-icons'


const UserPage: React.FC<RouteComponentProps> = (props) => {
    let [search, setSearch] = useState("")
    let [changeA, setChangeA] = useState(false)
    let [photo, setPhoto] = useState<any>()
    const context = useContext(RootStore)
   

    return (
        <Container >
            <Row className="mt-4"><Col>{changeA ?<>{photo?<>
            <p>{photo[0].name}</p><br/>
            <Button onClick={()=>{context.user.SetAvatar(photo[0])}}>Upload New Avatar</Button>
            </>
            :
                <PhotoDropZone setPhoto={setPhoto} />
            }</>
                :
                <> <img  className="AvatarImage shadow-lg" width={500} height={500}
                    src={context.user.UserData?.avatar ?
                        context.user.UserData?.avatar
                        : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}>
                </img>
                    <br />
                    <Button className="ChangeAvatarButton" onClick={() => { setChangeA(true) }}>Change Avatar</Button></>}
            </Col>
                <Col ><p className="display-4">{context.user.UserData?.userName}</p>
                    <p className="display-6">Friends:{context.user.UserData?.usersFriends.length}</p>
                    <p>Lists:{context.todoLists.TodoLists?.length}</p></Col></Row>
                    <Row>
                        <Col>
            <Row className="mt-4">
                <p>Friend Requests:</p>
            </Row>
            <Row><Col>{
            context.user.UserData?.userFriendsRequests.map(i => <><p>{i.userName}<Button className="ml-4" onClick={() => { context.user.AcceptFriendRequest(i) }}>Accept</Button></p>
                    </>)}
            </Col></Row>
            </Col>
            <Col>
            <Row><Col><p>Friends:
                {context.user.UserData?.usersFriends.map(i => <img className="m-2" src={i.avatar} height="50px" width="50px"  ></img>)}</p></Col>
            </Row>
            </Col>
            <Col>
            <Row>
                <Col>
                <p>Find an user for add to friends</p>
                
                <input value={search} onChange={(e) => { setSearch(e.target.value) }}></input>
                
                <Icon.Search className="ml-4" onClick={() => { context.user.SearchUserByUserName(search) }} >Search</Icon.Search>
                </Col>
                </Row>
            <Row className="mt-4" >{search.length ? context.user.SearchResult ? <> <p>{context.user.SearchResult?.userName}</p>
                <Button className="ml-2" onClick={() => { context.user.SendFriendRequest(context.user.SearchResult?.id!) }}>Add to Friends</Button></> : "No User with that nickname" : ""}</Row>
                </Col></Row>
        </Container>
    )
}

export default observer(UserPage)