# AURA AI — Virtual Assistant 🤖

AURA AI is an AI-powered virtual assistant built with React and Vite. It provides an interactive interface where users can communicate with an AI assistant using voice input.

## ✨ Features

- 🎙️ Voice interaction using microphone input
- 🤖 AI-powered responses using the Google Gemini API
- 🔊 Voice assistant animations and visual feedback
- 🎨 Interactive and responsive user interface
- ⚡ Fast development and build process powered by Vite

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Build Tool:** Vite
- **Language:** JavaScript
- **AI Integration:** Google GenAI SDK
- **Icons:** React Icons
- **Styling:** CSS

## 📁 Project Structure

```text
AURA AI/
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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kanikakhurana18/AI-Virtual-Assistant.git
```

### 2. Navigate to the Project Folder

```bash
cd AI-Virtual-Assistant
cd "AURA AI"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API Key

Create a `.env` file inside the `AURA AI` folder and configure your Gemini API key using the environment variable expected by your application.

**Important:** Never commit your `.env` file or expose a private API key in public source code. For a publicly deployed frontend, use a secure backend to protect the API key.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🏗️ Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The generated production files will be available in the `dist/` directory.

## 👩‍💻 Author

**Kanika Khurana**

GitHub: [@Kanikakhurana18](https://github.com/Kanikakhurana18)

## 📄 License

This project is available for learning and portfolio purposes. Add a license file if you choose to distribute it under a specific open-source license.
