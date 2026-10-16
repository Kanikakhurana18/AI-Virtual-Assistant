import React, { useState } from 'react'
import { createContext } from 'react'
import { run } from '../gemini';

export const datacontext = createContext()
function UserContext({ children }) {
    let [speaking, setspeaking] = useState(false)
    let [prompt, setPrompt] = useState("listening...")
    let [respond, setRespond] = useState(false)

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB"
        window.speechSynthesis.speak(text_speak)
    }

    async function airesponse(prompt) {
        let response = await run(prompt);
        let newResponse = response.split("**") && response.split("*") && response.replace("google", "Kanika Khurana") && response.replace("Google", "Kanika Khurana")
        setPrompt(newResponse)
        speak(newResponse)
        setRespond(true)
        setTimeout(() => {
            setspeaking(false)
        }, 5000)
    }

    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
    let recognition = speechRecognition ? new speechRecognition() : null;
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank")
            speak("Opening Youtube")
            setRespond(true)
            setPrompt("Opening Youtube")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank")
            speak("Opening Google")
            setRespond(true)
            setPrompt("Opening Google")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com/", "_blank")
            speak("Opening Instagram")
            setPrompt("Opening Instagram")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined,
                { hour: "numeric", minute: "numeric" })
            speak(time)
            setRespond(true)
            setPrompt(time)
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else if (command.includes("date")) {
            let time = new Date().toLocaleString(undefined,
                { day: "numeric", month: "short" })
            speak(date)
            setRespond(true)
            setPrompt(date)
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else {
            airesponse(command)
        }
    }


    let value = {
        recognition,
        speaking,
        setspeaking,
        prompt,
        setPrompt,
        respond,
        setRespond
    }
    return (
        <div className='response'>
            <datacontext.Provider value={value}>
                {children}
            </datacontext.Provider>
        </div>
    )
}

export default UserContext
