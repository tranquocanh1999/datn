/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  FormHelperText,
  FormLabel,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
import { DeleteOutline } from "@mui/icons-material";
const QuestionAnswer: React.FC<InputProp> = (props): JSX.Element => {
  const {
    errorText,
    value,
    label,
    data,
    className,
    onChange,
    required,
    isEdit,
  } = props;
  interface type {
    choice_answers: string[];
    correct_answers: number[];
  }
  const [state, setState] = useState<type>({
    choice_answers: [],
    correct_answers: [],
  });
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        choice_answers: data,
        correct_answers: value as number[],
      };
    });
  }, []);

  useEffect(() => {
    if (!isFirst) onChange(state);
    setIsFirst(false);
  }, [state]);

  const onCheckClicked = (index: number) => {
    if (state.correct_answers.includes(index)) {
      setState((state) => {
        return {
          ...state,
          correct_answers: state.correct_answers.filter((i) => i !== index),
        };
      });
    } else {
      let answer = JSON.parse(JSON.stringify(state.correct_answers));
      answer.push(index);
      setState((state) => {
        return {
          ...state,
          correct_answers: answer,
        };
      });
    }
  };

  const onUpdateQuestion = (e: any, index: number) => {
    let answer = JSON.parse(JSON.stringify(state.choice_answers));
    answer[index] = e.target.value;
    setState((state) => {
      return {
        ...state,
        choice_answers: answer,
      };
    });
  };

  const addAnswer = () => {
    let choice_answers = JSON.parse(JSON.stringify(state.choice_answers));
    choice_answers.push("");

    setState((state) => {
      return {
        ...state,
        choice_answers: choice_answers,
      };
    });
  };

  const deleteAnswer = (index: number) => {
    let choice_answers = JSON.parse(JSON.stringify(state.choice_answers));
    let correct_answers = JSON.parse(JSON.stringify(state.correct_answers));
    choice_answers = choice_answers.filter(
      (text: string, i: number) => i !== index
    );
    correct_answers = correct_answers
      .filter((value: number) => value !== index)
      .map((value: number) => {
        if (value > index) return value - 1;
        return value;
      });

    setState((state) => {
      return {
        ...state,
        choice_answers: choice_answers,
        correct_answers: correct_answers,
      };
    });
  };

  return (
    <div className={className}>
      {label && (
        <FormLabel className="d-flex">
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
      <ol type="A" style={{ padding: "0" }}>
        {state.choice_answers?.length &&
          state.choice_answers.map((text: string, index: number) => (
            <div key={index} className={style.answer_input}>
              <Checkbox
                checked={state.correct_answers.includes(index)}
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
                value={state.choice_answers[index] || ""}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                  onUpdateQuestion(e, index);
                }}
              />
              {state.choice_answers.length > 2 ? (
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
      {isEdit && (
        <Button className={style.button} onClick={addAnswer}>
          + Thêm đáp án
        </Button>
      )}
    </div>
  );
};
export default QuestionAnswer;
