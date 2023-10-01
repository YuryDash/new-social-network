import { ProfileInfo } from "features/main/profile/profile-info/ProfileInfo";
import { PostInput } from "features/main/profile/profile-posts/profile-input/PostInput";
import { ProfileWall } from "features/main/profile/profile-posts/profile-wall/ProfileWall";
import { Container, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "app/store";
import { Preloader } from "components/Preloader/Preloader";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PATH } from "common/constants";
import { profileThunks } from "features/main/profile/model/profile-slice";

export const Profile = () => {
  const isInitialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized);
  const userId = useSelector<AppRootState, number | null>((state) => state.login.id);
  const dispatch = useAppDispatch();
  let { userID } = useParams();

  useEffect(() => {
    if (userID || userId) {
      const userToThunk = userID ? +userID : (userId as number);
      dispatch(profileThunks.getProfile({ userID: userToThunk }));
      dispatch(profileThunks.getStatus({ userID: userToThunk }));
    }
  }, [userID, userId]);

  if (!isInitialized) {
    return <Preloader top={"35%"} left={"50%"} />;
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
