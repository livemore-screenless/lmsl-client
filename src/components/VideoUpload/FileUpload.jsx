import React, { useState } from 'react';
import axios from 'axios'



const FileUpload = () => {
    //store it locally in state before uploading it to aws
  const [selectedFile, setSelectedFile] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


    return (
        <div>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
        </div>
    )
  }
  
export default FileUpload;