import React from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, refresh, signOutThunk } from "../redux/reducers/authentication";
import axios from "axios";
import styled, { useTheme } from "styled-components";
import { FlexBox, Text } from "../components/styled-components";
import Loading from "react-loading";
import { hslaAdjust } from "../utils/hslaAdjust";

export default function Layout({ children }) {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = React.useState(!!auth.refreshToken);

  React.useEffect(() => {
    let timeoutID = null;
    if (!!auth.refreshToken) {
      timeoutID = setTimeout(() => {
        axios
          .get(`/auth/accessToken/${auth.refreshToken}`)
          .then((res) => {
            dispatch(refresh(res.data));
          })
          .catch(() => dispatch(signOutThunk()));
      }, 1000 * auth.expiresInSeconds - 10000);
      if (new Date() > new Date(auth.expireDate)) {
        axios
          .get(`/auth/accessToken/${auth.refreshToken}`)
          .then((res) => {
            dispatch(refresh(res.data));
            setLoading(false);
          })
          .catch(() => dispatch(signOutThunk()));
      } else {
        setLoading(false);
      }
    } else {
      if (timeoutID) {
        clearInterval(timeoutID);
      }
    }
    return () => {
      clearInterval(timeoutID);
    };
  }, [auth.refreshToken, auth.expireDate]);

  return loading ? (
    <FlexBox
      center
      height="100vh"
      vertical
      gridRowGap={10}
      bg={hslaAdjust({ color: theme.colors.primary, lAbs: 90, sAbs: 20 })}
    >
      <Text color="primary" fontSize={40} fontWeight="bold">
        Todo Lists App
      </Text>
      <Loading type="bars" color={theme.colors.primary} />
    </FlexBox>
  ) : (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}

const Container = styled("div")({
  maxWidth: (props) => props.theme.maxWidth,
  margin: "auto",
  padding: 20,
});
