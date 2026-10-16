import React, { useState } from 'react'
import { createContext } from 'react'
import { run } from '../gemini';

export const datacontext = createContext()
function UserContext({ children }) {
    let [speaking, setspeaking] = useState(false)
    let [prompt, setPrompt] = useState("listening...")
    let [respond, setRespond] = useState(false)


    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);

        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB";

        text_speak.onend = () => {
            setspeaking(false);
            setRespond(false);
        };

        text_speak.onerror = () => {
            setspeaking(false);
            setRespond(false);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(text_speak);
    }

    async function airesponse(prompt) {
        setRespond(true);
        setPrompt("Thinking...");

        try {
            let response = await run(prompt);

            let newResponse = response
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .replace(/google/gi, "Kanika Khurana");
            setPrompt(newResponse);
            speak(newResponse);
        } catch (error) {
            console.error("AI response error:", error);
            setPrompt("Sorry, I couldn't get an answer. Please try again.");
        }
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
            setRespond(true)
            setPrompt("Opening Instagram")
            setTimeout(() => {
                setspeaking(false)
            }, 5000)
        }
        else if (command.includes("date")) {
            let date = new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
            });
            setPrompt(date);
            setRespond(true);
            speak(date);

            setTimeout(() => {
                setspeaking(false);
                setRespond(false);
            }, 5000);
        }
        else if (command.includes("time")) {
            let time = new Date().toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });
            setPrompt(time);
            setRespond(true);
            speak(time);
            setTimeout(() => {
                setspeaking(false);
                setRespond(false);
            }, 5000);
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
