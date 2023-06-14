import {axiosAuth} from './axiosInstance.js'
import {resetRecoil} from 'recoil-nexus'
import {userAtom} from '../store/UserRecoil.js'


export const logoutHandler = () => {
    axiosAuth.post( '/logout' )
        .finally( () => resetRecoil(userAtom) )

}