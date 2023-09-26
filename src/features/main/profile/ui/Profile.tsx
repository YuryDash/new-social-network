import {ProfileInfo} from "features/main/profile/profile-info/ProfileInfo";
import {PostInput} from "features/main/profile/profile-posts/profile-input/PostInput";
import {ProfileWall} from "features/main/profile/profile-posts/profile-wall/ProfileWall";
import {Container, Paper} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootState} from "app/store";

export const Profile = () => {
    const isInitialized = useSelector<AppRootState, boolean>(state => state.app.isInitialized)

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <div>
            <ProfileInfo/>
            <Container>
                <Paper elevation={4} style={{paddingBottom: '20px'}}>
                    <PostInput/>
                    <ProfileWall/>
                </Paper>
            </Container>
        </div>
    )
}