import React from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, refresh, signOutThunk } from "../redux/reducers/authentication";
import axios from "axios";
import styled from "styled-components";

const Container = styled("div")({
  maxWidth: (props) => props.theme.maxWidth,
  margin: "auto",
  padding: 20,
});

export default function Layout({ children }) {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let intervalID = null;
    if (auth && auth.refreshToken) {
      intervalID = setInterval(() => {
        axios
          .get(`/auth/accessToken/${auth.refreshToken}`)
          .then((res) => dispatch(refresh(res.data)))
          .catch(() => dispatch(signOutThunk));
      }, 1000 * auth.expiresInSeconds - 10000);
    } else {
      if (intervalID) {
        clearInterval(intervalID);
      }
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [auth]);
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}
