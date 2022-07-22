import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptVideos() {

    const dispatch = useDispatch();
    const history = useHistory();

// this will fetch prompts from DB and set in store allPromptsList
// list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_VIDEO_LIST' })
    }, [])

    const allPromptsList = useSelector(store => store.videoInfo.allVideosList);

return(
<>
<h1>LiveMore ScreenLess Video Prompts</h1>
 {allVideosList.map(video => {
    return (
        <ul key={video.id}
        onClick={(evt) => {history.push(/** push to the videoItem page*/)}}
        >
            <li>need video html/url here</li>
        </ul>
    )
 })}

 <span>
    <button onClick={(evt) => {history.push(/** push to the add new prompt page */)}}
    >Add Prompt</button>
    <button onClick={(evt) => {history.push(/** push to the edit prompts page*/)}}
    >Edit Prompts</button></span>
</>
)
}
export default PromptVideos;