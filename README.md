# AURA AI — Virtual Assistant 🤖

AURA AI is an AI-powered virtual assistant built using React.js and Vite. It provides an interactive interface for voice-based interaction and AI-generated responses powered by the Google Gemini API.

## ✨ Features

- 🎙️ Voice interaction using microphone input
- 🤖 AI-generated responses using the Google Gemini API
- 🔊 Speech synthesis and voice assistant animations
- 🎨 Interactive user interface with visual feedback
- ⚡ Fast development and optimized production builds using Vite

## 🌐 Live Demo

**Live Website:** https://ai-virtual-assistant-nine.vercel.app/

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Language:** JavaScript
- **AI Integration:** Google GenAI SDK
- **Icons:** React Icons
- **Styling:** CSS
- **Deployment:** Vercel
- **Version Control:** Git and GitHub

## 📁 Project Structure

```text
AI-Virtual-Assistant/
├── public/
├── src/
│   ├── assets/
│   ├── context/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── gemini.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

*Note: The structure above is illustrative. Your actual folders and files may differ.*

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kanikakhurana18/AI-Virtual-Assistant.git
```

### 2. Navigate to the Project Directory

```bash
cd AI-Virtual-Assistant
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the Gemini API Key

Create a `.env` file in the project root directory and add:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Replace `your_gemini_api_key` with your own API key.

**Security:** Never commit your `.env` file to GitHub. Variables prefixed with `VITE_` can be exposed in client-side code. For production use, route Gemini API requests through a backend to protect your API key.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🏗️ Build for Production

Run the following command to create an optimized production build:

```bash
npm run build
```

The generated files will be available in the `dist/` directory.

## 👩‍💻 Author

**Kanika Khurana**

- **GitHub:** [Kanikakhurana18](https://github.com/Kanikakhurana18)

## 📄 License

This project is intended for learning and portfolio purposes. No open-source license has been specified yet.