import React from "react";
import { FormHelperText, FormLabel, Select, MenuItem } from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
const SelectInput: React.FC<InputProp> = (props): JSX.Element => {
  const {
    name,
    errorText,
    value = 0,
    label,
    data,
    className,
    onChange,
    required,
  } = props;
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
      <Select
        value={value}
        fullWidth
        size="small"
        name={name}
        id={name}
        onChange={onChange}
      >
        {data.map((text: string, index: number) => (
          <MenuItem key={index} value={index}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
export default SelectInput;
