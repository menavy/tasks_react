import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { type } from "os"
import userReducer from './reducers/UserSlice'
import { taskApi } from "../services/TaskService"
import { boardApi } from "../services/BoardService"

const rootReducer = combineReducers({
    userReducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware).concat(boardApi.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];