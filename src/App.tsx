import React  from 'react'
import TodoListsMain from './components/TodoList/TodoListsMain';
import { observer } from 'mobx-react-lite';
import  TodoListPage  from './components/TodoList/TodoListPage';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import LoginComponent from './components/User/LoginComponent';
import RegistrationComponent from './components/User/RegistrationComponent';



let App:React.FC = () =>{
  return (
    <div>
      <Router>
        <Route exact={true} path="/" component={TodoListsMain} />
        <Route path="/TodoItems/:id" component={TodoListPage}  />
        <Route path="/login" component={LoginComponent} />
        <Route path="/registration" component={RegistrationComponent} />
       </Router>
    </div>
    
  );
}

export default observer(App);
