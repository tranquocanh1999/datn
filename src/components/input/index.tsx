import React from "react";
import { FormHelperText, TextField, FormLabel } from "@mui/material";
import "./index.scss";
interface InputProp {
  name: string;
  errorText: string;
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  className?: string;
  onChange?: any;
  number?: boolean;
}
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
  } = props;
  return (
    <div className={className}>
      <FormLabel>{label}:</FormLabel>
      {errorText && (
        <FormHelperText className="error" error={!!errorText}>
          {errorText}
        </FormHelperText>
      )}
      <TextField
        fullWidth
        size="small"
        name={name}
        id={name}
        onChange={onChange}
        error={!!errorText}
        variant="outlined"
        placeholder={placeholder && placeholder}
        value={value}
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
