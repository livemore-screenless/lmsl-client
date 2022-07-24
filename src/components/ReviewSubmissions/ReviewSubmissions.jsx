import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewSubmissions() {
    const dispatch = useDispatch();
    const store = useSelector((store) => store);

    // this will fetch data on page load
    // need to get all videos with null approval
    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_VIDEOS' })
    }, [])

  return (
    <div>
      <h2>Review Submissions</h2>
    </div>
  );
}

export default ReviewSubmissions;