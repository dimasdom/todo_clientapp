import TodoListsMain from './components/TodoList/TodoListsMain';
import { observer } from 'mobx-react-lite';
import { TodoListPage } from './components/TodoList/TodoListPage';
import {Router} from "@reach/router"


function App()   {
  return (
    
    <div>
      <Router>

              <TodoListsMain path="/"/>


       <TodoListPage path="/:id"/>
       </Router>
    </div>
    
  );
}

export default observer(App);
