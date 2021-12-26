import React, { useState } from "react";
import { Heading } from "./heading";
import { Box, FlexBox, Text } from "./styled-components";
import TodoItem from "./todoItem";
import { TextInput } from "./textInput";
import { TextButton } from "./textButton";
import { IconWrapper } from "./iconWrapper";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { hslAdjust } from "../utils/hslAdjust";

export default function TodoList({ todoList, addTodo, removeTodo }) {
  const [text, setText] = useState("");
  const unCompletedTodosCount = todoList.todos.reduce(
    (acc, item) => (item.isCompleted ? acc : ++acc),
    0
  );
  return (
    <div>
      <Heading>{todoList.title}</Heading>
      <FlexBox mt={20} vertical gridRowGap={20}>
        <Text color="blue.3" fontSize={18}>
          Oluşturulma tarihi: {new Date(todoList.createdAt).toLocaleString()}
        </Text>
        <Text color="blue.3" fontSize={18}>
          Son güncellenme tarihi: {new Date(todoList.updatedAt).toLocaleString()}
        </Text>
        <FlexBox alignItems="baseline" justifyContent="space-between">
          <FlexBox alignItems="baseline">
            <Text color="blue.1" fontSize={28} fontWeight={500}>
              Todos
            </Text>
            <Text color="blue.3" ml={20}>
              Tamamlanmamış todo sayısı: {unCompletedTodosCount}
            </Text>
          </FlexBox>
          <FlexBox gridColumnGap={10} alignItems="center">
            <Text color="blue.3" fontSize={18} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodo({ _id: todoList._id, text }, () => setText(""))}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodo({ _id: todoList._id, text }, () => setText(""))}
            >
              Ekle
            </TextButton>
          </FlexBox>
        </FlexBox>
        <FlexBox vertical gridRowGap={10}>
          {todoList.todos.length > 0 ? (
            todoList.todos.map((todo) => (
              <FlexBox key={todo._id}>
                <TodoItem flex={1} todo={todo} />
                <IconWrapper
                  // onClick={removeTodo({ _id: todo._id })}
                  cursor="pointer"
                  display="flex"
                  center
                  iconSize="32px"
                  borderRadius="10px"
                  hoverBg={(theme) => hslAdjust(theme.colors.blue[1], 50)}
                >
                  <DeleteIcon />
                </IconWrapper>{" "}
              </FlexBox>
            ))
          ) : (
            <div>Hiç todo yok</div>
          )}
        </FlexBox>
        {todoList.todos.length > 3 ? (
          <FlexBox gridColumnGap={20} alignItems="center">
            <Text color="blue.3" fontSize={18} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodo({ _id: todoList._id, text }, () => setText(""))}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodo({ _id: todoList._id, text }, () => setText(""))}
            >
              Ekle
            </TextButton>
          </FlexBox>
        ) : null}
      </FlexBox>
    </div>
  );
}
