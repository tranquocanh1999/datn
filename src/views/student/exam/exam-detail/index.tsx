/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../app/rootReducer";
import {
  getCompetition,
  getCompetitionExamById,
} from "../../../../features/competitionSlice";
import style from "./exam-detail.module.scss";
import ExamNotStart from "./examNotStart";
import ExamStartConfirm from "./examStartConfirm";
import ExamDoing from "./examDoing";
import ExamSuccess from "./examSuccess";
import ExamSuccessDetail from "./examSuccessDetail";

const ExamDetail: React.FC = (): JSX.Element => {
  const params = useParams();
  const competition = useSelector(
    (state: RootState) => state?.competition?.competition
  );
  const exam = useSelector((state: RootState) => state?.competition?.exam);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch<any>(getCompetition(params.id));
      dispatch<any>(getCompetitionExamById(params.id));
    }
  }, []);

  return (
    <div className={style.wrapper} id="top">
      <div className={style.header}>
        <div className={style.item}>
          <h2>{competition.title}</h2>
        </div>
        <div className={style.item}>
          <div>
            Mã đề thi: {competition.code}
            {exam?.exam?.code && `-${exam?.exam?.code}`}
          </div>
          <div className={style.time}>
            Thời gian làm bài: {competition.time} phút
          </div>
        </div>
        <div className={style.item}>
          <div>Môn học: {competition.subject?.name}</div>
          {competition.status === 1 && exam && exam.status === 1 ? (
            <div className={style.time}>Điểm: {exam.degree}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      {competition.status === 0 ? <ExamNotStart /> : ""}

      {competition.status === 1 && !exam ? (
        <ExamStartConfirm id={params.id || ""} />
      ) : (
        ""
      )}

      {competition.status === 1 && exam && exam.status === 0 ? (
        <ExamDoing
          timeDoing={competition.time}
          exam={exam}
          competitionID={params.id || ""}
        />
      ) : (
        ""
      )}
      {competition.status === 1 && exam && exam.status === 1 ? (
        <ExamSuccess degree={exam.degree} />
      ) : (
        ""
      )}
      {competition.status === 2 ? <ExamSuccessDetail exam={exam} /> : ""}
    </div>
  );
};
export default ExamDetail;
