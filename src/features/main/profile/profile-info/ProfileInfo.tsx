import s from "features/main/profile/profile-info/profileInfo.module.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Container, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "app/store";
import { ProfileInfoType } from "features/main/profile/model/profile-slice";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Preloader } from "components/Preloader/Preloader";
import { ChangeStatus } from "features/main/profile/profile-info/changeStatus";

const SmallAvatar = styled(AddCircleOutlineIcon)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `3px solid ${theme.palette.background.paper}`,
  borderRadius: "50%",
  backgroundColor: "#ffffff",
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#1976D2",
  width: 156,
  height: 156,
}));

export const ProfileInfo = () => {
  const profileUserInfo = useSelector<AppRootState, ProfileInfoType>((state) => state.profile.profile);
  const profileStatus = useSelector<AppRootState, string>((state) => state.profile.status);

  const changePhotoHandler = () => {
    alert("change Photo");
  };

  if (!profileUserInfo || !profileStatus) {
    return (
      <div>
        <Preloader top={"15%"} left={"50%"} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Container>
        <Paper elevation={4} style={{ padding: "24px" }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Tooltip title="change photo">
                    <IconButton onClick={changePhotoHandler}>
                      <SmallAvatar />
                    </IconButton>
                  </Tooltip>
                }
              >
                <StyledAvatar
                  sx={{ width: 156, height: 156 }}
                  alt={profileUserInfo.fullName || "user"}
                  src={profileUserInfo?.photos?.large}
                />
              </Badge>
            </Grid>
            <Grid item xs={6}>
              <h4>{`name:  ${profileUserInfo.fullName}`}</h4>
              <h5>{`about me:  ${profileUserInfo.aboutMe}`}</h5>
              <h5 style={{ display: "flex", alignItems: "center" }}>
                {/*{`status:  ${profileStatus}`} <EditIcon fontSize={'small'}/>*/}
                <ChangeStatus />
              </h5>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};
