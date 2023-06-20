import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {RootState, useStoreDispatch} from "./redux-toolkit/store";
import {useSelector} from "react-redux";
import {deleteComment, addComment, getComments} from "./redux-toolkit/comments";
import {Comment} from "./Components/Comment";


function App() {

    const dispatch = useStoreDispatch();
    const comments = useSelector((state: RootState) => state.comments.comments);

    const [comment, setComment] = useState(() => {
        const saved = localStorage.getItem("comment");
        const initialValue = JSON.parse(saved as string);
        return initialValue || "";
    });

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch]);
    useEffect(() => {
        localStorage.setItem('comment', JSON.stringify(comment))
    }, [comment]);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    }
    const onClickHandler = () => {
        dispatch(addComment(comment));
        setComment('');
    }

    return (
        <div className="App">

            <div className='comments'>
                {comments.map(el => {
                    const onHandlerDeleteComment = () => {
                        dispatch(deleteComment(el.id))
                    }
                    return <Comment key={el.id} id={el.id} body={el.body}
                                    userName={el.user.username} onClick={onHandlerDeleteComment}/>
                })}
            </div>


            <div className='newComment'>
                <textarea value={comment} onChange={onChangeHandler}> </textarea>
                <button onClick={onClickHandler}>Send</button>
            </div>

        </div>
    );
}

export default App;
