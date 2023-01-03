import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
  ToggleButton,
} from "@mui/material";
import React from "react";
import { ClassDetailProps } from "../../shared/utils/inteface";
import { Transition } from "../../shared/utils/transition";
import style from "./class-detail.module.scss";
const ClassDetailModal: React.FC<ClassDetailProps> = (props): JSX.Element => {
  const { open, classes, handleClose } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={style.form_title}>
        <div>Danh sách lớp học</div>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{ border: "none", padding: 0 }}
        >
          <Close onClick={handleClose} />
        </ToggleButton>
      </DialogTitle>
      <DialogContent className={style.form_content}>
        {classes &&
          classes.map((item: any) => (
            <TableRow>
              <TableCell sx={{ border: 1, borderColor: "grey.300" }}>
                {item.code}
              </TableCell>
              <TableCell
                width={400}
                sx={{ border: 1, borderColor: "grey.300" }}
              >
                {item.name}
              </TableCell>
            </TableRow>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ClassDetailModal, (pre, next) => {
  return pre.open === next.open;
});
