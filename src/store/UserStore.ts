import { observable, action } from 'mobx';
import IUserDTOs from '../models/IUserDTOs';
import IRegister from '../models/IRegister';
import IUserLogin from '../models/IUserLogin';
import agend from '../agend/agend';
import { RootStore } from './RootStore';
class UserStore {
    rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
@observable UserData : IUserDTOs | null = null;
@action SignIn = async (login:IUserLogin)=>{
await agend.Login(login).then(response=>this.UserData=response.data)
}
@action SignOut = ()=>{
this.UserData = null
}
@action SignUp = async (register:IRegister)=>{
await agend.Register(register).then(response=>this.UserData = response.data)
}
}

export default UserStore