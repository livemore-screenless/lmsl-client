import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useHistory} from 'react-router-dom'


const FileUpload = () => {
    //store it locally in state before uploading it to aws
  const [selectedFile, setSelectedFile] = useState({})
  const { id } = useParams()
  const history = useHistory();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    //zFormData constructors making a new form data object
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log('selectedFile', selectedFile)
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
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="btnOutlined" type="file" onChange={handleFileSelect} />
        <input className="btn" type="submit" value="Upload File" />
      </form>
    </div>
  );
};
  
export default FileUpload;

