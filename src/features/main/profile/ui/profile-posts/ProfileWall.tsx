import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "app/store";
import {PostType} from "features/main/profile/model/profile-slice";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));


export const ProfileWall = () => {
    const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;
    const post = useSelector<AppRootState, PostType>(state => state.profile)
    const mappedPosts = post.posts?.map( (el: string) => {
        return (
            <Grid key={el} container p={3}>
                <Grid item xs={1}>
                    <Avatar>

                    </Avatar>
                </Grid>
                <Grid item xs={11}>
                    {el + '123132'}
                </Grid>
            </Grid>
        )
    } )
    return (

        <div>
            {mappedPosts}
        </div>

    )
}