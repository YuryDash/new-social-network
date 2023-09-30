import { ProfileInfo } from "features/main/profile/profile-info/ProfileInfo";
import { PostInput } from "features/main/profile/profile-posts/profile-input/PostInput";
import { ProfileWall } from "features/main/profile/profile-posts/profile-wall/ProfileWall";
import { Container, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "app/store";
import { Preloader } from "components/Preloader/Preloader";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/constants";

export const Profile = () => {
  const isInitialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized);
  const navigate = useNavigate();
  const isAuth = useSelector<AppRootState, boolean>((state) => state.login.isAuth);

  if (!isInitialized) {
    return <Preloader top={"35%"} left={"50%"} />;
  }

  if (!isAuth) {
    navigate(PATH.LOGIN);
  }

  return (
    <div>
      <ProfileInfo />
      <Container>
        <Paper elevation={4} style={{ paddingBottom: "20px" }}>
          <PostInput />
          <ProfileWall />
        </Paper>
      </Container>
    </div>
  );
};
