/* eslint-disable react-hooks/exhaustive-deps */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormLabel,
  MenuItem,
  Select,
  ToggleButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../app/rootReducer";
import {
  getCompetition,
  getCompetitionExamList,
  statusChange,
} from "../../../../features/competitionSlice";
import { examStatus } from "../../../../shared/contants/exam";
import style from "./exam-detail.module.scss";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { levels } from "../../../../shared/contants/question";
import StudentGrid from "./grid-student";

const ExamDetail: React.FC = (): JSX.Element => {
  const params = useParams();
  const competition = useSelector(
    (state: RootState) => state?.competition?.competition
  );
  const [id, setID] = useState<any>(0);
  const [questions, setQuestions] = useState<any>([]);
  const exams = useSelector((state: RootState) => state?.competition?.exams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch<any>(getCompetitionExamList(params.id));
      dispatch<any>(getCompetition(params.id));
    }
  }, []);

  useEffect(() => {
    if (exams.length) {
      let data = [];
      let index = 0;
      let exam = exams[id];
      if (exam.questionLv1?.length) {
        data.push({ level: 1, index: index, data: exam.questionLv1 });
        index += exam.questionLv1.length;
      }
      if (exam.questionLv2?.length) {
        data.push({ level: 2, index: index, data: exam.questionLv2 });
        index += exam.questionLv2.length;
      }
      if (exams[id].questionLv3?.length) {
        data.push({ level: 3, index: index, data: exam.questionLv3 });
        index += exam.questionLv3.length;
      }
      if (exams[id].questionLv4?.length) {
        data.push({ level: 4, index: index, data: exam.questionLv4 });
        index += exam.questionLv4.length;
      }
      setQuestions(data);
    }
  }, [exams, id]);

  const clickToTop = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
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
        <div className={style.item}>
          Trạng thái:
          <div className={style.status}>
            {examStatus.map((item, i) =>
              i !== 2 && competition.status === 2 ? (
                ""
              ) : (
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  key={i}
                  className={`${style.statusItem} ${
                    competition.status === i ? style.active : ""
                  }`}
                  onClick={() => {
                    changeStatus(i);
                  }}
                >
                  {item}
                </ToggleButton>
              )
            )}
          </div>
        </div>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            // eslint-disable-next-line react/jsx-no-undef
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Đề thi</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={style.exam}>
              <FormLabel className="d-flex">Đề bài:</FormLabel>
              <Select
                value={id}
                size="small"
                name="subject"
                id="subject"
                sx={{ height: "33px", width: "200px", marginLeft: "8px" }}
                onChange={(event) => {
                  setID(() => event.target.value);
                }}
              >
                {exams?.map((item: any, i: number) => (
                  <MenuItem key={i} value={i}>
                    {item?.code}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <ol type="I">
                {questions.map((item: any, index: number) => (
                  <li key={item.level} className={style.partList}>
                    <div className={style.partTitle}>
                      Phần {levels[item.level - 1]}
                    </div>
                    {item.data?.map((question: any, questionIndex: number) => (
                      <div key={question.id} className={style.questionList}>
                        <p>
                          <b className={style.questionIndex}>
                            Câu {item.index + questionIndex + 1}.
                          </b>
                          {question.content}
                        </p>
                        <ol type="A">
                          {question.choiceAnswers?.map(
                            (answer: any, i: number) => (
                              <li
                                key={question.id + i}
                                className={
                                  i === question.correctAnswer
                                    ? style.questionCorrect
                                    : ""
                                }
                              >
                                {answer}
                              </li>
                            )
                          )}
                        </ol>
                        <div>
                          <h4 style={{ margin: "8px 0" }}>Chú giải:</h4>
                          <p style={{ margin: "0 0 8px 0" }}>{question.note}</p>
                        </div>
                      </div>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            // eslint-disable-next-line react/jsx-no-undef
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Chi tiết cuộc thi:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <StudentGrid id={params.id || ""} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <ToggleButton
          value="right"
          aria-label="left aligned"
          className={style.buttonToTop}
          onClick={clickToTop}
        >
          <div>
            <ExpandLess />
          </div>
          <div>Click to top</div>
        </ToggleButton>
      </div>
    </div>
  );
};
export default ExamDetail;
