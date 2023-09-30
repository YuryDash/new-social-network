import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { PostType, profileActions } from "features/main/profile/model/profile-slice";

type EditProps = {
  post: PostType;
  editMode: boolean;
  setEditMode: (boo: boolean) => void;
  currentPostID?: string;
};
export const EditableSpan: FC<EditProps> = ({ post, editMode, setEditMode, currentPostID }) => {
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState<string>(post.postMessage);
  const sendNewPostHandler = () => {
    dispatch(profileActions.changePost({ newPost, id: post.postID }));
    setEditMode(false);
  };

  const changePostHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPost(e.currentTarget.value);
  };
  const sendPostOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendNewPostHandler();
    }
  };

  return (
    <>
      {editMode && post?.postID === currentPostID ? (
        <div>
          <TextField
            size={"small"}
            value={newPost}
            autoFocus
            onChange={changePostHandler}
            onKeyDown={sendPostOnEnterHandler}
          />
          <IconButton onClick={sendNewPostHandler}>
            <AddCircleOutlineIcon color={"info"} />
          </IconButton>
        </div>
      ) : (
        <span>{post.postMessage} </span>
      )}
    </>
  );
};
