import s from "./profileInfo.module.css"
import {FC} from "react";
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {Container, Grid, IconButton, Paper, Tooltip} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type Props = {
    avatar?: string
    name?: string
}
const SmallAvatar = styled(AddCircleOutlineIcon)(({theme}) => ({
    width: 36,
    height: 36,
    border: `3px solid ${theme.palette.background.paper}`,
    borderRadius: '50%',
    backgroundColor: '#1976D2'
}));
const StyledAvatar = styled(Avatar)(({theme}) => ({
    backgroundColor: '#1976D2',
    width: 156,
    height: 156,
}));

export const ProfileInfo: FC<Props> = ({avatar, name}) => {

    const changePhotoHandler = () => {
        alert('change Photo')
    }

    return (
        <div className={s.container}>
            <Container>

                <Paper elevation={4} style={{padding: '24px'}}>
                    <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            badgeContent={
                                <Tooltip title="change photo">
                                    <IconButton onClick={changePhotoHandler}>
                                        <SmallAvatar/>
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <StyledAvatar sx={{width: 156, height: 156}} alt="Travis Howard"
                                          src="/static/images/avatar/2.jpg"/>
                        </Badge>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Name: Escanor</h4>
                        <h5>status: waka waka mazafaka :D</h5>
                        <h5>About me: God</h5>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        </div>
    )
}