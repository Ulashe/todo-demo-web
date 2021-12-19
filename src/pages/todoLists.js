import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocalTodoLists, deleteTodoList } from "../redux/reducers/localTodoLists";
import Heading from "../components/heading";
import { TodoListItem } from "../components/todoListItem";
import { TextButton } from "../components/textButton";
import { ModalButton } from "../components/modals/modalButton";
import { NewTodoList } from "../components/modals/newTodoList";
import { FlexBox } from "../components/styled-components";
import IconWrapper from "../components/iconWrapper";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { hslAdjust } from "../utils/hslAdjust";

export default function TodoLists() {
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const dispatch = useDispatch();
  const remove = (_id) => () => dispatch(deleteTodoList({ _id }));

  return (
    <div>
      <Heading>Todo Lists</Heading>
      <FlexBox flexDirection="column" gridRowGap="10px" my="10px">
        {localTodoLists.map((todo) => (
          <FlexBox key={todo._id}>
            <TodoListItem>{todo.title}</TodoListItem>
            <IconWrapper
              onClick={remove(todo._id)}
              cursor="pointer"
              display="flex"
              center
              iconSize="32px"
              borderRadius="10px"
              hoverBg={(theme) => hslAdjust(theme.colors.blue[1], 50)}
            >
              <DeleteIcon />
            </IconWrapper>
          </FlexBox>
        ))}
      </FlexBox>
      <ModalButton modalContent={<NewTodoList />}>
        <TextButton variant="outlined">Yeni bir Todo List oluştur</TextButton>
      </ModalButton>
    </div>
  );
}
