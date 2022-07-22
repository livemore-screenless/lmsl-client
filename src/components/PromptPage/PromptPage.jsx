import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PromptPage() {

    // need to get all prompts from store and map over them
    // to get prompts will need to dispatch from here to B to set store
    // Start with dummy data

    // dispatch to saga, saga to axios get, router to DB prompts, yield to set_state in store, 
    // grab store and map over here

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROMPTS' })
    }, [])

return(
<>
<h1>Video Response Prompts</h1>
</>
)
}
export default PromptPage;