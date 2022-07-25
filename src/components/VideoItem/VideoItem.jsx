import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function VideoItem() {
    /**TODO
     * fetch prompt, username, rating buttons, and specific video for that prompt
     * rating buttons POST a +1 to DB
     * admin - edit buttons with PUT, video award button, edit the buttons button
     * change protected route route
     */

    const dispatch = useDispatch();
    const history = useHistory();
    const { id, videoId } = useParams();

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_VIDEO_ITEM', payload: {id, videoId} })
    }, [id])

    const allVideosList = useSelector(store => store.videosInfo.allVideosList);

    return (
        <>
            <h3>Want the prompt to go here</h3>
            {/* Below is mapping over all the video URLs from the DB 
            Do we want to make this into a carousel?*/}
            <ul>
                {allVideosList.map(video => {
                    return (
                        <li key={video.id}
                            onClick={(evt) => { history.push(/** push to the videoItem page*/) }}
                        >
                            <video width="320" height="240" controls>
                                {/* Below is dummy data for src, need to be updated after urls in db exist from AWS */}
                                <source src="./waterfall_vid.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h4>{video.username}</h4>
                        </li>
                    )
                })}
            </ul>

            <span>
                <button onClick={(evt) => { history.push(/* push to the add new video page for this url id */) }}
                >Submit your own video</button>
                </span>
        </>
    )
}
export default VideoItem;