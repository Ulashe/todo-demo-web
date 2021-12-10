import styled from "styled-components";

export const TodoList = styled("div")`
  background-color: ${({ theme }) => theme.todoList.bg};
  color: ${({ theme }) => theme.todoList.color};
  font-size: 20px;
  padding: 0.8em 0.8em;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;
