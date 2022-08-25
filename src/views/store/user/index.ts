import { Theme } from '@/views/styles/types';
import {createSlice} from '@reduxjs/toolkit'


export interface UserState {
    theme:Theme;
}

const localTheme = localStorage.getItem('theme') as Theme;
const initialState:UserState = {
    theme:localTheme?? Theme.Light,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleTheme:(state:UserState)=>{
            state.theme = state.theme === Theme.Dark ? Theme.Light : Theme.Dark;
            localStorage.setItem('theme', state.theme);
        },
    },
});

export const {toggleTheme} = userSlice.actions;
export default userSlice.reducer;