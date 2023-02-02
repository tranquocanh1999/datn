/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  FormHelperText,
  FormLabel,
  Button,
  TextField,
  Radio,
} from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
import { DeleteOutline } from "@mui/icons-material";
const QuestionAnswer: React.FC<InputProp> = (props): JSX.Element => {
  const { errorText, value, label, data, className, onChange, required } =
    props;
  interface type {
    choiceAnswers: string[];
    correctAnswer: number;
  }
  const [state, setState] = useState<type>({
    choiceAnswers: [],
    correctAnswer: 0,
  });
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        choiceAnswers: data,
        correctAnswer: value as number,
      };
    });
  }, []);

  useEffect(() => {
    if (!isFirst) onChange(state);
    setIsFirst(false);
  }, [state]);

  const onCheckClicked = (index: number) => {
    setState((state) => {
      return {
        ...state,
        correctAnswer: index,
      };
    });
  };

  const onUpdateQuestion = (e: any, index: number) => {
    let answer = JSON.parse(JSON.stringify(state.choiceAnswers));
    answer[index] = e.target.value;
    setState((state) => {
      return {
        ...state,
        choiceAnswers: answer,
      };
    });
  };

  const addAnswer = () => {
    let choiceAnswers = JSON.parse(JSON.stringify(state.choiceAnswers));
    choiceAnswers.push("");

    setState((state) => {
      return {
        ...state,
        choiceAnswers: choiceAnswers,
      };
    });
  };

  const deleteAnswer = (index: number) => {
    let choiceAnswers: string[] = JSON.parse(
      JSON.stringify(state.choiceAnswers)
    );
    let correctAnswer = state.correctAnswer;
    let count = 0;
    choiceAnswers.forEach((text: string, i: number) => {
      if (correctAnswer === i) {
        correctAnswer = count;
      }
      if (i !== index) {
        count++;
      }
    });
    choiceAnswers = choiceAnswers.filter(
      (text: string, i: number) => i !== index
    );

    setState((state) => {
      return {
        ...state,
        choiceAnswers: choiceAnswers,
        correctAnswer: correctAnswer,
      };
    });
  };

  return (
    <div className={className}>
      <div className="d-flex">
        {" "}
        {label && (
          <FormLabel className="d-flex  mr-auto">
            {label}&nbsp;
            {required && (
              <div>
                <div style={{ color: red["A400"] }}>*</div>
              </div>
            )}
            :
          </FormLabel>
        )}
        {errorText && (
          <FormHelperText className={style.error} error={!!errorText}>
            {errorText}
          </FormHelperText>
        )}
      </div>
      <ol type="A" style={{ padding: "0" }}>
        {state.choiceAnswers?.length &&
          state.choiceAnswers.map((text: string, index: number) => (
            <div key={index} className={style.answer_input}>
              <Radio
                checked={state.correctAnswer === index}
                className={style.checkbox}
                onClick={() => {
                  onCheckClicked(index);
                }}
              />
              <li></li>
              <TextField
                fullWidth
                size="small"
                onChange={(e) => {
                  onUpdateQuestion(e, index);
                }}
                variant="outlined"
                value={state.choiceAnswers[index] || ""}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                  onUpdateQuestion(e, index);
                }}
              />
              {state.choiceAnswers.length > 1 ? (
                <DeleteOutline
                  className="cursor-pointer"
                  onClick={() => {
                    deleteAnswer(index);
                  }}
                  sx={{ color: red["A400"] }}
                />
              ) : (
                ""
              )}
            </div>
          ))}
      </ol>
      <Button className={style.button} onClick={addAnswer}>
        + Thêm đáp án
      </Button>
    </div>
  );
};
export default QuestionAnswer;
