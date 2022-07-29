import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PromptEdit from "../PromptEdit/PromptEdit";

function ArchivedPage (){
const dispatch = useDispatch();
  const history = useHistory();
  const prompts = useSelector((store) => store.promptsInfo.allPromptsList);


  useEffect(() => {
    dispatch({ type: "FETCH_PROMPTS_LIST" });
    console.log("HELLLOOO", prompts);
  }, 
  []);


    return(
        <>
        {prompts.map((prompt)=>{
            return <PromptEdit key={prompt.id} prompt={prompt} />
        })}
        </>
    )
}
export default ArchivedPage;