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

        <div>
            <Link className="sub-navLink" to="/prompt-page">
              Back
            </Link>
        <center>

            { allVideosList && allVideosList[0] &&
                <h2 className='page-subheadings'>{allVideosList[0].question}</h2>
            }
            {/* Below is mapping over all the video URLs from the DB */}
            <ul>
                {allVideosList.map(video => {
                    return (
                        <>
                            <br/>
                            <li key={video.id}
                                onClick={(evt) => { history.push(`/prompt-videos/${id}/${video.id}`) }}
                            >
                                <video src={video.video_url} type="video/youtube" width="428" height="321" controls>
                                    {/* Below is dummy data for src, need to be updated after urls in db exist */}
                                    Your browser does not support the video tag.
                                </video>
                                <p>Submitted by: {video.username}</p>
                            </li>
                        </>

                    )
                })}
            </ul>
                <button 
                    className='btn'
                    onClick={(evt) => { history.push(`/user-upload/${id}`) }}
                >
                    Contribute
                </button>
        </center>
        </div>
    )
}
export default PromptVideos;