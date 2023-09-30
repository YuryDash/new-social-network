import { TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "app/store";
import { profileThunks } from "features/main/profile/model/profile-slice";

export const ChangeStatus = () => {
  const status = useSelector<AppRootState, string>((state) => state.profile.status);
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState(status);
  const dispatch = useAppDispatch();
  const changeStatusHandler = (e: string) => setNewStatus(e);
  const sendStatusOnBlurHandler = () => {
    if (status === newStatus) {
      setEditMode(false);
      return;
    } else {
      dispatch(profileThunks.changeStatus({ status: newStatus }));
      setEditMode(false);
    }
  };
  return (
    <>
      {editMode ? (
        <TextField
          size={"small"}
          value={newStatus}
          autoFocus
          onChange={(e) => changeStatusHandler(e.currentTarget.value)}
          onBlur={sendStatusOnBlurHandler}
        />
      ) : (
        <span onClick={() => setEditMode(true)}>status: {status}</span>
      )}
    </>
  );
};
