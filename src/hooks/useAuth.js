import {useRecoilValue} from 'recoil'
import {userAtom} from '../store/UserRecoil.js'


export const useAuth = () => {

    const { token } = useRecoilValue(userAtom)
    return !!token

}