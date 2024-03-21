
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../models/IBoard';
import { INewBoard } from '../models/INewBoard';

export const boardApi = createApi({
    reducerPath: 'boardApi',
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
    tagTypes: ['Board'],
    endpoints: (builder) => ({
        getBoards: builder.query<IBoard[], void>({
            query: () => ({
                url: 'boards/get',
                method: 'GET',
            }),
            providesTags: result => ['Board']
        }),
        createBoard: builder.mutation<IBoard, INewBoard>({
            query: (data) => ({
                url: 'boards/add',
                method: 'POST',
                body: { name: data.name },

            }),
            invalidatesTags: ['Board']
        }),
        editBoard: builder.mutation<IBoard, IBoard>({
            query: (data) => ({
                url: `boards/edit/${data._id}`,
                method: 'PATCH',
                body: { name: data.name },

            }),
            invalidatesTags: ['Board']
        }),
        deleteBoard: builder.mutation<void, IBoard>({
            query: (data) => ({
                url: `boards/${data._id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['Board']
        }),
    })
})
