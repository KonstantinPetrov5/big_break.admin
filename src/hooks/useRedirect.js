import {useLocation, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'


export const useRedirect = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    useEffect( () => {
        if (pathname === '/') navigate('/main/banner', { replace: true })
    }, [pathname] )
}