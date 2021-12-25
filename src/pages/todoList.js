import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import { addTodo as addTodoAction, getAllLocalTodoLists } from "../redux/reducers/localTodoLists";
import axios from "axios";
import TodoList from "../components/todoList";

export default function TodoListPage() {
  const auth = useSelector(getAuth);
  if (auth.accessToken) {
    return <RemoteTodoList />;
  } else {
    return <LocalTodoList />;
  }
}

function RemoteTodoList() {
  const location = useLocation();
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    if (location.state && location.state.todoList) {
      setTodoList(location.state.todoList);
    } else {
      axios.get("/api/todolists" + location.pathname).then((res) => setTodoList(res.data));
    }
  }, []);

  return <TodoList todoList={todoList} />;
}

function LocalTodoList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const todoList = localTodoLists.find((i) => i._id == location.pathname.substring(1));

  const addTodo =
    ({ _id, text }, callback) =>
    (e) => {
      e.preventDefault();
      if (callback) {
        callback();
      }
      dispatch(addTodoAction({ _id, text }));
    };

  return <TodoList todoList={todoList} addTodo={addTodo} />;
}
