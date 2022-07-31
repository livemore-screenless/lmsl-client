import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';
//mui imports
import Badge from '@mui/material/Badge';


function VideoItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, videoId } = useParams();
    const user = useSelector((store) => store.user);

    // this will fetch prompts from DB and set in store allPromptsList
    // list is mapped over below
    useEffect(() => {
            dispatch({ type: 'FETCH_VIDEO_ITEM', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS' }),
            dispatch({ type: 'FETCH_REACTION_COUNTS', payload: { id, videoId } }),
            dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } }),
            dispatch({ type: 'FETCH_VIDEO_REACTIONS_NUMBER' })
    }, [id, videoId])

    const videoItem = useSelector(store => store.videosInfo.videoItem[0]);
    const reactions = useSelector(store => store.promptsInfo.allReactionsList);
    const reactionCounts = useSelector(store => store.promptsInfo.reactionCounts);
    const reactionItem = useSelector(store => store.promptsInfo.reactionItem[0]);

    const [clicked, setClicked] = useState(false);

    return (
        <>
            <Link className="sub-navLink" to="/prompt-page">
                Back
            </Link>
            {videoItem && (
                <>
                    <center>
                        <p className='page-subheadings'>{videoItem.question}</p>
                        <div>
                            <video src={videoItem.video_url} type="video/mp4" width="320" height="240" controls>
                                Your browser does not support the video tag.
                            </video>

                        </div>
                        
                        {user.admin ?
                            <>
                            <p className='landing-copy'>
                                Submitted by: {videoItem.username}
                            </p>

                            {/* mapping over the reactions to create buttons to react to video */}
                            {reactions.map(reaction => {
                                console.log('>>>>>>>', reactions)
                                let reactionNum = reaction.id
                                if (reaction.counts != [])
                                    return (
                                        <>
                                        {reactionCounts.map(count => {
                                            console.log(count.reaction_id);
                                            console.log(reaction.id);
                                            if (count.reaction_id === reaction.id) {
                                                return (
                                                    <>
                                                        <Badge badgeContent={count.count} color="primary">
                                                        <button
                                                            className="reaction-buttons"
                                                            onClick={() => {
                                                                dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } }),
                                                                dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
                                                                setClicked(true)
                                                            }}
                                                        >{reaction.reaction}
                                                        </button>
                                                        </Badge>
                                                    </>
                                                )
                                            }
                                        })}
                                        </>
                                    )
                                if (reaction.counts === [])
                                return (
                                    <>
                                        <Badge badgeContent={0} color="primary" showZero>
                                        <button
                                            className="reaction-buttons"
                                            onClick={() => {
                                                dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } }),
                                                dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
                                                setClicked(true)
                                            }}
                                        >{reaction.reaction}
                                        </button>
                                        </Badge>
                                    </>
                                )
                            })}
                            {clicked &&
                                <div className='landing-copy'>Thanks for your vote!</div>
                            }
                            <br/>
                            <a 
                                className='btn_asLink'
                                href={`mailto:${videoItem.email}`}
                            >
                                Award Video
                            </a>
                            </>
                            :
                            <>
                            <p className='landing-copy'>
                                Submitted by: {videoItem.username}
                            </p>

                            {/* mapping over the reactions to create buttons to react to video */}
                            {reactions.map(reaction => {
                                let reactionNum = reaction.id
                                return (
                                    <>
                                    {reactionCounts.map(count => {
                                        if (count.reaction_id === reaction.id) {
                                            return (
                                                <>
                                                    <button
                                                        className="reaction-buttons"
                                                        onClick={() => {
                                                            dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } }),
                                                            dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
                                                            setClicked(true)
                                                        }}
                                                    >{reaction.reaction}
                                                    </button>
                                                </>
                                            )
                                        }
                                    })}
                                    </>
                                )
                            })}
                            {clicked &&
                                <div className='landing-copy'>Thanks for your vote!</div>
                            }
                            </>
                        } 
                    </center>
                </>
            )}
        </>
    )
}
export default VideoItem;



// {reactionItem && reactionItem.reaction_id === reaction.id ?
//     <>
//         <button
//             className="btn"
//             disabled
//             style={{ backgroundColor: 'pink' }}
//         >
//             {reaction.reaction}
//         </button>
//     </>
//     :
//         <button
//             className="btn"
//             onClick={() => {
//                 dispatch({ type: 'ADD_NEW_REACTION', payload: { reactionNum, id, videoId } }),
//                 dispatch({ type: 'FETCH_REACTION_ITEM', payload: { videoId } })
//                 setClicked(true)
//             }}
//         >{reaction.reaction}
//         </button>
// }