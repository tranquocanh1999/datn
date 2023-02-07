import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SubmitDialog from "../../../../components/confirm/submit-dialog";
import { examStart } from "../../../../features/competitionSlice";
import style from "./exam-detail.module.scss";

const ExamStartConfirm: React.FC<{ id: string }> = (props): JSX.Element => {
  const { id } = props;
  const [openSubmitModal, setOpenSubmitModal] = useState<any>(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.examNotStart}>
        <Button
          sx={{ marginTop: "16px" }}
          onClick={() => {
            setOpenSubmitModal(true);
          }}
          variant="contained"
        >
          Bắt đầu bài thi
        </Button>
      </div>
      <SubmitDialog
        open={openSubmitModal}
        handleClose={() => {
          setOpenSubmitModal(false);
        }}
        handleSuccess={() => {
          dispatch<any>(examStart(id));
          setOpenSubmitModal(false);
        }}
        message="Bạn có muốn bắt đầu bài thi hay không?"
      />
    </>
  );
};
export default ExamStartConfirm;
