import styled from "styled-components";

export function TodoListItem({ title }) {
  return (
    <div>
      <Container>
        <Title>{title}</Title>
      </Container>
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
