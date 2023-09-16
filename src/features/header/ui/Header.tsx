import { Mail, Notifications } from "@mui/icons-material";
import BalconyIcon from '@mui/icons-material/Balcony';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Badge, Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";


const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: "space-between"
});

const Search = styled("div")(({theme}) => ({
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '40%',
}));

const Icons = styled(Box)(({theme}) => ({
    display: "none",
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    },
}));

const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

export const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <AppBar position={'sticky'} sx={{marginBottom: '20px'}} >
            <StyledToolbar>

                <Typography variant="h6" sx={{display: {xs: "none", sm: 'block'}}}>
                    Seven Sins
                </Typography>
                <BalconyIcon sx={{display: {xs: "block", sm: 'none'}}}/>
                <Search><InputBase placeholder="Search..."/></Search>
                <Icons>
                    <Avatar
                        src="https://i.pinimg.com/originals/44/8d/87/448d8733d48968f2c48896178f81dce1.jpg"
                    />
                    <Badge badgeContent={4} color={'error'}>
                        <Mail/>
                    </Badge>
                    <Badge badgeContent={2} color={'error'}>
                        <Notifications/>
                    </Badge>

                </Icons>

                <UserBox>
                    <Avatar
                        src="https://i.pinimg.com/originals/44/8d/87/448d8733d48968f2c48896178f81dce1.jpg"
                    />
                    <Typography>Escanor</Typography>
                    <MenuIcon onClick={(e)=>setOpen(true)}/>
                </UserBox>

            </StyledToolbar>
            <Menu
                id="basic-menu"
                open={open}
                onClose={(e)=> setOpen(false)}
                aria-labelledby="basic-demo-button"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem>Home</MenuItem>
                <MenuItem>Friends</MenuItem>
                <MenuItem>Message</MenuItem>
                <MenuItem>Notifications</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Log out</MenuItem>
            </Menu>
        </AppBar>
    )
}