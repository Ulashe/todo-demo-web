import React from "react";
import { Heading, IconWrapper, ProgressCircle, TextButton, TodoListItem } from "./";
import { FlexBox, Link, Text } from "./styled-components";
import { hslaAdjust } from "../utils/hslaAdjust";
import { DeleteIcon, DoneIcon, MoreIcon } from "../assets/icons";
import { Confirm, ModalButton, NewTodoList } from "./modals";

export function TodoLists({ todoLists, addTodoListHandler, removeTodoListHandler }) {
  return (
    <div>
      <Heading>Todo Lists</Heading>
      <FlexBox flexDirection="column" gridRowGap="10px" my="10px">
        {todoLists.length > 0 ? (
          todoLists.map((todoList) => {
            const counts = todoList.todos.reduce(
              (acc, item) => {
                item.isCompleted ? acc.completed++ : acc.unCompleted++;
                return acc;
              },
              { completed: 0, unCompleted: 0 }
            );
            const removeTodoList = (cb) => removeTodoListHandler({ _id: todoList._id }, cb);
            return (
              <FlexBox key={todoList._id} gridColumnGap="5px" alignItems="stretch">
                <ProgressCircle
                  ratio={todoList.todos.length > 0 ? counts.completed / todoList.todos.length : 0}
                  angleColor={(theme) => theme.colors.blue[3]}
                >
                  {todoList.todos.length == 0 ? (
                    <IconWrapper iconSize={32}>
                      <MoreIcon />
                    </IconWrapper>
                  ) : counts.unCompleted == 0 ? (
                    <IconWrapper iconSize={32}>
                      <DoneIcon />
                    </IconWrapper>
                  ) : (
                    <div>
                      <Text fontSize={20} textAlign="center">
                        {counts.unCompleted}
                      </Text>
                      <Text fontSize={10}>kalan</Text>
                    </div>
                  )}
                </ProgressCircle>
                <Link to={todoList._id} flex={1} overflow="hidden">
                  <TodoListItem title={todoList.title} counts={counts} />
                </Link>
                <ModalButton
                  modalContent={
                    <Confirm
                      buttonText="Sil"
                      contentText="Todo list'i silmek istediğinizden emin misiniz ?"
                      onConfirm={removeTodoList}
                    />
                  }
                >
                  <IconWrapper
                    cursor="pointer"
                    display="flex"
                    center
                    iconSize="32px"
                    borderRadius="10px"
                    hoverBg={(theme) => hslaAdjust({ color: theme.colors.blue[1], l: 50 })}
                  >
                    <DeleteIcon />
                  </IconWrapper>
                </ModalButton>
              </FlexBox>
            );
          })
        ) : (
          <div>Hiç todo list yok</div>
        )}
      </FlexBox>
      <ModalButton modalContent={<NewTodoList addTodoListHandler={addTodoListHandler} />}>
        <TextButton variant="outlined" p={20}>
          Yeni bir Todo List oluştur
        </TextButton>
      </ModalButton>
    </div>
  );
}
