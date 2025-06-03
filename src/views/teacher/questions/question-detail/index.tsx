/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  ToggleButton,
} from "@mui/material";
import React from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import style from "./question-detail.module.scss";
import { Close } from "@mui/icons-material";
import { answers, levels } from "../../../../shared/contants/question";
import MathEquation from "../../../../components/math/math-equation";
const QuestionDetail: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={style.form_title}>
        <div>Câu hỏi {data?.code}</div>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{ border: "none", padding: 0 }}
        >
          <Close onClick={handleClose} />
        </ToggleButton>
      </DialogTitle>
      <DialogContent className={style.form_content}>
        <Table
          sx={{ minHeight: 350 }}
          className={style.table}
          aria-label="simple table"
        >
          <TableBody>
            {/* <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Thể loại</div>
              </TableCell>
              <TableCell> {questionTypes[data?.type]}</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell
                sx={{ borderRight: 1, borderColor: "grey.300", width: "100px" }}
              >
                <div className={style.title}>Môn học</div>
              </TableCell>
              <TableCell> {data?.subject.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Độ khó</div>
              </TableCell>
              <TableCell> {levels[data?.level - 1]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Nội dung</div>
              </TableCell>
              <TableCell>
                <MathEquation value={data?.content} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Đáp án</div>
              </TableCell>
              <TableCell>
                <ol type="A" style={{ padding: "0 16px" }}>
                  {data?.choiceAnswers?.map((answer: string, index: number) => (
                    <li key={index}>
                      <MathEquation value={answer} />
                    </li>
                  ))}
                </ol>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Đáp án đúng</div>
              </TableCell>
              <TableCell> {answers[data?.correctAnswer]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderRight: 1, borderColor: "grey.300" }}>
                <div className={style.title}>Chú giải</div>
              </TableCell>
              <TableCell>
                <MathEquation value={data?.note} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions className={style.form_action}>
        <Button onClick={handleClose} variant="outlined">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(QuestionDetail, (pre, next) => {
  return pre.open === next.open;
});
