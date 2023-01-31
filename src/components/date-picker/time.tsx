import React from "react";
import { FormHelperText, TextField, FormLabel } from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
const TimeInput: React.FC<InputProp> = (props): JSX.Element => {
  const { errorText, label, value, className, onChange, required } = props;

  return (
    <div className={className}>
      <FormLabel className="d-flex">
        {label}&nbsp;
        {required && (
          <div>
            <div style={{ color: red["A400"] }}>*</div>
          </div>
        )}
        :
      </FormLabel>
      {errorText && (
        <FormHelperText className={style.error} error={!!errorText}>
          {errorText}
        </FormHelperText>
      )}
      <TimePicker
        value={moment(value || moment().format("HH:mm:ss"), "HH:mm:ss")}
        onChange={(e) => {
          onChange(e?.format("HH:mm:ss"));
        }}
        inputFormat="HH:mm:ss"
        renderInput={(params) => (
          <TextField
            fullWidth
            size="small"
            error={!!errorText}
            variant="outlined"
            {...params}
          />
        )}
      />
    </div>
  );
};
export default TimeInput;
