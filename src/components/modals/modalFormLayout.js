import styled from "styled-components";
import { flexbox, layout } from "styled-system";

export const ModalFormLayout = ({
  children,
  containerProps,
  heading,
  headingProps,
  footer,
  footerProps,
  ...rest
}) => {
  return (
    <Container {...containerProps} {...rest}>
      <Header>
        <Heading {...headingProps}>{heading}</Heading>
      </Header>
      {children}
      <Footer {...footerProps}>{footer}</Footer>
    </Container>
  );
};

const Container = styled("div").attrs({ onClick: (e) => e.stopPropagation() })(
  (props) => ({
    backgroundColor: props.theme.modal.bg,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  }),
  layout
);

const Header = styled("div")(
  (props) => ({
    padding: "10px",
    color: props.theme.modal.color,
    borderColor: props.theme.modal.color,
    borderBottomWidth: "1px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
  flexbox
);

const Heading = styled("div")((props) => ({
  fontSize: "24px",
  fontWeight: "600",
}));

const Footer = styled("div")(
  (props) => ({
    padding: "5px",
    borderColor: props.theme.modal.color,
    borderTopWidth: "1px",
    display: "flex",
    flexDirection: "row-reverse",
  }),
  flexbox
);
