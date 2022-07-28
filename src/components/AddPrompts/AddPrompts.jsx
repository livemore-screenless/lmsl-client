import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";

function AddPrompts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [question, setQuestion] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch({
      type: "NEW_PROMPTS_LIST",
      payload: {
        question,
      },
    });

    setQuestion("");
    history.push("/prompt-page");
  };

  return (
    <>
    <center>
      <div className="landing-copy">What prompt would you like to add?</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          className='input-box'
        />
        <input type="submit" value="Add Prompt" className="btn" />
      </form>
      </center>
    </>
  );
}

export default AddPrompts;
