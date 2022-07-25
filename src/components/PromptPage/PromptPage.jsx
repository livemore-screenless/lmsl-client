import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS_LIST' })
    }, [])

    const allPromptsList = useSelector(store => store.promptsInfo.allPromptsList);

    return (
        <>
            <h1>LiveMore ScreenLess Video Prompts</h1>
            <ul >
                {allPromptsList.map(prompt => {
                    return (
                        <li key={prompt.id}>{prompt.question}
                            <button onClick={(evt) => { history.push(`/prompt-videos/${prompt.id}`) }}
                            >View Videos</button></li>
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
export default PromptPage;