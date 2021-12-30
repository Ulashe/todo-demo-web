import styled from "styled-components";
import { Box, FlexBox } from "./styled-components";

export function TodoListItem({ title, counts }) {
  return (
    <div>
      <Container>
        <Title>{title}</Title>
      </Container>
      <FlexBox px={10} mt={-2}>
        <Box bg="blue.1" height={2} flex={counts.completed > 0 ? counts.completed : 1}></Box>
        <Box bg="blue.7" height={2} flex={counts.completed > 0 ? counts.unCompleted : 9}></Box>
      </FlexBox>
    </div>
  );
}

const Container = styled("div")((props) => ({
  flex: 1,
  backgroundColor: props.theme.todoListItem.bg,
  padding: "20px",
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
