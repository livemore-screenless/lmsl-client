import React, { useEffect } from 'react';
import FileUpload from './FileUpload';
import WebcamUpload from './WebcamUpload';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function UserUploadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prompts = useSelector(store => store.promptsInfo.allPromptsList)

  useEffect(() => {
    dispatch({ type: 'FETCH_PROMPTS_LIST' })
},[])

  console.log('this is id', id);
  console.log('all rpompts are ', prompts)
  return (
    <center>
    <div>
      <div >
        {prompts.map(thePrompt => {
          if (thePrompt.id == id) {
            return ( <p className='my-video-title'>{thePrompt.question}</p>)
          }
        })}
      </div>

        <WebcamUpload />
        <br></br>
        <FileUpload />

    </div>
    </center>
  )
}

export default UserUploadPage