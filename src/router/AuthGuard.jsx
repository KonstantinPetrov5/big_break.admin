import {useAuth} from '../hooks/useAuth.js'
import {Navigate} from 'react-router-dom'


export const AuthGuard = ({ route }) => {
    const isAuth = useAuth()
    return isAuth ? route : <Navigate to="/login" replace={true}/>
}