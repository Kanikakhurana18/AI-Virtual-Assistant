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
            setspeaking(false);
            setRespond(false);
        }
    }



    async function getWeather(city) {
        try {
            setPrompt("Checking weather...");
            const geo = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );

            const geoData = await geo.json();
            const location = geoData.results?.[0];
            if (!location) {
                setPrompt("City not found");
                speak("Sorry, city not found.");
                return;
            }

            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature&timezone=auto`
            );

            const data = await res.json();
            const message = `The temperature in ${location.name} is ${data.current.temperature_2m} degrees Celsius. It feels like ${data.current.apparent_temperature} degrees.`;

            setPrompt(message);
            setRespond(true);
            speak(message);

        } catch (error) {
            console.error("Weather error:", error);
            setPrompt("Weather could not be loaded.");
            speak("Sorry, weather could not be loaded.");
        }
    }


    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = speechRecognition ? new speechRecognition() : null;
    if (recognition) {
        recognition.onresult = (e) => {
            let currentIndex = e.resultIndex
            let transcript = e.results[currentIndex][0].transcript
            setPrompt(transcript)
            takeCommand(transcript.toLowerCase())
        }
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

        else if (
            command.includes("weather") ||
            command.includes("mausam") ||
            command.includes("temperature")
        ) {

            const city = command
                .replace(/'s\b/gi, "")
                .replace(/\b(today|tomorrow|weather|mausam|temperature|forecast|in|of|please|what|is|the|current|batao|bata|hai|ka|ki|aaj|kal|mein|me|kya|kaisa|kaisi|bataiye)\b/gi, "")
                .replace(/[?.!,']/g, "")
                .replace(/\s+/g, " ")
                .trim();

            if (city) {
                getWeather(city);
            } else {
                setPrompt("Please say a city name.");
                speak("Please tell me the city name.");
            }

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
