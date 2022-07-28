// import React from "react";
// import {useReactMediaRecorder} from "react-media-recorder";
// import { useHistory } from "react-router-dom";

// function RecordVideos({ stream }) {
//   let videoPreviewRef = React.useRef();

//   React.useEffect(() => {
//     if (videoPreviewRef.current && stream) {
//       videoPreviewRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   if (!stream) {
//     console.log("sorry try again no stream Available");
//     return null;
//   }

//   return <video ref={videoPreviewRef} width={520} height={480} autoPlay />;
// }

// const WebcamUpload = () => {
//   const onRecordStop = (blobURL, blob) => {
//     console.log({ blob });
//     var fileOfBlob = new File([blob], `Recorded-${Math.random() * 10}-version`);
//     console.log({ fileOfBlob });
//   };

//   // status, startrecording, stoprecording, mediabloburl & Previewstream
//   //need to be wired in order to receive the needed data using react props

//   const { status, startRecording, stopRecording, mediaBlobUrl, previewStream } =
//     useReactMediaRecorder({
//       onStop: onRecordStop,
//       video: true,
//       askPermissionOnMount: true,
//       blobOptions: { type: "video/webm" },
//       mediaStreamConstraints: { audio: true, video: true },
//     });

//   // console.log({ previewStream });
//   console.log(">>>>>>>>", previewStream);

//   const stopCurrentRecording = () => {
//     stopRecording();
//   };

//   return (
//     <>
//       <h3>Happy Recording!</h3>
//       <p>{previewStream && <RecordVideos stream={previewStream} />}</p>
//       <button onClick={startRecording} disabled={status === "recording"}>
//         Start
//       </button>
//       <button onClick={stopCurrentRecording} disabled={status !== "recording"}>
//         Stop
//       </button>
//       <h3>Preview Recording</h3>
//       <div>
//         {mediaBlobUrl && <video src={mediaBlobUrl} controls autoPlay loop />}
//       </div>
//     </>
//   );
// };

// export default WebcamUpload;
