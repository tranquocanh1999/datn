import style from "./exam-detail.module.scss";

const ExamSuccess: React.FC<{ degree: number }> = (props): JSX.Element => {
  return (
    <div className={style.examNotStart}>
      <div> Bạn đã hoàn thành bài thi với {props.degree}\10 điểm.</div>
      <div>Vui lòng chờ cuộc thi kết thúc để xem chi tiết bài thi.</div>
    </div>
  );
};
export default ExamSuccess;
