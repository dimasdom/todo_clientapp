import { observable, action, makeObservable, runInAction } from 'mobx';
import IUserDTOs from '../models/IUserDTOs';
import IRegister from '../models/IRegister';
import IUserLogin from '../models/IUserLogin';
import agend from '../agend/agend';
import { RootStore } from './RootStore';

class UserStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this)
    this.rootStore = rootStore;
  }
  
@observable UserData : IUserDTOs | null = null;
@observable IsLogin : boolean = false ;
@observable SearchResult :IUserDTOs|null =null;
@observable IsError:string|number|null=null;
@observable IsLoading:boolean=false;


@action SignIn = async (login:IUserLogin)=>{
  this.IsLoading=true;
let data:any = await agend.Login(login)
console.log(data.status);
if(data.status){
  runInAction(()=>{
    this.IsError=data.status
  })
}else{
  agend.SetToken(data.token)
  runInAction(()=>{
    this.UserData = data
    this.IsLogin = true
  })
}
this.IsLoading=false;
/*console.log(remember)
if(remember){
  
  window.localStorage.setItem("login",(new Date().getTime()+259200000).toString())
  window.localStorage.setItem("jwt",data.token)
  window.localStorage.setItem("userData",JSON.stringify(data))
}*/


}
@action SignOut = async ()=>{
 await agend.SignOut()
this.UserData = null
this.IsLogin = false
}
@action SignUp = async (register:IRegister)=>{
let data = await agend.Register(register)
if(data.status){
  runInAction(()=>{
    this.IsError = data.status
  })
}
}
@action CheckLogin = ()=>{
  let loginLocal =window.localStorage.getItem("login")
  let userLocal = window.localStorage.getItem("userData")
  let jwt = window.localStorage.getItem("jwt")
  console.log(userLocal)
  console.log(loginLocal)
  console.log(jwt)
        if(loginLocal !==null && userLocal!==null&&jwt!==null){
            if(parseInt(loginLocal)>new Date().getTime()){
                this.IsLogin = true
                this.UserData = JSON.parse(userLocal)
                agend.SetToken(jwt)
            }else{
              window.localStorage.removeItem("login")
              window.localStorage.removeItem("jwt")
              window.localStorage.removeItem("userData")
            }
        }
}
@action SendFriendRequest = async (id:string)=>{

let status = await agend.SendFriendRequest(id,this.UserData?.id!)
}
@action AcceptFriendRequest = async (i:IUserDTOs)=>{
  await agend.AcceptFriendRequest(i.id,this.UserData?.id!)
  let newUserData:IUserDTOs ={
    userName:this.UserData?.userName!,
    id:this.UserData?.id!,
    token:this.UserData?.token!,
    avatar:this.UserData?.avatar!,
    usersFriends:this.UserData?.usersFriends!,
    userFriendsRequests:this.UserData?.usersFriends.filter(r=>r.id!==i.id)!

  }
  this.UserData=newUserData;
  this.UserData?.usersFriends.push(i)
}
@action SearchUserByUserName = async (userName:string)=>{
  this.SearchResult = await agend.SearchUsersByUserName(userName)
}
@action SetLocalAvatar = (avatar:string)=>{
  let newUserData:IUserDTOs ={
    userName:this.UserData?.userName!,
    id:this.UserData?.id!,
    token:this.UserData?.token!,
    avatar:avatar,
    usersFriends:this.UserData?.usersFriends!,
    userFriendsRequests:this.UserData?.userFriendsRequests!

  }
runInAction(()=>{
 this.UserData = newUserData
})
}
@action SetAvatar=async(avatar:any)=>{
  let newAvatar = await await agend.SetAvatar(this.UserData?.id!,avatar);
  this.SetLocalAvatar(newAvatar)
  
}
@action ClearSearchResult = ()=>{
  runInAction(()=>{
    this.SearchResult=null;
  })
}
}

export default UserStore