import {Box, Grid, Pagination, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, {useEffect} from "react";
import {UserItem, usersThunks} from "features/main/users/model/users-slice";
import {AppRootState, useAppDispatch} from "app/store";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {PATH} from "common/constants";
import Button from "@mui/material/Button";
import {Preloader} from "components/Preloader/Preloader";

export const Users = () => {
    const pageSize = useSelector<AppRootState, number>(state => state.users.pageSize)
    const [page, setPage] = React.useState(1);
    const dispatch = useAppDispatch()
    const totalUsersCount = useSelector<AppRootState, number>(state => state.users.totalUsersCount)
    const users = useSelector<AppRootState, UserItem[]>(state => state.users.users)

    let pageCount = Math.ceil(totalUsersCount / pageSize)

    useEffect(() => {
        dispatch(usersThunks.getUsers({currentPage: page, pageSize}))
    }, [page, pageSize, dispatch]);

    const changePageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event, value)
        setPage(value);
    };

    if (!users.length) {
        return (
            <Preloader top='35%' left='50%'/>
        );
    }

    const mappedUsers = users.map(user => {
        console.log(users)
        return (
            <Grid container p={2} key={user.id} sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <NavLink to={PATH.PROFILE + user.id} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.photos.small || 'lol'}>
                        {user.photos.small ? null : user.name[0]}
                    </Avatar>
                    <Box style={{ paddingLeft: '15px' }}>
                        <div style={{ color: '#1976D2' }}>{user.name}</div>
                        <div style={{ color: '#BDBDBD' }}>About me: {user.status ? user.status : `i'am gay`}</div>
                    </Box>
                </NavLink>
                <Box sx={{ ml: 10 }}>
                    <Button size="small">Follow</Button>
                    <Button size="small">Unfollow</Button>
                </Box>
            </Grid>
        );
    })
    return (
        <Paper elevation={4}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination
                    page={page} onChange={changePageHandler}
                    count={pageCount} variant="outlined"
                    color="primary"/>
            </div>
            {mappedUsers}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination
                    page={page} onChange={changePageHandler}
                    count={pageCount} variant="outlined"
                    color="primary"/>
            </div>
        </Paper>
    )
}