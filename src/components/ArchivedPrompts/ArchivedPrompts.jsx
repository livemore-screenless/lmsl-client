import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';

// mui imports
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

//this is the mui styling 
const useStyles = makeStyles((theme) => ({
    landingImages: {
      maxWidth: 100,
      padding: '1%'
    },
  }));

function ArchivedPrompts() {
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

    return (
        <div>
            <center>
                <h2 className='page-subheadings'>Archive</h2>
            </center>
            <ul >
                {allPromptsList.map(prompt => {
                    if (prompt.archived === true) {
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
                                                <button
                                                    id={prompt.id}
                                                    className="delete-link"
                                                    onClick={deletePrompt}
                                                >
                                                    x
                                                </button>
                                            }
                                        </div>
                                    </span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {allVideosList.map(video => {
                                        if (video.prompt_id === prompt.id) {
                                            return (
                                                <p
                                                    key={video.id}
                                                    onClick={() => { history.push(`/prompt-videos/${prompt.id}/${video.id}`) }}
                                                >
                                                    <video src={video.video_url} type="video/mp4" width="320" height="240" poster >
                                                        Your browser does not support the video tag.
                                                    </video>                                                    
                                                </p>
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
        </div>
    )
}
export default ArchivedPrompts;
