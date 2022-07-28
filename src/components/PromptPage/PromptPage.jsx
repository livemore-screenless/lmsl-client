import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function PromptPage() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const allPromptsList = useSelector(store => store.promptsInfo.allPromptsList);
    const allVideosList = useSelector(store => store.videosInfo.allVideosList);

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS_LIST' })
        dispatch({ type: 'FETCH_VIDEO_LIST' })
    }, [])

    return (
        <div>
            <center>
                <h2 className='page-subheadings'>Select a prompt to view related videos</h2>
            </center>
            <ul >
                {allPromptsList.map(prompt => {
                    return (
                        <>
                        <Accordion key={prompt.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography>{prompt.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {allVideosList.map(video => {

                                    if (video.prompt_id === prompt.id) {
                                        return (
                                            <p 
                                                onClick={(evt) => { history.push(`/prompt-videos/${prompt.id}/${video.id}`) }}
                                            >
                                                    {video.video_url}
                                            </p>
                                        )
                                        }
                                    
                                })}
                            </AccordionDetails>
                        </Accordion>
                        </>
                    )
                })}
            </ul>
        
            <center>
            {/* show these buttons only if admin is logged in  */}
                {user.id && user.id===1 &&
                <span>
                    <button 
                        className="btn"
                        onClick={(evt) => {history.push('/edit-page')}}
                    >
                        Add Prompt
                    </button>
                    
                    <button 
                        className="btn"
                        onClick={(evt) => {history.push("/prompt-archive")}}
                    >
                        Archive Prompts
                    </button>
                </span>
                }
            </center>
        </div>
    )

}
export default PromptPage;