import React from "react";
import { FormHelperText, FormLabel, Select } from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
const SelectInput: React.FC<InputProp> = (props): JSX.Element => {
  const {
    name,
    errorText,
    value = 0,
    label,
    className,
    onChange,
    required,
    children,
    multiple,
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
        multiple={multiple}
        id={name}
        onChange={onChange}
      >
        {children}
      </Select>
    </div>
  );
};
export default SelectInput;
