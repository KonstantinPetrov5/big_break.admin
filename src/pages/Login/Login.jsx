import s from './Login.module.sass'
import TextInput from '../../components/ui/TextInput/TextInput.jsx'
import Button from '../../components/ui/Button/Button.jsx'
import logo from '../../../public/assets/icons/Logo.svg'
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import {useRecoilState} from 'recoil'
import {userAtom} from '../../store/UserRecoil.js'
import {useNavigate} from 'react-router-dom'
import {axiosAuth} from '../../utils/axiosInstance.js'


const Login = () => {


    const [btnLoading, setBtnLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [user, setUser] = useRecoilState(userAtom)

    const navigate = useNavigate()

    useEffect( () => {
        if (user.token) navigate('/')
    }, [user] )


    const toastHandler = err => {
        const { status } = err.response
        if (status===401) toast.error('Неверный email или пароль')
        else toast.error('Произошла ошибка')
    }

    const submitHandler = e => {
        e.preventDefault()
        setBtnLoading(true)
        axiosAuth.post( '/login', { email, password } )
            .then( ({data}) => setUser({ token: data.token }) )
            .catch( toastHandler )
            .finally( () => setBtnLoading(false) )
    }


    return (

        <form onSubmit={ e => submitHandler(e) } className={ s.container }>

            <img src={ logo } alt='логотип'/>
            <TextInput
                value={email}
                onChange={ e => setEmail(e.target.value) }
                autoComplete='username'
                label='Введите Email'
            />
            <TextInput
                value={password}
                onChange={ e => setPassword(e.target.value) }
                type='password'
                autoComplete='current-password'
                label='Введите пароль'
            />
            <Button isLoading={btnLoading}>Войти</Button>

        </form>

    )
}


export default Login