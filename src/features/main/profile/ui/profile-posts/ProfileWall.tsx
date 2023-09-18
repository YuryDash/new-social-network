import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';
import {alpha, Button, Grid, IconButton} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootState} from "app/store";
import {PostType} from "features/main/profile/model/profile-slice";
import React, {useState} from "react";

import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export const ProfileWall = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const handleCopy = (id: string) => {
    //     let textToCopy = posts?.find(el => el.postID === id)?.postMessage;
    //     navigator.clipboard.writeText(textToCopy || 'lol')
    //     console.log('Clicked post ID:', id);
    // };
    const handleCopy = (id: string) => {
        console.log('Clicked post ID:', id);

        let textToCopy = posts?.find(el => el.postID === id)?.postMessage;
        let textToCop = textToCopy || 'some error';
        return navigator.clipboard.writeText(textToCop);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const posts = useSelector<AppRootState, PostType[]>(state => state.profile.posts)
    const mappedPosts = posts?.map(el => {
        return (
            <Grid key={el.postID} container p={3}>
                <Grid item xs={1}>
                    <Avatar>

                    </Avatar>
                </Grid>
                <Grid item xs={9}>
                    <div style={{color: '#1976D2'}}>Escanor</div>
                    <div style={{color: '#BDBDBD'}}>Published: 12.12.12, 10:02:12</div>
                </Grid>
                <Grid item xs={1}>
                    <div>
                        <IconButton onClick={handleClick}
                                    id="demo-customized-button"
                                    aria-controls={open ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} disableRipple>
                                <EditIcon/>
                                Edit
                            </MenuItem>
                            <MenuItem key={el.postID}
                                      onClick={() => {
                                          handleCopy(el.postID);
                                          alert(el.postID)
                                          handleClose();
                                      }} disableRipple>
                                <FileCopyIcon/>
                                Duplicate
                            </MenuItem>
                            <Divider sx={{my: 0.5}}/>
                            <MenuItem onClick={handleClose} disableRipple>
                                <ArchiveIcon/>
                                Archive
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <MoreHorizIcon/>
                                More
                            </MenuItem>
                        </StyledMenu>
                    </div>
                </Grid>
                <Grid item xs={10} pt={2} pl={8} style={{wordWrap: 'break-word'}}>
                    {el.postMessage} : {el.postID}
                </Grid>
            </Grid>
        )
    })
    return (

        <div>
            {mappedPosts}
        </div>

    )
}