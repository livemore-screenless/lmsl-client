import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import React from 'react'

function PromptArchive(){ 
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const prompts = useSelector((store) => store.promptsInfo.archivePromptReducer)

  useEffect(() => {
    dispatch({
        //upon page load, fetch the merch from /:id you're on
        //payload is the id of what prompt you're clicking
        type: "FETCH_PROMPT_TO_ARCHIVE",
        payload: { id: params.id },
    })
    //params.id allows you to change the id at the top to move to other prompts
  },[params.id])

  function handleSubmit(event) {
    //using forms needs to prevent page from refreshing
    event.preventDefault();
    dispatch({
        type: "SAVE_PROMPT_ARCHIVE",
        payload: prompts,
    })
    //needs to history.push back to prompts page after saving
  }

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <div>Edit the Prompts</div>
          <label htmlFor="promptOne">
            Prompt One:
              <input
                type="text"
                name="Prompt One"
                value={prompts.question}
                onChange={(event) => 
                  dispatch({
                    type:"UPDATE YADDAYADDAA",
                    payload: { question: event.target.value},
                  })
              }
          </label>
      </form> */}
    </div>
  )
} 

export default PromptArchive