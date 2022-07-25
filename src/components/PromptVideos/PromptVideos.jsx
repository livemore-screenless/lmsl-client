import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptVideos() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_VIDEO_LIST', payload: id })
    }, [id])

    const allVideosList = useSelector(store => store.videosInfo.allVideosList);

    return (
        <>
            <h1>LiveMore ScreenLess Video Prompts</h1>
            {/* Below is mapping over all the video URLs from the DB */}
            <ul>
                {allVideosList.map(video => {
                    return (
                        <li key={video.id}
                            onClick={(evt) => { history.push(/** push to the videoItem page*/) }}
                        >
                            <video width="320" height="240" controls>
                                {/* Below is dummy data for src, need to be updated after urls in db exist */}
                                <source src="./waterfall_vid.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </li>
                    )
                })}
            </ul>

            <span>
                <button onClick={(evt) => { history.push(/** push to the add new prompt page */) }}
                >Add Prompt</button>
                <button onClick={(evt) => { history.push(/** push to the edit prompts page*/) }}
                >Edit Prompts</button></span>
        </>
    )
}
export default PromptVideos;