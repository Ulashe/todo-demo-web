import React, { useState } from "react";
import { Heading, IconWrapper, ProgressCircle, TextButton, TextInput } from "./";
import { Box, FlexBox, Text } from "./styled-components";
import { hslaAdjust } from "../utils/hslaAdjust";
import { DeleteIcon, DoneIcon, EditIcon, MoreIcon } from "../assets/icons";
import { EditTodoText, EditTodoListTitle, ModalButton, Confirm } from "./modals";

export function TodoList({
  todoList,
  addTodoHandler,
  removeTodoHandler,
  updateTodoHandler,
  updateTodoListHandler,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const counts = todoList.todos.reduce(
    (acc, item) => {
      item.isCompleted ? acc.completed++ : acc.unCompleted++;
      return acc;
    },
    { completed: 0, unCompleted: 0 }
  );

  const addTodo = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      setLoading(true);
      addTodoHandler({ _id: todoList._id, text }, () => {
        setText("");
        setLoading(false);
      });
    }
  };

  const removeTodo = (todo) => (cb) => removeTodoHandler({ _id: todoList._id, todo }, cb);

  return (
    <FlexBox flexDirection="column">
      <FlexBox gridColumnGap={20}>
        <Heading>{todoList.title}</Heading>
        <ModalButton
          modalContent={
            <EditTodoListTitle todoList={todoList} updateTodoListHandler={updateTodoListHandler} />
          }
        >
          <IconWrapper
            cursor="pointer"
            display="flex"
            center
            iconSize={32}
            borderRadius={10}
            bg="blue.1"
            iconFill="white"
            p={2}
            hoverBg={(theme) => theme.colors.blue[5]}
          >
            <EditIcon />
          </IconWrapper>
        </ModalButton>
      </FlexBox>
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
          <FlexBox alignItems="center">
            <Text color="blue.1" fontSize={28} fontWeight={500}>
              Todos
            </Text>
            <ProgressCircle
              ml={20}
              boxSize={50}
              ratio={todoList.todos.length > 0 ? counts.completed / todoList.todos.length : 0}
              angleColor={(theme) => theme.colors.blue[3]}
            >
              {todoList.todos.length == 0 ? (
                <IconWrapper iconSize={28}>
                  <MoreIcon />
                </IconWrapper>
              ) : counts.unCompleted == 0 ? (
                <IconWrapper iconSize={28}>
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
          </FlexBox>
          <FlexBox gridColumnGap={10} alignItems="center">
            <Text color="blue.3" fontSize={18} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodo}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodo}
              loading={loading}
            >
              Ekle
            </TextButton>
          </FlexBox>
        </FlexBox>
        <FlexBox vertical gridRowGap={10}>
          {todoList.todos.length > 0 ? (
            todoList.todos.map((todo) => (
              <FlexBox key={todo._id} gridColumnGap={5}>
                <TextButton
                  onClick={() =>
                    updateTodoHandler({
                      _id: todoList._id,
                      todo: { ...todo, isCompleted: !todo.isCompleted },
                    })
                  }
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
                <ModalButton
                  modalContent={
                    <EditTodoText
                      todoListID={todoList._id}
                      todo={todo}
                      updateTodoHandler={updateTodoHandler}
                    />
                  }
                >
                  <IconWrapper
                    cursor="pointer"
                    display="flex"
                    center
                    iconSize={32}
                    borderRadius={10}
                    hoverBg={(theme) => hslaAdjust({ color: theme.colors.blue[1], l: 50 })}
                  >
                    <EditIcon />
                  </IconWrapper>
                </ModalButton>
                <ModalButton
                  modalContent={
                    <Confirm
                      buttonText="Sil"
                      contentText="Todo'yu silmek istediğinizden emin misiniz ?"
                      onConfirm={removeTodo(todo)}
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
            ))
          ) : (
            <Text color="primary" fontSize={32} textAlign="center" p={20}>
              Hiç bir todo bulunmamakta!
            </Text>
          )}
        </FlexBox>
        {todoList.todos.length > 5 ? (
          <FlexBox gridColumnGap={20} alignItems="center">
            <Text color="blue.3" fontSize={18} fontWeight={500}>
              Yeni todo:
            </Text>
            <form onSubmit={addTodo}>
              <TextInput value={text} onChange={setText} />
            </form>
            <TextButton
              fontWeight={500}
              variant="contained"
              borderRadius={10}
              onClick={addTodo}
              loading={loading}
            >
              Ekle
            </TextButton>
          </FlexBox>
        ) : null}
      </FlexBox>
    </FlexBox>
  );
}

export function TodoListPlaceholder() {
  return (
    <FlexBox flexDirection="column">
      <FlexBox gridColumnGap={20}>
        <Box width={400} height={30} bg="#ccc" />
        <Box width={32} height={32} bg="#ccc" borderRadius={10} />
      </FlexBox>
      <FlexBox mt={20} vertical gridRowGap={20}>
        <Box width={300} height={18} bg="#ccc" />
        <Box width={300} height={18} bg="#ccc" />
        <FlexBox
          alignItems="baseline"
          justifyContent="space-between"
          flexWrap="wrap"
          gridRowGap="20px"
          gridColumnGap="20px"
        >
          <FlexBox alignItems="center">
            <Box width={100} height={40} bg="#ccc" />
            <Box ml={20} width={50} height={50} bg="#ccc" borderRadius="50%" />
          </FlexBox>
          <FlexBox gridColumnGap={10} alignItems="center">
            <Box width={100} height={40} bg="#ccc" />
            <Box width={100} height={40} bg="#ccc" borderRadius={10} />
            <TextButton width={30} height={40} bg="#ccc" borderRadius={10} />
          </FlexBox>
        </FlexBox>
        <FlexBox vertical gridRowGap={10}>
          {[1, 2, 3, 4, 5].map((i, index) => (
            <FlexBox key={index} gridColumnGap={5}>
              <Box flex={1} height={30} bg="#ccc" borderRadius={10} />
              <Box width={30} height={30} bg="#ccc" borderRadius={10} />
              <Box width={30} height={30} bg="#ccc" borderRadius={10} />
            </FlexBox>
          ))}
        </FlexBox>
        <FlexBox gridColumnGap={10} alignItems="center">
          <Box width={100} height={40} bg="#ccc" />
          <Box width={100} height={40} bg="#ccc" borderRadius={10} />
          <TextButton width={30} height={40} bg="#ccc" borderRadius={10} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
