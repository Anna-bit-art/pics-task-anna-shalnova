import React from "react";


type CommentPropsType = {
    id: number,
    body: string,
    userName: string,
    onClick: (id: number) => void
}

export function Comment(props:CommentPropsType) {

    const getInitials = () => {
        return props.userName.split(' ').map(el => el.charAt(0)).join('').toUpperCase();
    };

    const deleteItem = () => { props.onClick(props.id) };

    return <div className='comment'>
        <div className='initials'><span>{getInitials()}</span></div>
        <h5>{props.userName}</h5>
        <div className='body'>
            <button onClick={deleteItem}>x</button>
            <p>{props.body}</p>
        </div>
    </div>

}
