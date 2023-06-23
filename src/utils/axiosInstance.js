import axios from 'axios'
import {getRecoil, resetRecoil} from 'recoil-nexus'
import {userAtom} from '../store/UserRecoil.js'


const baseURL = 'https://api.xn--80aabraa2blkdnn4h9b6b.xn--80asehdb/api/v1/'


export const axiosAuth = axios.create({ baseURL })

axiosAuth.interceptors.request.use(req => {
    const { token } = getRecoil(userAtom)
    req.headers.Authorization = 'Bearer ' + token
    return req
})

axiosAuth.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            resetRecoil(userAtom)
        }
        return Promise.reject(err)
    }
)
