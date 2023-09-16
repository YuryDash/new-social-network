import {Container, Grid, IconButton, TextField, Tooltip} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Avatar from "@mui/material/Avatar";
import {ChangeEvent, FC} from "react";

type Props = {
    createPostCallback: (postText: string) => void
    addPostCallBack: () => void
}

export const PostInput:FC<Props> = ({createPostCallback, addPostCallBack}) => {

    const createPostHandler = (e: ChangeEvent<HTMLInputElement>) => createPostCallback(e.currentTarget.value)
    const addNewPostHandler = () => addPostCallBack()
    return (
        <>
            <Container style={{marginTop: '50px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={11}>
                        <TextField
                            size="small"
                            fullWidth
                            label="new post"
                            id="fullWidth"
                            onChange={createPostHandler}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="send post">
                            <IconButton onClick={addNewPostHandler}>
                                <AddCircleOutlineIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

            </Container>
                {/*<Grid container p={3}>*/}
                {/*    <Grid item xs={1}>*/}
                {/*        <Avatar>*/}

                {/*        </Avatar>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={11}>*/}
                {/*        {message}*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
        </>
    )
}