import React from "react";
import { Heading } from "./heading";
import { IconWrapper } from "./iconWrapper";
import { FlexBox, Link } from "./styled-components";
import { TodoListItem } from "./todoListItem";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ModalButton } from "./modals/modalButton";
import { TextButton } from "./textButton";
import { NewTodoList } from "./modals/newTodoList";
import { hslAdjust } from "../utils/hslAdjust";

export default function TodoLists({ todoLists, addTodoList, removeTodoList }) {
  return (
    <div>
      <Heading>Todo Lists</Heading>
      <FlexBox flexDirection="column" gridRowGap="10px" my="10px">
        {todoLists.length > 0 ? (
          todoLists.map((todo) => (
            <FlexBox key={todo._id}>
              <Link to={`/${todo._id}`} state={{ todo }} flex={1}>
                <TodoListItem>{todo.title}</TodoListItem>
              </Link>
              <IconWrapper
                onClick={removeTodoList({ _id: todo._id })}
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
          ))
        ) : (
          <div>Hiç todo list yok</div>
        )}
      </FlexBox>
      <ModalButton modalContent={<NewTodoList addTodoList={addTodoList} />}>
        <TextButton variant="outlined">Yeni bir Todo List oluştur</TextButton>
      </ModalButton>
    </div>
  );
}
