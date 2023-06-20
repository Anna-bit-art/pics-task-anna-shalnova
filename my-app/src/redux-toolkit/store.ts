import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux';
import comments from './comments';

export const store = configureStore({
    reducer: {
        comments
    },
    devTools: true,
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;

