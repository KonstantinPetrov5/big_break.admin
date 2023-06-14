import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userAtom = atom({
    key: 'userAtomKey',
    default: {
        token: ''
    },
    effects_UNSTABLE: [persistAtom]
})