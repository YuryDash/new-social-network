import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Switch} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import {PATH} from "common/constants";
import {ThemeType} from "app/App";
import {NavLink} from "react-router-dom";

type PropsType = {
    setMode: (str: ThemeType) => void
    mode: ThemeType
}

export const NavBar = (props: PropsType) => {
    return (
        <Box
            flex={1}
            padding={0}
            sx={{
                display: {xs: "none", sm: "block"},
            }}
        >
            <Box padding={0} m={0} position={'fixed'}>
                <Paper elevation={4}>
                    <List>
                        <ListItem sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}>
                            <ListItemButton component={NavLink} to="/">
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to={PATH.USERS}>
                                <ListItemIcon>
                                    <GroupAddOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Users"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to={PATH.DIALOGS}>
                                <ListItemIcon>
                                    <EmailOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Message"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to={PATH.MUSIC}>
                                <ListItemIcon>
                                    <MusicVideoOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Music"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to={PATH.NEWS}>
                                <ListItemIcon>
                                    <NewspaperOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="News"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to={PATH.SETTINGS}>
                                <ListItemIcon>
                                    <SettingsOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Settings"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to="#home">
                                <LogoutOutlinedIcon sx={{mr: '30px'}}>
                                    <GroupAddOutlinedIcon/>
                                </LogoutOutlinedIcon>
                                <ListItemText primary=" Logout"/>
                            </ListItemButton>

                            <ListItemButton component={NavLink} to="#home"
                                            sx={{mt: '30px'}}
                            >
                                <ListItemIcon>
                                    <Brightness6Icon/>
                                </ListItemIcon>
                                <Switch
                                    onChange={e => props.setMode(props.mode === 'light' ? "dark" : 'light')}
                                />
                            </ListItemButton>

                        </ListItem>

                    </List>
                </Paper>
            </Box>
        </Box>

    )
}