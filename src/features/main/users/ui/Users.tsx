import {Grid, Pagination, Paper, Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React, {useEffect} from "react";
import {UserItem, usersThunks} from "features/main/users/model/users-slice";
import {AppRootState, useAppDispatch} from "app/store";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import { PATH } from "common/constants";

export const Users = () => {
    const pageSize = useSelector<AppRootState, number>( state => state.users.pageSize)
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        dispatch(usersThunks.getUsers({currentPage: page, pageSize}))
    }, [page, pageSize]);

    const totalUsersCount = useSelector<AppRootState, number>( state => state.users.totalUsersCount)
    const users = useSelector<AppRootState, UserItem[]>( state => state.users.users)
    const dispatch = useAppDispatch()
    console.log(users)
    const changePageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event, value)
        setPage(value);
    };

    let pageCount = Math.ceil(totalUsersCount / pageSize)

    const mappedUsers = users?.map( user => {
        return (
            <Grid container p={3}>
                <NavLink to={PATH.PROFILE + user.item.id}>
                    <Stack><Avatar src={user.item.photos?.small || 'Lol Lolovich'}>
                    </Avatar>
                        <div style={{color: '#1976D2'}}>{user.item.name || 'UNDEFINED GUY'}</div>
                        <div style={{color: '#BDBDBD'}}>About me: {user.item.status || 'lol'}</div>
                    </Stack>
                </NavLink>
            </Grid>
        )
    } )

    return (
        <Paper elevation={4}>

                <Pagination page={page} onChange={changePageHandler} count={10} variant="outlined" color="primary" />

            {mappedUsers}

        </Paper>
    )
}