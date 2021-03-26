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
CreateTodoList:(todoList:ITodoList)=>axios.post("/TodoLists",todoList).then(response=>response),
DeleteTodoList:(id:string)=>axios.delete(`/TodoLists/${id}`).then(responseBody)


}

export default agend