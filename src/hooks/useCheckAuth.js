import {useEffect} from "react";
import {axiosAuth} from '../utils/axiosInstance.js'



export const useCheckAuth = () => {

    useEffect(() => {
        axiosAuth( '/user' )
    }, [])

}

