import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../models/ITask';
import { INewTask } from '../models/INewTask';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://todoapi.devcherish.site/', prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            let token = localStorage.getItem('token')
            if (token) {
                token = JSON.parse(token)
                headers.set('auth-token', `${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: (id) => ({
                url: `tasks/get/${id}`,
                method: 'GET',
            }),
            providesTags: result => ['Task']
        }),
        createTask: builder.mutation<ITask, INewTask>({
            query: (data) => ({
                url: 'tasks/add',
                method: 'POST',
                body:  data ,
            }),
            invalidatesTags: ['Task']
        }),
        editTask: builder.mutation<ITask, ITask>({
            query: (data) => ({
                url: `tasks/edit/${data._id}`,
                method: 'PATCH',
                body:  data,

            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation<void, ITask>({
            query: (data) => ({
                url: `tasks/${data._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task']
        }),
    })
})