import React from "react";
import { Heading } from "./heading";
import { IconWrapper } from "./iconWrapper";
import { FlexBox, Link, Text } from "./styled-components";
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
          todoLists.map((todoList) => (
            <FlexBox key={todoList._id} gridColumnGap="5px">
              <Link to={todoList._id} flex={1} overflow="hidden">
                <TodoListItem todoList={todoList} />
              </Link>
              <IconWrapper
                onClick={removeTodoList({ _id: todoList._id })}
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
        <TextButton variant="outlined" p={20}>
          Yeni bir Todo List oluştur
        </TextButton>
      </ModalButton>
    </div>
  );
}
