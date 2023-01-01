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
const QuestionAnswer: React.FC<InputProp> = (props): JSX.Element => {
  const {
    name,
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

  useEffect(() => {
    setState({
      choice_answers: data,
      correct_answers: value as number[],
    });
  }, [data, value]);

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

  const onUpdateQuestion = (e: any, index: number) => {};
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
      <ol type="A" style={{ padding: "0 16px 0 0" }}>
        {data?.length &&
          data.map((text: string, index: number) => (
            <div key={index} className="d-flex">
              <Checkbox
                checked={state.correct_answers.includes(index)}
                className={style.checkbox}
                onClick={() => {
                  onCheckClicked(index);
                }}
              />
              <li>
                <TextField
                  fullWidth
                  size="small"
                  onChange={(e) => {
                    onUpdateQuestion(e, index);
                  }}
                  variant="outlined"
                  value={state.choice_answers[index]}
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                    onChange(e, index);
                  }}
                />
              </li>
            </div>
          ))}
      </ol>
      {isEdit && <Button className={style.button}>+ Thêm đáp án</Button>}
    </div>
  );
};
export default QuestionAnswer;
