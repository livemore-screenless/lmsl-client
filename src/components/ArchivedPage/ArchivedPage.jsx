import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PromptEdit from "../PromptEdit/PromptEdit";
import { useParams } from "react-router-dom";

function ArchivedPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const prompts = useSelector((store) => store.promptsInfo.allPromptsList);

  useEffect(() => {
    dispatch({ type: "FETCH_PROMPTS_LIST" });
    console.log("HELLLOOO", prompts);
  }, []);
  console.log("the id for the prompt is", id);

  return (
    <>
      {prompts.map((prompt) => {
        if (prompt.id == id) {
          return <PromptEdit key={prompt.id} prompt={prompt} />
       
        }
      })}
    </>
  );
}
export default ArchivedPage;
