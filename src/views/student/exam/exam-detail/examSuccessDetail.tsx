import { useEffect, useState } from "react";
import MathEquation from "../../../../components/math/math-equation";
import { levels } from "../../../../shared/contants/question";
import style from "./exam-detail.module.scss";

const ExamSuccessDetail: React.FC<{ exam: any }> = (props): JSX.Element => {
  const { exam } = props;
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);

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
      let answer: { [key: string]: number } = {};
      exam.answers.forEach((item: any) => {
        answer[item.questionId] = item.answer;
      });
      setAnswers(answer);
      setQuestions(data);
    }
  }, [exam]);

  return (
    <ol type="I">
      {questions.map((item: any, index: number) => (
        <li key={item.level} className={style.partList}>
          <div className={style.partTitle}>Phần {levels[item.level - 1]}</div>
          {item.data?.map((question: any, questionIndex: number) => (
            <div key={question.id} className={style.questionList}>
              <span>
                <b className={style.questionIndex}>
                  Câu {item.index + questionIndex + 1}.
                </b>
                <MathEquation value={question.content} />
              </span>

              <ol type="A">
                {question.choiceAnswers?.map((answer: any, i: number) => (
                  <li
                    key={question.id + i}
                    className={
                      i === question.correctAnswer
                        ? style.questionCorrect
                        : answers[question.id] === i
                        ? style.questionWrong
                        : ""
                    }
                  >
                    <MathEquation value={answer} />
                  </li>
                ))}
              </ol>
              <div>
                <h4 style={{ margin: "8px 0" }}>Kết quả:</h4>
                {answers[question.id] === question.correctAnswer ? (
                  <div className={style.questionCorrect}>Đúng</div>
                ) : (
                  <div className={style.questionWrong}>Sai</div>
                )}
                <p style={{ margin: "0 0 8px 0" }}>
                  <MathEquation value={question.note} />
                </p>
              </div>
            </div>
          ))}
        </li>
      ))}
    </ol>
  );
};
export default ExamSuccessDetail;
