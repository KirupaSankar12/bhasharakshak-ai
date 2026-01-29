# BhashaRakshak AI 🇮🇳
### *Preserving India's Linguistic Heritage using AI*

BhashaRakshak is a full-stack AI platform designed to digitize, preserve, and empower indigenous Indian languages. It enables users to contribute voice datasets, translate content using advanced AI, and access educational resources.

---

## 🚀 Tech Stack & Dependencies

The project is built using a modern microservices architecture. Below is a detailed breakdown of the dependencies and why they are required.

### 1. Frontend (User Interface)
**Folder:** `frontend/reactapp`
**Framework:** React + Vite

| Dependency | Command | Why is it needed? |
|------------|---------|-------------------|
| **React** | `npm install react` | The core library for building the dynamic user interface. |
| **Vite** | `npm create vite@latest` | Next-generation frontend tooling for extremely fast build times. |
| **TailwindCSS** | `npm install tailwindcss` | A utility-first CSS framework for creating the premium, responsive design. |
| **Framer Motion** | `npm install framer-motion` | Powers the smooth animations and "Wow Factor" transitions. |
| **Lucide React** | `npm install lucide-react` | Provides the modern, clean icon set used throughout the app. |
| **Axios** | `npm install axios` | Handles HTTP requests to the Backend and AI services. |

### 2. Backend (API & Logic)
**Folder:** `backend/springapp`
**Framework:** JAVA Spring Boot 3

| Dependency | Type | Why is it needed? |
|------------|------|-------------------|
| **Spring Web** | Maven | Provides the REST API structure (`@RestController`) to handle frontend requests. |
| **Spring Data MongoDB** | Maven | Enables interaction with the MongoDB Cloud database to store user profiles and audio metadata. |
| **Spring Security** | Maven | Manages authentication, authorization, and CORS policies to secure the app. |
| **JJWT** | Maven | Generates and validates JSON Web Tokens (JWT) for secure user login. |

### 3. AI Services (Intelligence Layer)
**Folder:** `ai-services`
**Language:** Python 3.9+

To install all Python dependencies, run:
```bash
pip install -r ai-services/requirements.txt
```

| Dependency | Why is it needed? |
|------------|-------------------|
| **FastAPI** (`fastapi`) | A high-performance web framework to expose AI features as API endpoints. |
| **Uvicorn** (`uvicorn`) | An ASGI web server implementation to run the FastAPI application. |
| **Edge-TTS** (`edge-tts`) | **Critical:** Provides high-quality, natural-sounding neural speech synthesis for Indian languages. |
| **gTTS** (`gTTS`) | Fallback text-to-speech for languages not covered by Edge-TTS (e.g., Punjabi). |
| **Deep Translator** (`deep-translator`) | Handles text translation between multiple Indian languages and English. |
| **SpeechRecognition** | Converts uploaded audio files into text (STT) for verification. |
| **Python-Multipart** | Required by FastAPI to handle file uploads (audio recordings). |
| **Requests** (`requests`) | Used for calling external APIs if needed. |

> **Note:** `PyAudio` is **not** required for the server as it processes uploaded files, not live microphone input. This ensures smoother installation on all devices.

---

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed on your laptop:

1.  **Java JDK 17+**: Required for the Backend. [Download Here](https://www.oracle.com/java/technologies/downloads/)
2.  **Node.js (v18+)**: Required for the Frontend. [Download Here](https://nodejs.org/en/)
3.  **Python (v3.9+)**: Required for AI Services. [Download Here](https://www.python.org/downloads/)
4.  **Maven**: Checked automatically by the wrapper (`mvnw`), but good to have.

---

## ⚡ Quick Start (One-Click)

We provided a script to set up and run everything automatically.

1.  **Clone the Repository**:
    ```bash
    git clone <YOUR_REPO_URL>
    cd bhashrakshak-ai
    ```

2.  **Run the Setup Script (Windows)**:
    - Double-click `setup_and_run.bat`
    - **OR** run via terminal:
      ```cmd
      setup_and_run.bat
      ```

   *This script will install all dependencies (npm, pip, maven) and start all 3 servers in parallel.*

---

## 📦 Manual Installation & Run

If you prefer running services manually, open **3 separate terminals**:

### Terminal 1: AI Service (Python)
```bash
cd ai-services
pip install -r requirements.txt
python main.py
```
*Runs on: http://localhost:8000*

### Terminal 2: Backend (Java)
```bash
cd backend/springapp
# Windows
.\mvnw clean package -DskipTests
java -jar target/bhasharakshak-0.0.1-SNAPSHOT.jar
```
*Runs on: http://localhost:8080*

### Terminal 3: Frontend (React)
```bash
cd frontend/reactapp
npm install
npm run dev
```
*Runs on: http://localhost:5173*

---

## 🧪 Testing the Application

1.  Open **http://localhost:5173** in your browser.
2.  **Home Page**: Check the "Donate Voice" section.
3.  **Contribute**: Allow microphone permissions and try recording a phrase.
4.  **Translate**: Enter text to see the AI translation and hear the TTS output.

---

## 📂 Project Structure

```
bhasharakshak-ai/
├── ai-services/       # Python FastAPI (STT, TTS, Translation)
├── backend/           # Java Spring Boot (Auth, DB, Logic)
├── frontend/          # React + Vite (User Interface)
└── setup_and_run.bat  # Automation Script
```
