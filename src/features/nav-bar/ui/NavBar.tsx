import { Box, List, ListItem, ListItemButton, ListItemIcon, Paper, Switch } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MusicVideoOutlinedIcon from "@mui/icons-material/MusicVideoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { PATH } from "common/constants";
import { ThemeType } from "app/App";
import { NavLink } from "react-router-dom";
import { NavigationItem } from "features/nav-bar/ui/NavItem/NavItem";
import { AppRootState, useAppDispatch } from "app/store";
import { loginThunks } from "features/login/model/login-slice";
import { useSelector } from "react-redux";

type PropsType = {
  setMode: (str: ThemeType) => void;
  mode: ThemeType;
};

export const NavBar = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector<AppRootState, boolean>((state) => state.login.isAuth);
  const onclickCallback = () => {
    dispatch(loginThunks.logoutUser());
  };

  return (
    <Box
      flex={1}
      padding={0}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box padding={0} m={0} position={"fixed"}>
        <Paper elevation={4}>
          <List>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <NavigationItem navigateTo={"/profile"} muiIcon={HomeIcon} name={"Home"} />
              <NavigationItem navigateTo={PATH.USERS} muiIcon={GroupAddOutlinedIcon} name={"Users"} />
              <NavigationItem navigateTo={PATH.DIALOGS} muiIcon={EmailOutlinedIcon} name={"Message"} />
              <NavigationItem navigateTo={PATH.MUSIC} muiIcon={MusicVideoOutlinedIcon} name={"Music"} />
              <NavigationItem navigateTo={PATH.NEWS} muiIcon={NewspaperOutlinedIcon} name={"News"} />
              <NavigationItem navigateTo={PATH.SETTINGS} muiIcon={SettingsOutlinedIcon} name={"Settings"} />
              <NavigationItem
                oncklickCallback={onclickCallback}
                navigateTo={PATH.LOGIN}
                muiIcon={GroupAddOutlinedIcon}
                name={"Logout"}
              />

              <ListItemButton component={NavLink} to="/" sx={{ mt: "30px" }}>
                <ListItemIcon>
                  <Brightness6Icon />
                </ListItemIcon>
                <Switch onChange={(e) => props.setMode(props.mode === "light" ? "dark" : "light")} />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};
