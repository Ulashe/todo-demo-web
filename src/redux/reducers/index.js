import { combineReducers } from "redux";
import auth from "./auth";
import theme from "./theme";

export default combineReducers({ auth, theme });
