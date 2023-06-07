import * as yup from "yup"

export const loginValidation = yup.object({
  email: yup
    .string()
    .email('Некорректный e-mail')
    .required('Поле обязательно'),
  password: yup
    .string()
    .required('Поле обязательно'),
})