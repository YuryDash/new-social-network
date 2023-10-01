import { Box, Container, createTheme, Grid } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Header } from "features/header/ui/Header";
import { NavBar } from "features/nav-bar/ui/NavBar";
import "./App.css";
import { PATH } from "common/constants";
import { Dialogs } from "features/main/dialogs/ui/Dialogs";
import { Profile } from "features/main/profile/ui/Profile";
import { Users } from "features/main/users/ui/Users";
import { News } from "features/main/news/ui/News";
import { Music } from "features/main/music/ui/Music";
import { Settings } from "@mui/icons-material";
import { AppRootState, useAppDispatch } from "app/store";
import { Login } from "features/login/ui/Login";
import { loginThunks } from "features/login/model/login-slice";
import { Preloader } from "components/Preloader/Preloader";
import { useSelector } from "react-redux";

export type ThemeType = "dark" | "light";

export const App = () => {
  const [mode, setMode] = useState<ThemeType>("light");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector<AppRootState, boolean>((state) => state.login.isAuth);
  const isInitialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized);

  useEffect(() => {
    dispatch(loginThunks.loginMe());
    if (!isAuth && isInitialized) {
      navigate(PATH.LOGIN);
    }
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor="background.default" color="text.primary">
        <Header />
        <Container>
          <Grid container spacing={3}>
            {!location.pathname.startsWith(PATH.LOGIN) && (
              <Grid item xs={3}>
                <NavBar mode={mode} setMode={setMode} />
              </Grid>
            )}
            <Grid item xs={location.pathname.startsWith(PATH.LOGIN) ? 12 : 9}>
              <Routes>
                <Route path="" element={<ProfilePage />} />
                <Route path="/profile" element={<Profile />}>
                  <Route index element={<Profile />} />
                  <Route path=":userID" element={<Profile />} />
                </Route>
                <Route path={PATH.DIALOGS} element={<Dialogs />} />
                <Route path={PATH.USERS} element={<Users />} />
                <Route path={PATH.NEWS} element={<News />} />
                <Route path={PATH.MUSIC} element={<Music />} />
                <Route path={PATH.SETTINGS} element={<Settings />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route path="*" element={<div>404 PAGE NOT FOUND</div>} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  navigate("/profile", { replace: true });
  return null;
};

export default App;
