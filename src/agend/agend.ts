import axios,{AxiosResponse} from 'axios'
import IUserLogin from '../models/IUserLogin';
import IRegister from '../models/IRegister';
import ITodoList from '../models/ITodoList';
import ITodoItem from '../models/ITodoItem';
const responseBody = (response: AxiosResponse) => response.data;
axios.defaults.baseURL = "http://localhost:5000/api"
axios.interceptors.request.use(req => {
    // `req` is the Axios request config, so you can modify
    // the `headers`.
    req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImJhZGFzaCIsIm5hbWVpZCI6IjEzMzUzOTBiLTkwNGMtNDQwYS1iNDI3LWZjM2ZmMTI1OGM0NSIsImVtYWlsIjoiZGltYXNkb21AdWtyLm5ldCIsIm5iZiI6MTYxNTMxMTA3NCwiZXhwIjoxNjE1OTE1ODc0LCJpYXQiOjE2MTUzMTEwNzR9.j5IeLD9kWYiiyEHoiWlWejE57yolpwysv6yS7YEsYyE';
    return req;
  });

 let agend = {
Login:async (user:IUserLogin)=>{
    return axios.post("/Account",user)
},
Register:async(register:IRegister)=>{
    return axios.post("/Account/register",register)
},
GetTodoLists:  ():Promise<ITodoList[]>=>axios.get("/TodoLists").then(responseBody)
,
GetTodoItems: (Id:string|undefined):Promise<ITodoItem[]>=>axios.get(`/TodoItems/${Id}`).then(responseBody)
,
SetDoneStatus:(id:string|undefined):Promise<boolean>=>axios.post(`/TodoItems/done/${id}`).then(responseBody)

}

export default agend