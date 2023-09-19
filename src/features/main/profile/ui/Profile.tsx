import {ProfileInfo} from "features/main/profile/profile-info/ProfileInfo";
import {PostInput} from "features/main/profile/profile-posts/profile-input/PostInput";
import {ProfileWall} from "features/main/profile/profile-posts/profile-wall/ProfileWall";
import {Container, Paper} from "@mui/material";

export const Profile = () => {
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