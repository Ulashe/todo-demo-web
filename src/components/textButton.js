import styled, { useTheme } from "styled-components";
import {
  variant,
  compose,
  layout,
  color,
  flexbox,
  space,
  typography,
  position,
  border,
} from "styled-system";
import Loading from "react-loading";

export const TextButton = ({
  loading = false,
  loadingType = "bars",
  loadingSize = 28,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledTextButton {...props} onClick={loading ? undefined : props.onClick}>
      {loading ? (
        <StyledLoading
          type={loadingType}
          color={props.variant == "contained" ? "white" : theme.colors.blue[1]}
          width={loadingSize}
          height={loadingSize}
          className="loading"
        />
      ) : (
        props.children
      )}
    </StyledTextButton>
  );
};

const StyledTextButton = styled("div")`
  text-align: center;
  cursor: pointer;
  border-style: solid;
  ${variant({ scale: "textButton" })}
  ${compose(layout, color, space, flexbox, position, border, typography)}
`;

const StyledLoading = styled(Loading)({
  margin: "-5px 0",
});
