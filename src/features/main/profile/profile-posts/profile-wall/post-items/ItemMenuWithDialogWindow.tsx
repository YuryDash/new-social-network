import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handleClose: () => void;
  newFnForDeleteTEst: () => void;
};

export const ItemMenuWithDialogWindow: FC<Props> = ({ handleClose, newFnForDeleteTEst }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const openDialogHandler = () => {
    setOpenDialog(true);
  };

  const closeDialogHandler = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <MenuItem
        onClick={() => {
          openDialogHandler();
        }}
        disableRipple
      >
        <DeleteOutlineIcon />
        Delete
      </MenuItem>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogHandler}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this post permanently?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              newFnForDeleteTEst();
              closeDialogHandler();
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              closeDialogHandler();
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
