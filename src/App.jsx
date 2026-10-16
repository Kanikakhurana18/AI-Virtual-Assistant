import React from 'react'
import "./App.css"
import ai from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { useContext } from 'react';
import { datacontext } from "./context/UserContext.jsx";
import speakimg from "./assets/speak.gif"
import aivoice from "./assets/aiVoice.gif"

function App() {
  let {recognition,speaking,setspeaking, prompt, respond,setPrompt,setRespond} =useContext(datacontext)
  
  return (
    <div className='main'>
      <img src={ai} alt="AURA" id='aura'/>
      <span>I'm AURA, your Advanced Virtual Assistant</span>
      {!speaking? 
      <button onClick={() => {
        setPrompt("listening...")
        setspeaking(true)
        setRespond(false)
        recognition.start()}}>
        Click Here <CiMicrophoneOn />
      </button> 
      :
      <div className='response'>
        {!respond ? <img src={speakimg} alt="" id='speak' />
          :
         <img src={aivoice} alt="" id='aivoice' />
        }
        
        <p>{prompt}</p>
      </div>
      }
    </div>
  )
}

export default App
