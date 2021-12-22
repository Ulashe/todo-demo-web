import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import { getAllLocalTodoLists } from "../redux/reducers/localTodoLists";
import axios from "axios";
import { Heading } from "../components/heading";

export default function TodoList() {
  const location = useLocation();
  const auth = useSelector(getAuth);
  const [todo, setTodo] = useState();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  useEffect(() => {
    if (location.state && location.state.todo) {
      setTodo(location.state.todo);
    } else {
      if (auth.accessToken) {
        axios.get("/api/todolists" + location.pathname).then((res) => setTodo(res.data));
      } else {
        setTodo(localTodoLists.find((i) => i._id == location.pathname.substr(1)));
      }
    }
  }, [auth]);

  if (!todo) return <div />;

  return (
    <div>
      <Heading>Todo List Detay</Heading>
    </div>
  );
}
