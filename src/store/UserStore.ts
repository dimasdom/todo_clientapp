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
@action SignIn = async (login:IUserLogin,remember:boolean)=>{
let data = await agend.Login(login)
console.log(remember)
if(remember){
  
  window.localStorage.setItem("login",(new Date().getTime()+259200000).toString())
  window.localStorage.setItem("jwt",data.token)
  window.localStorage.setItem("userData",JSON.stringify(data))
}
agend.SetToken(data.token)
this.UserData = data
runInAction(()=>{
  this.IsLogin = true
})

}
@action SignOut = ()=>{
this.UserData = null
this.IsLogin = false
window.localStorage.removeItem("login")
              window.localStorage.removeItem("jwt")
              window.localStorage.removeItem("userData")
}
@action SignUp = async (register:IRegister)=>{
let data = await agend.Register(register)
window.localStorage.setItem("jwt",data.token)
agend.SetToken(data.token)
this.UserData = data
this.IsLogin = true
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
}

export default UserStore