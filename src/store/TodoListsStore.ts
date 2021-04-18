import { observable, makeObservable, action, runInAction } from "mobx";
import agend from "../agend/agend";
import ITodoList from "../models/ITodoList";
import { RootStore } from "./RootStore";
import { v4 as uuidv4 } from "uuid";
class TodoListsStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }
  @observable TodoLists: ITodoList[] | null = null;
  @observable TodoListsMapped = new Map<string, ITodoList>();
  @observable Error: number | null = null;
  @action SetTodoLists = (todolists: ITodoList[]) => {
    runInAction(() => {
      this.TodoLists = todolists;
    });
  };
  @action GetTodoLists = async () => {
    let data = await agend.TodoList.GetByUserId(
      this.rootStore.user.UserData?.id
    );
    runInAction(() => {
      this.SetTodoLists(data);
      data.forEach((i: ITodoList) => {
        this.TodoListsMapped.set(i.id, i);
      });
    });
  };

  @action CreateTodoList = async (name: string) => {
    if (this.rootStore.user.UserData?.id) {
      let todoList: ITodoList = {
        id: uuidv4(),
        tittle: name,
        userId: this.rootStore.user.UserData?.id,
        common: false,
        userIds: JSON.stringify([this.rootStore.user.UserData.id]),
      };
      let response = await agend.TodoList.CreateTodoList(
        todoList,
        this.rootStore.user.UserData.id
      );
      if (response.status === 500) {
        this.Error = response.status;
      } else {
        runInAction(() => {
          this.TodoLists?.push(todoList);
          this.Error = null;
        });
      }
    }
  };
  @action ChangeCommonStatus = async (id: string, userIds: string[]) => {
    await agend.TodoList.ChangeCommonStatus(id, userIds);
    let newTodoListData = this.TodoLists?.filter((i) => i.id == id);
    if (newTodoListData) {
      newTodoListData[0].common = true;
      newTodoListData[0].userId = JSON.stringify(userIds);
      this.TodoListsMapped.set(id, newTodoListData![0]);
    }
  };
  @action DeleteTodoList = async (id: string) => {
    let status = await agend.TodoList.DeleteTodoList(
      id,
      this.rootStore.user.UserData?.id!
    );
    let todoLists = this.TodoLists?.filter((i) => i.id !== id);
    this.TodoLists = todoLists ? todoLists : [];
  };
}

export default TodoListsStore;
