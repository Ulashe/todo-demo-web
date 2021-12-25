import React from "react";
import { TextButton } from "./textButton";

export default function TodoItem({ todo, ...rest }) {
  return (
    <TextButton
      textAlign="left"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "none",
        textDecorationThickness: "3px",
      }}
      variant={todo.isCompleted ? "contained" : "outlined"}
      borderRadius={10}
      {...rest}
    >
      {todo.text}
    </TextButton>
  );
}
