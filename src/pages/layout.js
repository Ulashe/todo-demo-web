import React from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, refresh, signOutThunk } from "../redux/reducers/authentication";
import axios from "axios";
import styled from "styled-components";

export default function Layout({ children }) {
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
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
    <div>placeholder</div>
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
