export default interface IUserDTOs{
    userName:string,
    id:string,
    token:string,
    avatar:string,
    usersFriends:IUserDTOs[],
    userFriendsRequests:IUserDTOs[]
}