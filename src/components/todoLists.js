import React from "react";
import { Heading } from "./heading";
import { IconWrapper } from "./iconWrapper";
import { FlexBox, Link, Text } from "./styled-components";
import { TodoListItem } from "./todoListItem";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ModalButton } from "./modals/modalButton";
import { TextButton } from "./textButton";
import { NewTodoList } from "./modals/newTodoList";
import { hslaAdjust } from "../utils/hslaAdjust";
import { Confirm } from "./modals/confirm";
import { ProgressCircle } from "../components/progressCircle";
import { ReactComponent as DoneIcon } from "../assets/icons/done.svg";

export default function TodoLists({ todoLists, addTodoList, removeTodoList }) {
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
            return (
              <FlexBox key={todoList._id} gridColumnGap="5px" alignItems="center">
                <ProgressCircle
                  ratio={counts.completed / todoList.todos.length}
                  angleColor={(theme) => theme.colors.blue[3]}
                >
                  {counts.unCompleted == 0 ? (
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
                      confirmButtonText="Sil"
                      confirmContentText="Todo list'i silmek istediğinizden emin misiniz ?"
                      onConfirm={removeTodoList({ _id: todoList._id })}
                    />
                  }
                >
                  <IconWrapper
                    cursor="pointer"
                    display="flex"
                    center
                    iconSize="32px"
                    borderRadius="10px"
                    hoverBg={(theme) => hslaAdjust({ color: theme.colors.blue[1], lightness: 50 })}
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
      <ModalButton modalContent={<NewTodoList addTodoList={addTodoList} />}>
        <TextButton variant="outlined" p={20}>
          Yeni bir Todo List oluştur
        </TextButton>
      </ModalButton>
    </div>
  );
}
