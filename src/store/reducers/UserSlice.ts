import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

interface UserState {
    user: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: [],
    isLoading: false,
    error: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegistration (state){
            state.isLoading = true;
        },
        userRegistrationSuccess (state, action: PayloadAction<IUser[]>){
            state.isLoading = false;
            state.user = action.payload;
            state.error = '';
        },
        userRegistrationError (state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default userSlice.reducer;