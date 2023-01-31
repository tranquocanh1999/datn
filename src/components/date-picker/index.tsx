import React from "react";
import { FormHelperText, TextField, FormLabel } from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
const DateInput: React.FC<InputProp> = (props): JSX.Element => {
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
      <DatePicker
        openTo="day"
        views={["year", "month", "day"]}
        value={moment(value || moment().format("DD-MM-yyyy"), "DD-MM-yyyy")}
        onChange={(e) => {
          onChange(e?.format("DD-MM-yyyy"));
        }}
        inputFormat="DD/MM/YYYY"
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
export default DateInput;
