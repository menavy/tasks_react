import axios from "axios";
import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import { userSlice } from "./UserSlice";


export const fetchUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userRegistration())
        const response = await axios.post<any>('http://todoapi.devcherish.site/users/registr', {})
        dispatch(userSlice.actions.userRegistrationSuccess(response.data))
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        window.localStorage.setItem('token', JSON.stringify(response.data.token))
    } catch (e:any) {
        dispatch(userSlice.actions.userRegistrationError(e.message))
    }
}