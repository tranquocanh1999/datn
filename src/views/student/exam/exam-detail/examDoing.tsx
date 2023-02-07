/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, ToggleButton } from "@mui/material";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SubmitDialog from "../../../../components/confirm/submit-dialog";
import { examSubmit } from "../../../../features/competitionSlice";
import { levels } from "../../../../shared/contants/question";
import style from "./exam-detail.module.scss";

const ExamDoing: React.FC<{
  exam: any;
  competitionID: string;
  timeDoing: number;
}> = (props): JSX.Element => {
  const { exam, competitionID, timeDoing } = props;
  const [answers, setAnswers] = useState<any>({});
  const [answerIndexs, setAnswerIndexs] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [openSubmitModal, setOpenSubmitModal] = useState<any>(false);
  const [message, setMessage] = useState<any>(false);
  const [time, setTime] = useState("");
  const [timeEnd, setTimeEnd] = useState<number>();

  const [total, setTotal] = useState<any>(0);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (timeDoing) {
      const timer = setInterval(() => {
        const diffTime =
          moment(exam.startAt).add(timeDoing, "minute").valueOf() -
          moment().valueOf();

        const t = {
          hours: Math.floor((diffTime / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffTime / 1000 / 60) % 60),
          seconds: Math.floor((diffTime / 1000) % 60),
        };

        const timeString = {
          hours: t.hours < 10 ? `0${t.hours}` : `${t.hours}`,
          minutes: t.minutes < 10 ? `0${t.minutes}` : `${t.minutes}`,
          seconds: t.seconds < 10 ? `0${t.seconds}` : `${t.seconds}`,
        };

        setTime(
          `${timeString.hours}:${timeString.minutes}:${timeString.seconds}`
        );
        if (!t.hours && !t.minutes && !t.seconds) {
          clearInterval(timer);
          dispatch<any>(examSubmit(exam.id, competitionID || "", answers));
          setAnswerIndexs({});
          setAnswers({});
          setOpenSubmitModal(false);
        }
      }, 1000);
    }
  }, [timeDoing]);

  const clickToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitExam = () => {
    if (
      Object.keys(answerIndexs).length < total + 1 ||
      Object.keys(answerIndexs).find((i) => !answerIndexs[i])
    ) {
      setMessage(
        "Có một số câu hỏi chưa được chọn,bạn có muốn nộp bài thi hay không?"
      );
    } else {
      setMessage("Bạn có muốn nộp bài thi hay không?");
    }
    setOpenSubmitModal(true);
  };

  return (
    <>
      <div className={style.form}>
        <div className={style.formContent}>
          <div className={style.formLeft}>
            {Array.from(Array(total + 1).keys()).map((i) => (
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
                                id={question.id + i}
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
                                <label
                                  className="cursor-pointer"
                                  htmlFor={question.id + i}
                                >
                                  {answer}
                                </label>
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
          <div className={style.timer}>{time}</div>
          <Button
            sx={{ marginTop: "16px" }}
            onClick={submitExam}
            variant="contained"
          >
            Nộp bài
          </Button>
        </div>
      </div>
      <SubmitDialog
        open={openSubmitModal}
        handleClose={() => {
          setOpenSubmitModal(false);
        }}
        handleSuccess={() => {
          dispatch<any>(examSubmit(exam.id, competitionID || "", answers));
          setAnswerIndexs({});
          setAnswers({});
          setOpenSubmitModal(false);
        }}
        message={message}
      />
    </>
  );
};
export default ExamDoing;
