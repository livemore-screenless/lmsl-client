import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function MyVideos() {
  const dispatch = useDispatch();
  const history = useHistory();

  // this will fetch data on page load
  // need to get all data from video-responses table
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_VIDEOS' })
  }, [])

  return (
    <div>
      <h1>My Videos</h1>

      for each video 
       if video.user.id === user.id
        show video.prompt_id 
              video.video_url
        

      for each video 
        if video.true = approved tag
        if video.false = deny tag
        if video.null = pending tag
        if video.default = pending tag
      
    </div>
  );
}

export default MyVideos;