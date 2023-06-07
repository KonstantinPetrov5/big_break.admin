import s from './Login.module.sass'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import logo from '../../../public/assets/icons/Logo.svg'
import {useFormik} from 'formik'
import {useState} from 'react'
import toast from 'react-hot-toast'
import {loginValidation} from './validationSchema.js'


const Login = () => {


    const [btnLoading, setBtnLoading] = useState(false)


    const { getFieldProps, handleSubmit, errors } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginValidation,
        onSubmit: data => submitHandler(data)
    })

    const toastHandler = err => {
        const { status } = err.response
        if (status===401) toast.error('Неверный email или пароль')
        else toast.error('Произошла ошибка')
    }

    const submitHandler = data => {
        setBtnLoading(true)
        console.log('data: ', data)
        // toastHandler(err)
        setBtnLoading(false)
    }


    return (

        <form onSubmit={handleSubmit} className={ s.container }>

            <img src={ logo } alt='логотип'/>
            <TextInput
                {...getFieldProps('email')}
                error={errors}
                autoComplete='username'
                label='Введите Email'
            />
            <TextInput
                {...getFieldProps('password')}
                error={errors}
                type='password'
                autoComplete='current-password'
                label='Введите пароль'
            />
            <Button isLoading={btnLoading}>Войти</Button>

        </form>

    )
}


export default Login