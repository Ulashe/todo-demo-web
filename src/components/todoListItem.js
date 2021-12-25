import styled from "styled-components";
import { Box, FlexBox } from "./styled-components";

export function TodoListItem({ todoList }) {
  const unCompletedTodosCount = todoList.todos.reduce(
    (acc, item) => (item.isCompleted ? acc : ++acc),
    0
  );
  return (
    <div>
      <Container>
        <Title>{todoList.title}</Title>
        <SubText>Tamamlanmamış todo sayısı: {unCompletedTodosCount}</SubText>
      </Container>
      <FlexBox px={10} mt={-2}>
        <Box bg="blue.1" height={2} flex={2}></Box>
        <Box bg="blue.9" height={2} flex={1}></Box>
      </FlexBox>
    </div>
  );
}

const Container = styled("div")((props) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  rowGap: "5px",
  backgroundColor: props.theme.todoListItem.bg,
  padding: "16px",
  borderRadius: "10px",
  cursor: "pointer",
}));

const Title = styled("p")((props) => ({
  color: props.theme.todoListItem.color,
  fontSize: "20px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

const SubText = styled("p")((props) => ({
  color: props.theme.todoListItem.subColor,
  fontSize: "10px",
}));
