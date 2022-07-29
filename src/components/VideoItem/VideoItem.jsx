import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function VideoItem() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id, videoId } = useParams();
    const user = useSelector((store) => store.user);

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_VIDEO_ITEM', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS' }),
            dispatch({ type: 'FETCH_REACTION_COUNTS', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
    }, [id, videoId])

    const videoItem = useSelector(store => store.videosInfo.videoItem[0]);
    const reactions = useSelector(store => store.promptsInfo.allReactionsList);
    const reactionCounts = useSelector(store => store.promptsInfo.reactionCounts);
    const reactionItem = useSelector(store => store.promptsInfo.reactionItem[0]);

    const [clicked, setClicked] = useState(false);

    return (
        <>
            <Link className="sub-navLink" to="/prompt-page">
                Back
            </Link>
            {videoItem && (
                <>
                    <center>
                        <p className='page-subheadings'>{videoItem.question}</p>
                        <div>
                            <video src={videoItem.video_url} type="video/mp4" width="320" height="240" controls>
                                Your browser does not support the video tag.
                            </video>

                        </div>

                        {user.admin === true && <div><button className='btn'>Award Video</button></div>} {/**Button does nothing until there is an award to give */}

                        <p className='landing-copy'
                        >Submitted by: {videoItem.username}
                        </p>

                        {/* mapping over the reactions to create buttons to react to video */}
                        {reactions.map(reaction => {
                            let reactionNum = reaction.id
                            return (
                                // edit button that will edit buttons
                                <span key={reaction.id}>
                                    {/* if item has been clicked show a disabled pink button */}
                                    {reactionItem && reactionItem.reaction_id === reaction.id ?
                                        <>
                                            <button
                                                className="btn"
                                                disabled
                                                style={{ backgroundColor: 'pink' }}
                                            >{reaction.reaction}</button>
                                        </>
                                        :
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } }),
                                                dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
                                                setClicked(true)
                                            }}
                                            // style={{ backgroundColor: clicked && 'pink' }}
                                        >{reaction.reaction}</button>

                                    }


                                    {/* only show votes if user is an admin */}
                                    {user.admin === true &&
                                        <span>
                                            {reactionCounts.map(count => {
                                                if (count.reaction_id === reaction.id) {
                                                    return (
                                                        <span className='landing-copy' key={reaction.id}>Votes: {count.count}</span>
                                                    )
                                                }
                                            })}
                                        </span>
                                    }
                                    {user.admin === true &&
                                        <div><button
                                            className='btnOutlined'
                                            onClick={() => { history.push(`/${reaction.id}/edit-reactions`) }}
                                        >Edit Reaction</button></div>}
                                </span>

                            )
                        })}
                        {clicked &&
                            <div className='landing-copy'>Thanks for your vote!</div>}
                    </center>
                </>
            )}
        </>
    )
}
export default VideoItem;