import { Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { AppRootState, useAppDispatch } from "app/store";
import { loginThunks } from "features/login/model/login-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//====================================== pass with eye ======================================
// export const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//
//     const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//     };
//                     <Box>
//                         <FormControl variant="outlined" sx={{margin: '20px 0', width: '400px'}}>
//                             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                             <OutlinedInput
//                                 id="outlined-adornment-password"
//                                 type={showPassword ? 'text' : 'password'}
//                                 endAdornment={
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             aria-label="toggle password visibility"
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOff/> : <Visibility/>}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 }
//                                 label="Password"
//                             />
//                         </FormControl>
//                     </Box>
//====================================== pass with eye ======================================

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector<AppRootState, boolean>((state) => state.login.isAuth);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(
        loginThunks.loginUser({ email: values.email, password: values.password, rememberMe: values.rememberMe }),
      );
    },
  });

  if (isAuth) {
    navigate("/");
  }

  return (
    <Grid container justifyContent={"center"} sx={{ mt: 10 }}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <Paper elevation={6} sx={{ p: 4 }}>
            <FormControl>
              <FormLabel>
                <p>
                  To log in get registered
                  <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                    {" "}
                    here
                  </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField
                  type="email"
                  label="Email"
                  margin="normal"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <FormControlLabel
                  label={"Remember me"}
                  control={<Checkbox />}
                  name="rememberMe"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                />
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};
