import React  from 'react'
import TodoListsMain from './components/TodoList/TodoListsMain';
import { observer } from 'mobx-react-lite';
import  TodoListPage  from './components/TodoList/TodoListPage';
import { BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import LoginComponent from './components/User/LoginComponent';
import RegistrationComponent from './components/User/RegistrationComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./App.css"
import UserPage from './components/UserPage/UserPageComponents';
import Header from './components/Header/Header';


let App:React.FC = () =>{
  let location = useLocation()
  return (
    <div>
      <Header/>
        <TransitionGroup>
          <CSSTransition
          timeout={300}
          
          classNames="fade"
          key={location?.key}>
          <Switch location={location}>
        <Route exact={true} path="/" component={TodoListsMain} />
        <Route path="/TodoItems/:id" component={TodoListPage}  />
        <Route path="/login" component={LoginComponent} />
        <Route path="/registration" component={RegistrationComponent} />
        <Route path="/userPage" component={UserPage}/>
       </Switch>
       </CSSTransition>
       </TransitionGroup>

    </div>
    
  );
}

export default observer(App);
