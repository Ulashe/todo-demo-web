import React, { useState } from "react";
import { Heading } from "./heading";
import { Box, FlexBox, Text } from "./styled-components";
import { TextInput } from "./textInput";
import { TextButton } from "./textButton";
import { IconWrapper } from "./iconWrapper";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { hslaAdjust } from "../utils/hslaAdjust";

export default function TodoList({
  todoList,
  addTodoHandler,
  removeTodoHandler,
  updateTodoHandler,
}) {
  const [text, setText] = useState("");
  const unCompletedTodosCount = todoList.todos.reduce(
    (acc, item) => (item.isCompleted ? acc : ++acc),
    0
  );

  return (
    <div>
      <Heading>{todoList.title}</Heading>
      <FlexBox mt={20} vertical gridRowGap={20}>
        <Text color="blue.3" fontSize={[14, 18]}>
          Oluşturulma tarihi: {new Date(todoList.createdAt).toLocaleString()}
        </Text>
        <Text color="blue.3" fontSize={[14, 18]}>
          Son güncellenme tarihi: {new Date(todoList.updatedAt).toLocaleString()}
        </Text>
        <FlexBox
          alignItems="baseline"
          justifyContent="space-between"
          flexWrap="wrap"
          gridRowGap="20px"
          gridColumnGap="20px"
        >
          <FlexBox alignItems="baseline">
            <Text color="blue.1" fontSize={28} fontWeight={500}>
              Todos
            </Text>
            <Text color="blue.3" ml={20}>
              Tamamlanmamış todo sayısı: {unCompletedTodosCount}
            </Text>
          </FlexBox>
          <FlexBox gridColumnGap={10} alignItems="center">
            <Text color="blue.3" fontSize={[18]} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodoHandler({ _id: todoList._id, text }, () => setText(""))}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodoHandler({ _id: todoList._id, text }, () => setText(""))}
            >
              Ekle
            </TextButton>
          </FlexBox>
        </FlexBox>
        <FlexBox vertical gridRowGap={10}>
          {todoList.todos.length > 0 ? (
            todoList.todos.map((todo) => (
              <FlexBox key={todo._id}>
                <TextButton
                  onClick={updateTodoHandler({
                    _id: todoList._id,
                    todo: { ...todo, isCompleted: !todo.isCompleted },
                  })}
                  flex={1}
                  textAlign="left"
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                    textDecorationThickness: "3px",
                  }}
                  variant={todo.isCompleted ? "contained" : "outlined"}
                  borderRadius={10}
                >
                  {todo.text}
                </TextButton>
                <IconWrapper
                  onClick={removeTodoHandler({ _id: todoList._id, todo })}
                  cursor="pointer"
                  display="flex"
                  center
                  iconSize="32px"
                  borderRadius="10px"
                  hoverBg={(theme) => hslaAdjust({ color: theme.colors.blue[1], lightness: 50 })}
                >
                  <DeleteIcon />
                </IconWrapper>
              </FlexBox>
            ))
          ) : (
            <div>Hiç todo yok</div>
          )}
        </FlexBox>
        {todoList.todos.length > 5 ? (
          <FlexBox gridColumnGap={20} alignItems="center">
            <Text color="blue.3" fontSize={18} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodoHandler({ _id: todoList._id, text }, () => setText(""))}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodoHandler({ _id: todoList._id, text }, () => setText(""))}
            >
              Ekle
            </TextButton>
          </FlexBox>
        ) : null}
      </FlexBox>
    </div>
  );
}
