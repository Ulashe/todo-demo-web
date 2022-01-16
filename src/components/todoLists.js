import React from "react";
import { Heading, IconWrapper, ProgressCircle, TextButton, TodoListItem } from "./";
import { Box, FlexBox, Link, Text } from "./styled-components";
import { hslaAdjust } from "../utils/hslaAdjust";
import { DeleteIcon, DoneIcon, MoreIcon } from "../assets/icons";
import { Confirm, ModalButton, NewTodoList } from "./modals";

export function TodoLists({ todoLists, loading, addTodoListHandler, removeTodoListHandler }) {
  return (
    <div>
      <Heading>Todo Lists</Heading>
      <FlexBox flexDirection="column" gridRowGap="10px" my="20px">
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
                  <TodoListItem title={todoList.title} />
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
        ) : loading ? (
          [1, 2, 3, 4].map((i, index) => (
            <FlexBox key={index} gridColumnGap="5px" alignItems="stretch">
              <Box borderRadius="50%" bg="#ccc" width={60} height={60} />
              <Box flex={1} borderRadius={10} bg="#ccc" height={60} />
              <Box borderRadius={10} bg="#ccc" height={60} width={32} />
            </FlexBox>
          ))
        ) : (
          <Text color="primary" fontSize={32} textAlign="center" p={20}>
            Hiç bir kayıt bulunamadı!
          </Text>
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
