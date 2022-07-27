import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    //store it locally in state before uploading it to aws
  const [selectedFile, setSelectedFile] = useState({})


  const handleSubmit = async (event) => {
    event.preventDefault();
    //zFormData constructors making a new form data object
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });


      //server side you need the rec.user.id
      console.log(response);
      // dispatch({
      //   type: "ADD_FILE_TO_DB",
      //   payload: {
      //     url: response.data.Location
      //   }
      // })
    } catch(error) {
      console.log(error)

    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <input type="submit" value="Upload File" />
      </form>
    </div>
  );
};
  
export default FileUpload;
