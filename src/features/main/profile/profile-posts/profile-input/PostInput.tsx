import {Container, Grid, IconButton, TextField, Tooltip} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {FC} from "react";
import {useFormik} from "formik";
import {profileActions} from "features/main/profile/model/profile-slice";
import {useDispatch} from "react-redux";

export const PostInput = () => {
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            post: '',
        },
        onSubmit: (values) => {
            dispatch(profileActions.addPost({message: values.post}))
            formik.resetForm()
        }
    })

    return (
        <>
            <Container style={{marginTop: '50px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={11}>
                            <TextField
                                {...formik.getFieldProps('post')}
                                size="small"
                                fullWidth
                                label=" add new post"
                            />
                            {/*{formik.errors.post &&  <div style={{color:'red', textAlign:'center'}}>{formik.errors.post}</div>}*/}
                        </Grid>

                        <Grid item xs={1}>
                            <Tooltip title="send post">
                                <IconButton type='submit' onClick={formik.handleChange}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>

                    </Grid>
                </form>
            </Container>
        </>
    )
}