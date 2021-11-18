import { combineReducers } from "redux";
import auth from "./auth";
import theme from "./theme";
import localTodoLists from "./localTodoLists";

export default combineReducers({ auth, theme, localTodoLists });
