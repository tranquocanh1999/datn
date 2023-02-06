/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../app/rootReducer";
import {
  examStart,
  getCompetition,
  getCompetitionExamById,
  statusChange,
} from "../../../../features/competitionSlice";
import style from "./exam-detail.module.scss";
import { levels } from "../../../../shared/contants/question";
import { Button, Checkbox, ToggleButton } from "@mui/material";

const ExamDetail: React.FC = (): JSX.Element => {
  const params = useParams();
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>({});
  const [answerIndexs, setAnswerIndexs] = useState<any>({});
  const [total, setTotal] = useState<any>(0);
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

  useEffect(() => {
    if (exam && exam.exam) {
      let data = [];
      let index = 0;
      let ex = exam.exam;
      if (ex.questionLv1?.length) {
        data.push({ level: 1, index: index, data: ex.questionLv1 });
        index += ex.questionLv1.length;
      }
      if (ex.questionLv2?.length) {
        data.push({ level: 2, index: index, data: ex.questionLv2 });
        index += ex.questionLv2.length;
      }
      if (ex.questionLv3?.length) {
        data.push({ level: 3, index: index, data: ex.questionLv3 });
        index += ex.questionLv3.length;
      }
      if (ex.questionLv4?.length) {
        data.push({ level: 4, index: index, data: ex.questionLv4 });
        index += ex.questionLv4.length;
      }
      setQuestions(data);
      setTotal(index - 1);
    }
  }, [exam]);

  const clickToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const changeStatus = (status: number) => {
    dispatch<any>(statusChange(competition.id, status));
  };

  return (
    <div className={style.wrapper} id="top">
      <div className={style.header}>
        <div className={style.item}>
          <h2>{competition.title}</h2>
        </div>
        <div className={style.item}>
          <div>Mã đề thi: {competition.code}</div>
          <div className={style.time}>
            Thời gian làm bài: {competition.time} phút
          </div>
        </div>
        <div className={style.item}>Môn học: {competition.subject?.name}</div>
      </div>
      {competition.status === 0 ? (
        <div className={style.examNotStart}>
          Bài thi chưa được bắt đầu, vui lòng chờ giáo viên mở đề thi!.
        </div>
      ) : (
        ""
      )}

      {competition.status === 1 && !exam ? (
        <div className={style.examNotStart}>
          <Button
            sx={{ marginTop: "16px" }}
            onClick={() => {
              if (params.id) dispatch<any>(examStart(params.id));
            }}
            variant="contained"
          >
            Bắt đầu bài thi
          </Button>
        </div>
      ) : (
        ""
      )}

      {competition.status === 1 && exam ? (
        <div className={style.form}>
          <div className={style.formContent}>
            <div className={style.formLeft}>
              {Array.from(Array(total).keys()).map((i) => (
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  key={i}
                  className={`${style.statusItem} ${
                    answerIndexs[i + 1] ? style.active : ""
                  }`}
                  onClick={() => {
                    clickToId(`question_${i}`);
                  }}
                >
                  Câu hỏi thứ {i + 1}
                </ToggleButton>
              ))}
            </div>
            <div className={style.formRight}>
              <ol type="I">
                {questions.map((item: any, index: number) => (
                  <li key={item.level} className={style.partList}>
                    <div className={style.partTitle}>
                      Phần {levels[item.level - 1]}
                    </div>
                    {item.data?.map((question: any, questionIndex: number) => (
                      <div
                        key={question.id}
                        id={`question_${item.index + questionIndex + 1}`}
                        className={style.questionList}
                      >
                        <p>
                          <b className={style.questionIndex}>
                            Câu {item.index + questionIndex + 1}.
                          </b>
                          {question.content}
                        </p>
                        <ol type="A">
                          {question.choiceAnswers?.map(
                            (answer: any, i: number) => (
                              <div
                                key={question.id + i}
                                className={style.questionAnswer}
                              >
                                <Checkbox
                                  sx={{ marginRight: "16px" }}
                                  checked={answers[question.id] === i}
                                  onClick={() => {
                                    let obj: any = {};
                                    answers[question.id] === i
                                      ? (obj[question.id] = null)
                                      : (obj[question.id] = i);
                                    setAnswers((state: any) => {
                                      return { ...state, ...obj };
                                    });
                                    let obj2: any = {};
                                    obj2[item.index + questionIndex + 1] =
                                      answers[question.id] !== i;

                                    setAnswerIndexs((state: any) => {
                                      return { ...state, ...obj2 };
                                    });
                                  }}
                                />
                                <li
                                  className={
                                    i === question.correctAnswer
                                      ? style.questionCorrect
                                      : ""
                                  }
                                >
                                  {answer}
                                </li>
                              </div>
                            )
                          )}
                        </ol>
                      </div>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className={style.formBottom}>
            <Button
              sx={{ marginTop: "16px" }}
              onClick={() => {
                if (params.id) dispatch<any>(examStart(params.id));
              }}
              variant="contained"
            >
              Nộp bài
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ExamDetail;
