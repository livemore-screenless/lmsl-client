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
        dispatch({ type: 'FETCH_VIDEO_REACTIONS', payload: { id, videoId } })
    }, [id, videoId])

    const reactions = useSelector(store => store.promptsInfo.allReactionsList);

    return (
        <>
            {user.admin === true &&
                <>
                    <h2>Edit Prompts Below</h2>
                    {/* <form action=""> */}
                        {/* value input will be reaction question */}
                        {reactions.map(reaction => {
                            return (
                                <>
                                    <div>Reaction: {reaction.reaction}</div>
                                    <div>Change to:</div>
                                    <input type="text"
                                        key={reaction.id}
                                        // value={reaction.reaction}
                                        onChange={(evt) => {
                                            dispatch({ type: 'UPDATE_REACTIONS', payload: {newReaction: evt.target.value, reactionId: reaction.id}})
                                        }
                                        } />
                                </>

                            )
                        })}
                        {/* <button
                            type='submit'>Submit Changes</button> */}

                    {/* </form> */}
                </>
            }

        </>
    )
}
export default EditReactions;