import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function VideoItem() {
    /**TODO
     *  x fetch prompt, username, rating buttons, and specific video for that prompt
     * page load will GET the cout of the video reactions for that video-response
     *          do this in the prompts saga and reducer and router          
     * reaction buttons will post to video-reactions
     * admin - edit buttons with PUT, video award button, edit the buttons button
     * change protected route route
     */

    const dispatch = useDispatch();
    const history = useHistory();
    const { id, videoId } = useParams();
    const user = useSelector((store) => store.user);

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_VIDEO_ITEM', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_REACTION_COUNTS', payload: { id, videoId } })
    }, [id, videoId])

    const videoItem = useSelector(store => store.videosInfo.videoItem[0]);
    const reactions = useSelector(store => store.promptsInfo.allReactionsList);
    const reactionCounts = useSelector(store => store.promptsInfo.reactionCounts);


    return (
        <>
            {videoItem && (
                <>

                    <h3>{videoItem.question}</h3>
                    <div>
                        <video width="320" height="240" controls>
                            {/* Below is dummy data for src, need to be updated after urls in db exist from AWS */}
                            {/* eventually it will be videoItem.video_url */}
                            <source src="./waterfall_vid.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h4>{videoItem.username}</h4>

                    {/* mapping over the reactions to create buttons to react to video */}
                    {reactions.map(reaction => {
                        return (
                            // need to make an onclick that will post to db
                            // edit button that will edit buttons
                            // dispatch to get count for each and put next to it, only admin
                            <span key={reaction.id}><button>{reaction.reaction}</button>

                                {/* only show votes if user is an admin */}
                                {user.admin === true &&
                                    <>
                                        {reactionCounts.map(count => {
                                            if (count.reaction_id === reaction.id) {
                                                return (
                                                    <span>Votes: {count.count}</span>
                                                )
                                            }
                                        })}
                                    </>
                                }
                            </span>

                        )
                    })}
                </>
            )}
        </>
    )
}
export default VideoItem;