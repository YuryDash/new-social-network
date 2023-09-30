import { PostItem } from "features/main/profile/profile-posts/profile-wall/post-items/PostItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "app/store";
import { PostType, profileActions } from "features/main/profile/model/profile-slice";

export const ProfileWall = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const posts = useSelector<AppRootState, PostType[]>((state) => state.profile.posts);

  const handleCopy = (id: string) => {
    let textToCopy = posts?.find((el) => el.postID === id)?.postMessage;
    let textToCop = textToCopy || "some error";
    return navigator.clipboard.writeText(textToCop);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentPostID, setCurrentPostID] = useState("");
  const handleClick = (event: React.MouseEvent<HTMLElement>, postID: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentPostID(postID);
  };
  const open = Boolean(anchorEl);

  const deletePostHandler = (id: string) => {
    dispatch(profileActions.removePost({ id }));
  };

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
