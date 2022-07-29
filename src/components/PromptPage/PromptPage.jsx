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
    const [question, setQuestion] = useState("");
    const [prompt, setPrompt] = useState(false);
    const [reactionClick, setReactionClick] = useState(false);


    const handleSubmit = (evt) => {
        evt.preventDefault();

        dispatch({
            type: "NEW_PROMPTS_LIST",
            payload: {
                question,
            },
        });

        setQuestion("");
        history.push("/prompt-page");
    };
    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS_LIST' }),
            dispatch({ type: 'FETCH_VIDEO_LIST' }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS' })
    }, [])

    const reactions = useSelector(store => store.promptsInfo.allReactionsList);

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
                                    <span>
                                        <div>{prompt.question}
                                            <button className="submit-link"
                                                onClick={() => { history.push(`/user-upload/${prompt.id}`) }}>
                                                Submit Video
                                            </button>
                                        </div>
                                    </span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {allVideosList.map(video => {

                                        if (video.prompt_id === prompt.id) {
                                            return (
                                                <p
                                                    key={video.id}
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

            <center className='add-prompts-condit'>
                {/* show these buttons only if admin is logged in  
                This is used to add a new prompt to the list*/}
                {user.admin && prompt &&
                    <>
                        <div className="landing-copy">What prompt would you like to add?</div>
                        <form onSubmit={handleSubmit}>
                            <input
                                onChange={(event) => setQuestion(event.target.value)}
                                value={question}
                                className='input-box'
                            />
                            <input type="submit" value="Add Prompt" className="btn" />
                        </form>
                    </>
                }
                {user.admin && !prompt &&
                    <span>
                        <button
                            className="add-prompts-btn"
                            value={prompt}
                            onClick={() => setPrompt(!prompt)}
                        >
                            Add Prompt
                        </button>
                    </span>
                }
                {user.admin && prompt &&
                    <div>
                        <button
                            className="nevermind-btn"
                            value={prompt}
                            onClick={() => setPrompt(!prompt)}
                        >
                            Nevermind
                        </button>
                    </div>
                }

                {/* show these buttons only if admin is logged in  
                This is used to change the reactions from the reactions list */}
                {user.admin && !reactionClick &&

                    <div>
                        <button
                            className="add-prompts-btn"
                            value={reactionClick}
                            onClick={() => setReactionClick(!reactionClick)}
                        >
                            Edit Reactions to Videos
                        </button>
                    </div>
                }
                {user.admin && reactionClick &&
                    <>
                        <div>
                            {reactions.map(reaction => {
                                return (
                                    <span><button
                                        className='btnOutlined'
                                        onClick={() => { history.push(`/${reaction.id}/edit-reactions`) }}
                                    >Edit reaction: {reaction.reaction}</button></span>
                                )
                            })}
                        </div>
                    </>
                }
                {user.admin && reactionClick &&
                    <div>
                        <button
                            className="nevermind-btn"
                            value={reactionClick}
                            onClick={() => setReactionClick(!reactionClick)}
                        >
                            Nevermind
                        </button>
                    </div>
                }
            </center>
        </div>
    )

}
export default PromptPage;