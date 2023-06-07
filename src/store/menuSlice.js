import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    menuIsOpen: false
}


export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state, { payload }) => {
            state.menuIsOpen = payload
        }
    }
})


export const { setMenu } = menuSlice.actions
export const menuReducer = menuSlice.reducer