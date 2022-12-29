import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { ConfirmDialogProps } from "../../shared/utils/inteface";
import { Transition } from "../../shared/utils/transition";

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props): JSX.Element => {
  const { open, message, handleClose, handleSuccess } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Hủy bỏ
        </Button>
        <Button onClick={handleSuccess} variant="contained" color="error">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog, (pre, next) => {
  return pre.open === next.open;
});
