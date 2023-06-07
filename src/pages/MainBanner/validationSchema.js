import * as yup from 'yup'


export const MainBannerValidation = yup.object({
    code: yup
        .string()
        .required( 'Промокод не сгенерировался автоматически. Попробуйте обновить страницу' ),

})