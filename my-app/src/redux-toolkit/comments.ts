import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCommentsApi} from "../api/comment";


export const getComments = createAsyncThunk(
    'getComments',
    async () => {
        const response = await getCommentsApi();
        return await response.json();
    }
)

export type IComment = {
    id: number,
    body: string,
    postId: number,
    user: {
        id: number,
        username: string
    }
}

interface ICommentsState {
    comments: Array<IComment>,
    total: number,
    skip: number,
    limit: number
}

const initialState: ICommentsState | undefined = {
    comments: [],
    total: 0,
    skip: 0,
    limit: 0
}


const counterSlice = createSlice({
        name: 'comments',
        initialState,

        reducers: {
            addComment: (state, action) => {
                let newItem: IComment = {
                    id: Date.now(), body: action.payload,
                    postId: 65, user: {id: 345, username: 'Anna Shalnova'}
                };

                state.comments = [...state.comments, newItem];
            },
            deleteComment: (state, action) => {
                state.comments = state.comments.filter(el => el.id !== action.payload);
            },
        },
        extraReducers: (builder) => {
            builder.addCase(getComments.fulfilled, (state, action) => {
                state.comments = action.payload.comments;
                state.total = action.payload.total;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
            })
        }
    }
);

export const {deleteComment, addComment} = counterSlice.actions;
export default counterSlice.reducer;




