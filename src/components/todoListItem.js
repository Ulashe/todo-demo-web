import styled from "styled-components";

export const TodoListItem = styled("div")`
  background-color: ${({ theme }) => theme.todoListItem.bg};
  color: ${({ theme }) => theme.todoListItem.color};
  flex: 1;
  font-size: 20px;
  padding: 0.8em 0.8em;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;
