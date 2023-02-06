import React from "react";
import { FormHelperText, TextField, FormLabel } from "@mui/material";
import style from "./index.module.scss";
import { InputProp } from "../../shared/utils/inteface";
import { red } from "@mui/material/colors";
const FieldInput: React.FC<InputProp> = (props): JSX.Element => {
  const {
    name,
    errorText,
    label,
    placeholder,
    value,
    type,
    className,
    onChange,
    number = false,
    row,
    required,
    disabled,
  } = props;
  return (
    <div className={className}>
      <div className="d-flex">
        {label && (
          <FormLabel className="d-flex mr-auto">
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
      <TextField
        fullWidth
        size="small"
        name={name}
        id={name}
        onChange={onChange}
        error={!!errorText}
        variant="outlined"
        multiline={Boolean(row)}
        rows={row}
        placeholder={placeholder && placeholder}
        value={value ?? ""}
        disabled={disabled}
        onBlur={(e) => {
          e.target.value = e.target.value.trim();
          if (number) {
            e.target.value = e.target.value
              .normalize("NFKC")
              .replaceAll(/[^0-9]/g, "");
          }
          onChange(e);
        }}
        type={type}
      />
    </div>
  );
};
export default FieldInput;
