import axios from 'axios'


const baseURL = 'https://api.upkeep.kz/api/admin'


export const axiosAuth = axios.create({ baseURL })

// axiosAuth.interceptors.request.use(req => {
//     const { token } = getRecoil(userAtom)
//     req.headers.Authorization = 'Bearer ' + token
//     return req
// })
//
// axiosAuth.interceptors.response.use(
//     res => res,
//     err => {
//         if (err.response.status === 401) {
//             resetRecoil(userAtom)
//         }
//         return Promise.reject(err)
//     }
// )
