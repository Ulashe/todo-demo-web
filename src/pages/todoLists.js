import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoList,
  generateID,
  getAllLocalTodoLists,
  removeTodoList,
} from "../redux/reducers/localTodoLists";
import { getAuth } from "../redux/reducers/authentication";
import axios from "axios";
import { TodoLists } from "../components";

export default function TodoListsPage() {
  const auth = useSelector(getAuth);
  if (auth.accessToken) {
    return <RemoteTodoLists />;
  } else {
    return <LocalTodoLists />;
  }
}

function RemoteTodoLists() {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    axios.get("/todolists").then((res) => setTodoLists(res.data));
  }, []);

  const addTodoListHandler = ({ title }) => {
    axios.post("/todolists", { title }).then((res) => {
      setTodoLists((todoLists) => [...todoLists, res.data]);
    });
  };
  const removeTodoListHandler = ({ _id }) => {
    axios
      .delete(`/todolists/${_id}`)
      .then(() => setTodoLists((todoLists) => todoLists.filter((i) => i._id != _id)));
  };

  return (
    <TodoLists
      todoLists={todoLists}
      addTodoListHandler={addTodoListHandler}
      removeTodoListHandler={removeTodoListHandler}
    />
  );
}

function LocalTodoLists() {
  const dispatch = useDispatch();
  const todoLists = useSelector(getAllLocalTodoLists);

  const addTodoListHandler = ({ title }) => {
    const _id = generateID();
    dispatch(addTodoList({ title, _id }));
  };

  const removeTodoListHandler = ({ _id }) => {
    dispatch(removeTodoList({ _id }));
  };

  return (
    <TodoLists
      todoLists={todoLists}
      addTodoListHandler={addTodoListHandler}
      removeTodoListHandler={removeTodoListHandler}
    />
  );
}
