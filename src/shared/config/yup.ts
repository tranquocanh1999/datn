import * as yup from "yup";

yup.setLocale({
  // use constant translation keys for messages without values
  string: {
    min: ({ min, label }) => `${label} phải nhập tối thiểu ${min} kí tự`,
    max: ({ max, label }) => `${label} không được nhập quá ${max} kí tự`,
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min, label }) => {
      return `${label} phải nhập tối thiểu ${min} kí tự`;
    },
    max: ({ max, label }) => `${label} không được nhập quá ${max} kí tự`,
  },
});

export default yup;
