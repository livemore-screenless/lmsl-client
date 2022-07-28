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

    const reaction = useSelector(store => store.promptsInfo.singleReaction[0]);

    return (
        <>
            {user.admin === true &&
                <>
                    <h2>Edit Prompt Below</h2>
                    <form action="">
                        <>
                            <div>Reaction: {reaction.reaction}</div>
                            <div>Change to:</div>
                            <input type="text"
                                key={reaction.id}
                                value={reaction.reaction}
                                onChange={(evt) => {
                                    dispatch({ type: 'UPDATE_REACTIONS', payload: { newReaction: evt.target.value, reactionId: reaction.id } })
                                }} />
                        </>
                        <button type='submit'>Submit Changes</button>

                    </form>
                </>
            }

        </>
    )
}
export default EditReactions;