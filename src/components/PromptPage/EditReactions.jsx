import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function EditReactions() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id, videoId } = useParams();
    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_REACTION', payload: id })
    }, [id])

    const [clicked, setClicked] = useState(false);

    const reaction = useSelector(store => store.promptsInfo.singleReaction);

    function handleSubmit(evt) {
        evt.preventDefault();
        dispatch({
            type: 'SAVE_NEW_REACTION',
            payload: reaction
        })
        setClicked(true)
    }

    return (
        <>
            <center>
                {user.admin === true && reaction &&
                    <>
                        <h2>Edit Reaction Below</h2>
                        <form onSubmit={handleSubmit}>
                            <>
                                <div className='landing-copy'>Reaction: {reaction.reaction}</div>
                                <div className='landing-copy'>Change to:</div>
                                <input type="text"
                                className='input-box'
                                    key={reaction.id}
                                    value={reaction.reaction}
                                    onChange={(evt) => {
                                        dispatch({ type: 'UPDATE_REACTIONS', payload: { reaction: evt.target.value } })
                                    }} />
                            </>
                            <button className='btnOutlined' type='submit'>Submit Changes</button>

                        </form>
                    </>
                }
                {clicked === true && (
                    <>
                        <div>Reaction has been changed to: {reaction.reaction}</div>
                    </>
                )
                }
                <Link className='landing-copy' to='/prompt-page'>Back to Prompts</Link>
            </center>
        </>
    )
}
export default EditReactions;