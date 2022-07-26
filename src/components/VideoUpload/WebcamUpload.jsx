import React, { useState } from "react";
import {useReactMediaRecorder} from "react-media-recorder";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useHistory } from "react-router-dom";

function RecordVideos({ stream }) {

  let videoPreviewRef = React.useRef();
  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

    if (!stream) {
    console.log("Sorry, try again! No stream available");
    return null;
    }
    return (
    //if stream has started, then render the video preview while recording
    <div>
      {stream && <video ref={videoPreviewRef} width={520} height={480} autoPlay />}
    </div>)
}



const WebcamUpload = () => {
  const onRecordStop = (blobURL, blob) => {
    console.log({ blob });
    const fileOfBlob = new File([blob], `video-upload.webm`);
    console.log({ fileOfBlob });

    setSelectedVideo(fileOfBlob)
  };

  const [selectedVideo, setSelectedVideo] = useState({})
  const { id } = useParams()
  const history = useHistory();
  

  //destructuring out from useReactMediaRecorder "hook" to use them
  const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } =
    useReactMediaRecorder({
      onStop: onRecordStop,
      video: true,
      //this asks you for permissions to use your camera
      askPermissionOnMount: true,
      //setting up for what videos record as
      blobOptions: { type: "video/webm" },
      mediaStreamConstraints: { audio: true, video: true },
    });

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedVideo);
    // formData.append('description', "awesome video"); and this would be req.body.description on server side if you wanted to add some description to something you're uploading
    //should be a saga
    try {
        axios.post(`/api/upload/${id}`,
        formData, 
        { "Content-Type": "multipart/form-data" },
        );
      } catch(error) {
        console.log(error)
      }
      history.push("/prompt-page")
      alert("All videos must be reviewed by Administrator.")
  }

  return (
    <>
      {/* clearBlobUrl keeps you from clicking start video and it would start recording a second one while you are watching the preview */}
      <div>
        {/* does a recorded video exists, if so, preview it. Otherwise record the video opponent */}
        {mediaBlobUrl ? <video src={mediaBlobUrl} controls autoPlay loop /> : <RecordVideos stream={previewStream} />}
      </div>
      {/* this is not showing up, why? */}
      {status === "recording" && 
      <div>🔴 Recording</div>
      }
      
      <button className='start-btn_asLink'
        onClick={() => {
        clearBlobUrl(); 
        startRecording();
        }} disabled={status === "recording"}>
        Start
      </button>
      <button className='stop-btn_asLink' onClick={stopRecording} disabled={status !== "recording"}>
        Stop
      </button>
      <button className='btn btn_sizeFull'onClick={handleUpload}>Submit for Approval</button>

    </>
  );
};

export default WebcamUpload;
