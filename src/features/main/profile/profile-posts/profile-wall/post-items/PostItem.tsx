import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Grid, IconButton } from "@mui/material";
import { PostType, ProfileInfoType } from "features/main/profile/model/profile-slice";
import React, { FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledMenu } from "features/main/profile/profile-posts/profile-wall/post-items/profile-styled";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { useSelector } from "react-redux";
import { AppRootState } from "app/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ItemMenuWithDialogWindow } from "features/main/profile/profile-posts/profile-wall/post-items/ItemMenuWithDialogWindow";

type Props = {
  post: PostType;
  handleClick: (event: React.MouseEvent<HTMLElement>, postID: string) => void;
  open: boolean;
  anchorEl: any;
  currentPostID: string;
  handleCopy: (id: string) => Promise<void>;
  handleClose: () => void;
  editMode: boolean;
  setEditMode: (boo: boolean) => void;
  deletePostHandler: (id: string) => void;
};

export const PostItem: FC<Props> = ({
  post,
  handleClick,
  open,
  anchorEl,
  currentPostID,
  handleCopy,
  handleClose,
  setEditMode,
  editMode,
  deletePostHandler,
}) => {
  const profileInfo = useSelector<AppRootState, ProfileInfoType>((state) => state.profile.profile);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#fb242f",
    },
  });

  const newFnForDeleteTEst = () => {
    deletePostHandler(post.postID);
  };

  return (
    <Grid key={post.postID} container p={3}>
      <Grid item xs={1}>
        <Avatar src={profileInfo?.photos?.small}></Avatar>
      </Grid>
      <Grid item xs={9}>
        <div style={{ color: "#1976D2" }}>{profileInfo.fullName}</div>
        <div style={{ color: "#BDBDBD" }}>Published: {post.date}</div>
      </Grid>
      <Grid item xs={1}>
        <div>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event, post.postID)}
            id={`demo-customized-button-${post.postID}`}
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id={`demo-customized-menu-${post.postID}`}
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open && post.postID === currentPostID}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setEditMode(true);
                handleClose();
              }}
              disableRipple
            >
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem
              key={post.postID}
              onClick={() => {
                handleCopy(post.postID);
                handleClose();
              }}
              disableRipple
            >
              <FileCopyIcon />
              Duplicate
            </MenuItem>
            {/*<MenuItem onClick={*/}
            {/*    () => {*/}
            {/*        handleClose();*/}
            {/*        deletePostHandler(post.postID);*/}
            {/*    }*/}
            {/*} disableRipple>*/}
            {/*    <DeleteOutlineIcon/>*/}
            {/*    Delete*/}
            {/*</MenuItem>*/}

            <ItemMenuWithDialogWindow handleClose={handleClose} newFnForDeleteTEst={newFnForDeleteTEst} />
          </StyledMenu>
        </div>
      </Grid>
      <Grid item xs={10} pt={2} pl={8} style={{ wordWrap: "break-word" }}>
        {<EditableSpan setEditMode={setEditMode} post={post} editMode={editMode} currentPostID={currentPostID} />}
      </Grid>
      <Grid item xs={12} pt={2} pl={8}>
        <StyledRating
          name="customized-color"
          defaultValue={5}
          getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
      </Grid>
    </Grid>
  );
};
