import {ProfileInfo} from "features/main/profile/ui/profile-info/ProfileInfo";
import {PostInput} from "features/main/profile/ui/profile-posts/PostInput";
import {ProfileWall} from "features/main/profile/ui/profile-posts/ProfileWall";
import {Container, Paper} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {profileActions} from "features/main/profile/model/profile-slice";

export const Profile = () => {
    const dispatch = useDispatch()
    const [postMessage, setPostMessage] = useState('')
    const createPostCallback = (message: string) => {
        setPostMessage(message)
    }
    const addPostCallBack = () => {
        dispatch( profileActions.addPost( {message: postMessage} ) )
    }
    return (
        <div>
            <ProfileInfo/>
            <Container>
                <Paper elevation={4}>
                    <PostInput createPostCallback={createPostCallback} addPostCallBack={addPostCallBack}/>
                    <ProfileWall/>
                </Paper>
            </Container>
        </div>
    )
}