import style from "./exam-detail.module.scss";

const ExamNotStart: React.FC = (): JSX.Element => {
  return (
    <div className={style.examNotStart}>
      Bài thi chưa được bắt đầu, vui lòng chờ giáo viên mở đề thi!.
    </div>
  );
};
export default ExamNotStart;
