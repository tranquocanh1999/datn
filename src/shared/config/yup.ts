import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "field_invalid",
    required: ({ label }) => `${label} không được để  trống`,
    notType: (_ref) => {
      switch (_ref.type) {
        case "number":
          return `${_ref.label} phải là số`;
        case "string":
          return "Not a string error or any other custom error message";
        default:
          return "Wrong type error or any other custom error message";
      }
    },
  },
  // use constant translation keys for messages without values
  string: {
    min: ({ min, label }) => `${label} phải nhập tối thiểu ${min} kí tự`,
    max: ({ max, label }) => `${label} không được nhập quá ${max} kí tự`,
    email: "Email không đúng định dạng",
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min, label }) => {
      return `${label} không nhỏ hơn ${min}`;
    },
    max: ({ max, label }) => `${label} không quá ${max}`,
  },
});

export default yup;
