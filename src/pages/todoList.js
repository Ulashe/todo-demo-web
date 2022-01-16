import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  getAllLocalTodoLists,
  removeTodo,
  updateTodo,
  updateTodoList,
} from "../redux/reducers/localTodoLists";
import axios from "axios";
import { TodoList, TodoListPlaceholder } from "../components";
import { useIsAuthenticated } from "../utils/hooks/useIsAuthenticated";
import { Text } from "../components/styled-components";

export default function TodoListPage() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <RemoteTodoList />;
  } else {
    return <LocalTodoList />;
  }
}

function RemoteTodoList() {
  const location = useLocation();
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.todoList) {
      setTodoList(location.state.todoList);
      setLoading(false);
    } else {
      axios
        .get("/todolists" + location.pathname)
        .then((res) => {
          setTodoList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            setErrorMessage("Bu kaydı görüntülemek için yetkiniz yok!");
          } else if (err.response.status == 404) {
            setErrorMessage("Böyle bir kayıt bulunamadı!");
          } else if (err.response.status == 400) {
            setErrorMessage("Böyle bir kayıt bulunamadı! Lütfen kayıt id'sini kontrol edin.");
          }
          setLoading(false);
        });
    }
  }, []);

  const addTodoHandler = ({ _id, text }, callback) => {
    axios
      .post(`/todolists/${_id}/todo`, { text })
      .then((res) => {
        setTodoList(res.data);
        if (typeof callback == "function") callback();
      })
      .catch((err) => {
        if (typeof callback == "function") callback(err.response);
      });
  };

  const updateTodoListHandler = ({ _id, update }, callback) => {
    axios
      .patch(`/todolists/${_id}`, update)
      .then((res) => {
        setTodoList(res.data);
        if (typeof callback == "function") callback();
      })
      .catch((err) => {
        if (typeof callback == "function") callback(err.response);
      });
  };

  const updateTodoHandler = ({ _id, todo }, callback) => {
    axios
      .patch(`/todolists/${_id}/todo`, { todo })
      .then((res) => {
        setTodoList(res.data);
        if (typeof callback == "function") callback();
      })
      .catch((err) => {
        if (typeof callback == "function") callback(err.response);
      });
  };

  const removeTodoHandler = ({ _id, todo }, callback) => {
    axios
      .delete(`/todolists/${_id}/todo`, { data: { todo } })
      .then((res) => {
        setTodoList(res.data);
        if (typeof callback == "function") callback();
      })
      .catch((err) => {
        if (typeof callback == "function") callback(err.response);
      });
  };

  return todoList ? (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
      updateTodoHandler={updateTodoHandler}
      removeTodoHandler={removeTodoHandler}
    />
  ) : loading ? (
    <TodoListPlaceholder />
  ) : (
    <Text color="primary" fontSize={32} textAlign="center" p={20}>
      {errorMessage}
    </Text>
  );
}

function LocalTodoList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const todoList = localTodoLists.find((i) => i._id == location.pathname.substring(1));

  const addTodoHandler = ({ _id, text }, callback) => {
    dispatch(addTodo({ _id, text }));
    if (typeof callback == "function") callback();
  };

  const removeTodoHandler = ({ _id, todo }, callback) => {
    dispatch(removeTodo({ _id, todo }));
    if (typeof callback == "function") callback();
  };

  const updateTodoHandler = ({ _id, todo }, callback) => {
    dispatch(updateTodo({ _id, todo }));
    if (typeof callback == "function") callback();
  };

  const updateTodoListHandler = ({ _id, update }, callback) => {
    dispatch(updateTodoList({ _id, update }));
    if (typeof callback == "function") callback();
  };

  return todoList ? (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      removeTodoHandler={removeTodoHandler}
      updateTodoHandler={updateTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
    />
  ) : (
    <Text color="primary" fontSize={32} textAlign="center" p={20}>
      Böyle bir kayıt bulunamadı!
    </Text>
  );
}
