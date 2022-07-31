import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';

// mui imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';

//this is the mui styling 
const useStyles = makeStyles((theme) => ({
    landingImages: {
        maxWidth: 100,
        padding: '1%'
    },
}));

function PromptPage() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const allPromptsList = useSelector(store => store.promptsInfo.allPromptsList);
    const allVideosList = useSelector(store => store.videosInfo.allVideosList);
    const reactions = useSelector(store => store.promptsInfo.allReactionsList);
    const singleReaction = useSelector(store => store.promptsInfo.singleReaction);

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

    function handleSubmitNewReaction(evt) {
        evt.preventDefault();
        dispatch({
            type: 'SAVE_NEW_REACTION',
            payload: singleReaction
        })

    }

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS_LIST' }),
            dispatch({ type: 'FETCH_VIDEO_LIST' }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS' })
    }, [])

    const deletePrompt = event => {
        const id = event.currentTarget.id;
        console.log('id', id)
        if (confirm("Are you sure you want to delete this prompt?") == true) {
            dispatch({ type: 'DELETE_PROMPT', payload: id })
        }
    }

    const archivePrompt = event => {
        const id = event.currentTarget.id;
        alert("Prompt and related videos have been archived!")
        dispatch({ type: 'ARCHIVE_PROMPT', payload: id })
    }

    return (
        <div>
            <center>
                <h2 className='page-subheadings'>Select a prompt to view related videos</h2>
                <img src={require('./laptop.png')} className={classes.landingImages} />
                <img src={require('./phone.png')} className={classes.landingImages} />
                <img src={require('./computer.png')} className={classes.landingImages} />
            </center>
            <ul >
                {allPromptsList.map(prompt => {
                    if (prompt.archived === false) {
                    return (
                        <>
                            <Accordion key={prompt.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <span>
                                        <div>
                                            {prompt.question}
                                            {!user.admin &&
                                                <button className="submit-link"
                                                    onClick={() => { history.push(`/user-upload/${prompt.id}`) }}>
                                                    Submit Video
                                                </button>
                                            }
                                            {user.admin &&
                                                <>
                                                <button
                                                    id={prompt.id}
                                                    className="delete-link"
                                                    onClick={deletePrompt}
                                                >
                                                    X
                                                </button>
                                            }
                                             {user.admin &&
                                                <button
                                                    id={prompt.id}
                                                    className="archive-link"
                                                    onClick={archivePrompt}
                                                >
                                                    Archive
                                                </button>
                                                </>
                                            }
                                        </div>
                                    </span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {allVideosList.map(video => {
                                        if (video.prompt_id === prompt.id) {
                                            return (
                                                <Card sx={{ maxWidth: '320px', display: 'inline-block' }}>
                                                    <span
                                                        className="video-list-item"
                                                        key={video.id}
                                                        onClick={() => { history.push(`/prompt-videos/${prompt.id}/${video.id}`) }}
                                                    >
                                                        <video className="watch-video" src={video.video_url} type="video/mp4" width="320" height="240" poster >
                                                            Your browser does not support the video tag.
                                                        </video>

                                                        <div className='overlay'><img src={require('./play-btn.png')} class="play-button" /></div>

                                                    </span>
                                                </Card>
                                            )
                                        }
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )
                    }
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
                            <form onSubmit={handleSubmitNewReaction}>
                                {reactions.map(reaction => {

                                    return (
                                        <span><button
                                            className='btnOutlined'
                                            onClick={() => { dispatch({ type: 'FETCH_SINGLE_REACTION', payload: reaction.id }) }}
                                        >Edit reaction: {reaction.reaction}</button></span>
                                    )
                                })}
                                <input type="text"
                                    className='input-box'
                                    key={singleReaction.id}
                                    value={singleReaction.reaction}
                                    onChange={(evt) => {
                                        dispatch({ type: 'UPDATE_REACTIONS', payload: { reaction: evt.target.value } })
                                    }} />
                                <button className='btnOutlined' type='submit'>Submit Changes</button>
                            </form>
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
