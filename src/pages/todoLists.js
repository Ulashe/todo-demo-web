import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoList as addTodoListAction,
  getAllLocalTodoLists,
  deleteTodoList,
  generateID,
} from "../redux/reducers/localTodoLists";
import { getAuth } from "../redux/reducers/authentication";
import axios from "axios";
import TodoLists from "../components/todoLists";
import { useNavigate } from "react-router";

export default function TodoListsPage() {
  const auth = useSelector(getAuth);
  if (auth.accessToken) {
    return <RemoteTodoLists />;
  } else {
    return <LocalTodoLists />;
  }
}

function RemoteTodoLists() {
  const navigate = useNavigate();
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    axios.get("/api/todolists").then((res) => setTodoLists(res.data));
  }, []);

  const addTodoList =
    ({ title }) =>
    () => {
      axios.post("/api/todolists", { title }).then((res) => {
        setTodoLists((todoLists) => [...todoLists, res.data]);
        navigate(`/${res.data._id}`);
      });
    };
  const removeTodoList = ({ _id }) => {
    axios
      .delete(`/api/todolists/${_id}`)
      .then(() => setTodoLists((todoLists) => todoLists.filter((i) => i._id != _id)));
  };

  return (
    <TodoLists todoLists={todoLists} addTodoList={addTodoList} removeTodoList={removeTodoList} />
  );
}

function LocalTodoLists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todoLists = useSelector(getAllLocalTodoLists);

  const addTodoList =
    ({ title }) =>
    () => {
      const _id = generateID();
      dispatch(addTodoListAction({ title, _id }));
      navigate(`/${_id}`);
    };
  const removeTodoList =
    ({ _id }) =>
    () => {
      dispatch(deleteTodoList({ _id }));
      console.log(`in removetodolist, _id: ${_id}`);
    };

  return (
    <TodoLists todoLists={todoLists} addTodoList={addTodoList} removeTodoList={removeTodoList} />
  );
}
