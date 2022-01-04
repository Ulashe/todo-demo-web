import styled from "styled-components";
import { border, color, compose, layout, space, typography } from "styled-system";

export const TextInput = styled("input").attrs(({ type = "text", value, onChange }) => ({
  type,
  value,
  onChange: (e) => onChange(e.target.value),
}))(
  (props) => ({
    border: "none",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    borderColor: props.theme.colors.blue[1],
    borderWidth: "2px",
    borderStyle: "solid",
    "&:focus": {
      outline: "none",
    },
  }),
  compose(border, color, layout, space, typography)
);
