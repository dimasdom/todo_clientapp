import axios,{AxiosResponse} from 'axios'
import IUserLogin from '../models/IUserLogin';
import IRegister from '../models/IRegister';
import ITodoList from '../models/ITodoList';
import ITodoItem from '../models/ITodoItem';
import IUserDTOs from '../models/IUserDTOs';
const responseBody = (response: AxiosResponse) => response.data;
axios.defaults.baseURL = "http://localhost:5000/api"
 let agend = {
   SetToken:(token:string)=>{
     debugger
    axios.interceptors.request.use(req => {
      req.headers.authorization = `Bearer ${token} `;
      return req;
    });
   }
   ,
Login: (user:IUserLogin):Promise<IUserDTOs>=>axios.post("/Account",user).then(responseBody)
,
Register:(register:IRegister)=>axios.post("/Account/register",register).then(responseBody)
,
GetTodoLists:  ():Promise<ITodoList[]>=>axios.get("/TodoLists").then(responseBody)
,
GetTodoItems: (Id:string|undefined):Promise<ITodoItem[]>=>axios.get(`/TodoItems/${Id}`).then(responseBody)
,
SetDoneStatus:(id:string|undefined):Promise<boolean>=>axios.post(`/TodoItems/done/${id}`).then(responseBody)
,
CreateTodoItem:(todoItem:ITodoItem)=>axios.post("/TodoItems",todoItem).then(response=>response) ,
DeleteTodoItem:(id:string|undefined)=>axios.delete(`/TodoItems/${id}`).then(response=>response),
ChangeTodoItem:(id:string|undefined , description:string)=>axios.put(`/TodoItems/${id}`).then(response=>response),
CreateTodoList:(todoList:ITodoList,userId:string|undefined)=>axios.post(`/TodoLists`,todoList).then(response=>response),
DeleteTodoList:(id:string,UserId:string)=>axios.delete(`/TodoLists/${id}`).then(responseBody),
GetByUserId:(id:string|undefined)=>axios.get(`/TodoLists`).then(responseBody),
ChangeCommonStatus:(id:string,UserIds:string[])=>axios.post(`/TodoLists/changeCommonStatus/${id}`,{UserIds}).then(responseBody),
SendFriendRequest:(id:string,UserId:string)=>axios.post(`/Account/sentFriendRequest/${id}`).then(responseBody),
AcceptFriendRequest:(id:string,UserId:string)=>axios.post(`/Account/acceptFriendRequest/${id}`).then(responseBody),
SearchUsersByUserName:(UserName:string)=>axios.post('/Account/searchUser',{UserName}).then(responseBody),
SetAvatar:(id:string,avatar:any):Promise<string>=>{let formData = new FormData();formData.append('avatar',avatar);console.log(avatar);return axios.post(`/Account/setAvatar`,formData,{headers:{'Content-type':'multipart/form-data'}}).then(responseBody)}


}

export default agend