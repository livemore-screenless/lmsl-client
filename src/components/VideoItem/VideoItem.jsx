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
            dispatch({ type: 'FETCH_REACTION_COUNTS', payload: { id, videoId } })
    }, [id, videoId])

    const videoItem = useSelector(store => store.videosInfo.videoItem[0]);
    const reactions = useSelector(store => store.promptsInfo.allReactionsList);
    const reactionCounts = useSelector(store => store.promptsInfo.reactionCounts);

    const [clicked, setClicked] = useState(false);

    return (
        <>
            <Link className="sub-navLink" to="/prompt-page">
              Back
            </Link>
            {videoItem && (
                <>

                    <h3>{videoItem.question}</h3>
                    <div>
                        <video width="320" height="240" controls>
                            {/* Below is dummy data for src, need to be updated after urls in db exist from AWS */}
                            {/* eventually it will be videoItem.video_url */}
                            <source src={videoItem.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                    </div>
                    <p>Submitted by: {videoItem.username} {user.admin === true && <button>Award Video</button>}</p> {/**Button does nothing until there is an award to give */}


                    {/* mapping over the reactions to create buttons to react to video */}
                    {reactions.map(reaction => {
                        let reactionNum = reaction.id
                        return (
                            // edit button that will edit buttons
                            <span key={reaction.id}>
                                {/* if item has been clicked show a disabled button */}
                                {clicked ?
                                    <>
                                        <button
                                            disabled
                                        >{reaction.reaction}</button>
                                        <span>Only 1 vote allowed per video</span>
                                    </>
                                    :
                                    <button
                                        onClick={() => {
                                            dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } })
                                            setClicked(true)
                                        }}

                                    >{reaction.reaction}</button>

                                }


                                {/* only show votes if user is an admin */}
                                {user.admin === true &&
                                    <div>
                                        {reactionCounts.map(count => {
                                            if (count.reaction_id === reaction.id) {
                                                return (
                                                    <span key={reaction.id}>Votes: {count.count}</span>
                                                )
                                            }
                                        })}

                                    </div>
                                }
                                {user.admin === true &&
                                    <div><button
                                        onClick={() => { history.push(`/${reaction.id}/edit-reactions`) }}
                                    >Edit Reaction</button></div>}
                            </span>

                        )
                    })}


                </>
            )}
        </>
    )
}
export default VideoItem;