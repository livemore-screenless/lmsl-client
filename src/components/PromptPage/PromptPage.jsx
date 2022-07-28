import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptPage() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const allPromptsList = useSelector(store => store.promptsInfo.allPromptsList);

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS_LIST' })
    }, [])

    return (
        <div>
        <center>
            <h2 className='page-subheadings'>Select a prompt to view related videos</h2>
            <ul >
                {allPromptsList.map(prompt => {
                    return (
                        <>
                        <li key={prompt.id}>
                            <p className='prompts' onClick={(evt) => { history.push(`/prompt-videos/${prompt.id}`) }}>{prompt.question}</p>
                        </li>
                        </>
                    )
                })}
            </ul>

            {/* show these buttons only if admin is logged in  */}
                {user.id && user.id===1 &&
                <span>
                    <button 
                        className="btn"
                        onClick={(evt) => {history.push(/** push to the add new prompt page */)}}
                    >
                        Add Prompt
                    </button>
                    
                    <button 
                        className="btn"
                        onClick={(evt) => {history.push("/prompt-edit")}}
                    >
                        Edit Prompts
                    </button>
                </span>
                }
            </center>
        </div>
    )

}
export default PromptPage;