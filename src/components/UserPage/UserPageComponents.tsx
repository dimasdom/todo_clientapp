import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom'
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import PhotoDropZone from '../PhotoUpload/PhotoDropZone';


const UserPage: React.FC<RouteComponentProps> = (props) => {
    let [search, setSearch] = useState("")
    let [changeA, setChangeA] = useState(false)
    let [photo, setPhoto] = useState<any>()
    const context = useContext(RootStore)


    return (
        <Container>
            <Row><Col>{changeA ?<>{photo?<>
            <p>{photo[0].name}</p><br/>
            <Button onClick={()=>{context.user.SetAvatar(photo[0])}}>Upload New Avatar</Button>
            </>
            :
                <PhotoDropZone setPhoto={setPhoto} />
            }</>
                :
                <> <img width={500} height={500}
                    src={context.user.UserData?.avatar ?
                        context.user.UserData?.avatar
                        : "https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"}>
                </img>
                    <br />
                    <Button onClick={() => { setChangeA(true) }}>Change Avatar</Button></>}
            </Col>
                <Col><p>{context.user.UserData?.userName}</p>
                    <p>Friends:{context.user.UserData?.usersFriends.length}</p>
                    <p>Lists:{context.todoLists.TodoLists?.length}</p></Col></Row>
            <Row>
                <p>Friend Requests</p>
                {
                    context.user.UserData?.userFriendsRequests.map(i => <><p>{i}</p><Button onClick={() => { context.user.AcceptFriendRequest(i) }}>Accept</Button>
                    </>)
                }
            </Row>
            <Row><Col><p>Friends:</p>

            </Col></Row>
            <Row>{context.user.UserData?.usersFriends.map(i => <p>{i}</p>)}</Row>
            <Row><Col><p>Find your friend</p></Col><Col><input value={search} onChange={(e) => { setSearch(e.target.value) }}></input></Col><Button onClick={() => { context.user.SearchUserByUserName(search) }} >Search</Button></Row>
            <Row>{search.length ? context.user.SearchResult ? <> <p>{context.user.SearchResult?.userName}</p>
                <Button onClick={() => { context.user.SendFriendRequest(context.user.SearchResult?.id!) }}>Add to Friends</Button></> : "No User with that nickname" : ""}</Row>
        </Container>
    )
}

export default observer(UserPage)