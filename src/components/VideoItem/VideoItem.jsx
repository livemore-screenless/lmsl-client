import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
//mui imports
import Badge from '@mui/material/Badge';


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
            dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS_NUMBER' })
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
                            <video src={videoItem.video_url} type="video/mp4" width="640" height="480" controls>
                                Your browser does not support the video tag.
                            </video>

                        </div>
                        
                        <p className='landing-copy'>Submitted by: {videoItem.username}</p>

                        {user.admin && 
                        <>
                            <a className='btn_asLink' href={`mailto:${videoItem.email}`}>Award Video</a>
                            <br/>
                            <br/>
                        </>
                        }

                        {/* mapping over the reactions to create buttons to react to video */}
                        {reactions.map(reaction => {
                            let reactionNum = reaction.id
                            return (
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
                                    {user.admin &&
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
                                </span>
                            )
                        })}

                        {clicked &&
                        <>
                            <div className='landing-copy'>Thanks for your vote!</div>
                        </>
                        }
                    </center>
                </>
            )}
        </>
    )
}
export default VideoItem;



