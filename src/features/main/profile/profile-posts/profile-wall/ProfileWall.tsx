// import Avatar from '@mui/material/Avatar';
// import {Grid, IconButton} from "@mui/material";
// import {useSelector} from "react-redux";
// import {AppRootState} from "app/store";
// import {PostType} from "features/main/profile/model/profile-slice";
// import React, {useState} from "react";
// import MenuItem from '@mui/material/MenuItem';
// import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {StyledMenu} from "features/main/profile/profile-posts/profile-wall/profile-wall-logic";
//
// export const ProfileWall = () => {

// const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//      const posts = useSelector<AppRootState, PostType[]>(state => state.profile.posts)
//     const handleCopy = (id: string) => {
//         let textToCopy = posts?.find(el => el.postID === id)?.postMessage;
//         let textToCop = textToCopy || 'some error';
//         return navigator.clipboard.writeText(textToCop);
//     };
//
//     const handleClose = () => {
//         setAnchorEl(null);
//         setCurrentPostID('')
//     };
//
//     const [currentPostID, setCurrentPostID] = useState('')
//     const handleClick = (event: React.MouseEvent<HTMLElement>, postID: string) => {
//         setAnchorEl(event.currentTarget);
//         setCurrentPostID(postID)
//     };
//     const open = Boolean(anchorEl);

//     const mappedPosts = posts?.map(el => {
//         return (
//             <Grid key={el.postID} container p={3}>
//                 <Grid item xs={1}>
//                     <Avatar>
//
//                     </Avatar>
//                 </Grid>
//                 <Grid item xs={9}>
//                     <div style={{color: '#1976D2'}}>Escanor</div>
//                     <div style={{color: '#BDBDBD'}}>Published: 12.12.12, 10:02:12</div>
//                 </Grid>
//                 <Grid item xs={1}>
//                     <div>
//                         <IconButton onClick={(event) => handleClick(event, el.postID)}
//                                     id={`demo-customized-button-${el.postID}`}
//                                     aria-controls={open ? 'demo-customized-menu' : undefined}
//                                     aria-haspopup="true"
//                                     aria-expanded={open ? 'true' : undefined}
//                         >
//                             <MoreVertIcon/>
//                         </IconButton>
//                         <StyledMenu
//                             id={`demo-customized-menu-${el.postID}`}
//                             MenuListProps={{
//                                 'aria-labelledby': 'demo-customized-button',
//                             }}
//                             anchorEl={anchorEl}
//                             open={open && el.postID === currentPostID}
//                             onClose={handleClose}
//                         >
//                             <MenuItem onClick={handleClose} disableRipple>
//                                 <EditIcon/>
//                                 Edit
//                             </MenuItem>
//                             <MenuItem key={el.postID}
//                                       onClick={() => {
//                                           handleCopy(el.postID);
//                                           alert(el.postID)
//                                           handleClose();
//                                       }} disableRipple>
//                                 <FileCopyIcon/>
//                                 Duplicate
//                             </MenuItem>
//                             <Divider sx={{my: 0.5}}/>
//                             <MenuItem onClick={handleClose} disableRipple>
//                                 <ArchiveIcon/>
//                                 Archive
//                             </MenuItem>
//                             <MenuItem onClick={handleClose} disableRipple>
//                                 <MoreHorizIcon/>
//                                 More
//                             </MenuItem>
//                         </StyledMenu>
//                     </div>
//                 </Grid>
//                 <Grid item xs={10} pt={2} pl={8} style={{wordWrap: 'break-word'}}>
//                     {el.postMessage}
//                 </Grid>
//             </Grid>
//         )
//     })
//     return (
//
//         <div>
//             {mappedPosts}
//         </div>
//
//     )
// }

import {PostItem} from "features/main/profile/profile-posts/profile-wall/post-items/PostItem";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "app/store";
import {PostType, profileActions} from "features/main/profile/model/profile-slice";

export const ProfileWall = () => {
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const[editMode, setEditMode] = useState<boolean>(false)
    const posts = useSelector<AppRootState, PostType[]>(state => state.profile.posts)

    const handleCopy = (id: string) => {
        let textToCopy = posts?.find(el => el.postID === id)?.postMessage;
        let textToCop = textToCopy || 'some error';
        return navigator.clipboard.writeText(textToCop);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setCurrentPostID('')
    };

    const [currentPostID, setCurrentPostID] = useState('')
    const handleClick = (event: React.MouseEvent<HTMLElement>, postID: string) => {
        setAnchorEl(event.currentTarget);
        setCurrentPostID(postID)
    };
    const open = Boolean(anchorEl);

    const deletePostHandler = (id: string) => {
        dispatch(profileActions.removePost({id}))
    }

    const mappedPosts = posts?.map((el) => (
        <PostItem
            key={el.postID}
            post={el}
            handleClick={handleClick}
            open={open}
            anchorEl={anchorEl}
            currentPostID={currentPostID}
            handleCopy={handleCopy}
            handleClose={handleClose}
            editMode={editMode}
            setEditMode={setEditMode}
            deletePostHandler={deletePostHandler}
        />
    ));
    return <div>{mappedPosts}</div>;
};