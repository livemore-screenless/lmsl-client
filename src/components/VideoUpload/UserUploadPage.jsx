import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import WebcamUpload from './WebcamUpload';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function UserUploadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prompts = useSelector(store => store.promptsInfo.allPromptsList)
  const [webcam, setWebcam] = useState(false);
  const [upload, setUpload] = useState(false);

  
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
        <button
          className="add-prompts-btn"
          value={webcam}
          onClick={() => setWebcam(!webcam)}
        > 
        Record Now 
        </button>
        {webcam && 
          <WebcamUpload />
        }
        <p>-or-</p>
        <button
          className="add-prompts-btn"
          value={upload}
          onClick={() => setUpload(!upload)}
        > 
        Upload File 
        </button>
        {upload && 
          <FileUpload />
        }

    </div>
    </center>
  )
}

export default UserUploadPage