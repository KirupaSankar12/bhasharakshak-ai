import speech_recognition as sr
import os

async def transcribe_audio(file_path: str, language: str = "English") -> str:
    """
    Real Speech-to-Text using Google Speech Recognition.
    Supports dynamic language selection.
    """
    recognizer = sr.Recognizer()
    
    # Map friendly names to Google BCP-47 codes
    # https://cloud.google.com/speech-to-text/docs/languages
    lang_map = {
        "English": "en-IN", 
        "Hindi": "hi-IN",
        "Tamil": "ta-IN",
        "Telugu": "te-IN",
        "Kannada": "kn-IN",
        "Malayalam": "ml-IN",
        "Bengali": "bn-IN",
        "Gujarati": "gu-IN",
        "Marathi": "mr-IN",
        "Punjabi": "pa-IN",
        "Urdu": "ur-IN",
        "Odia": "or-IN",
        "Assamese": "as-IN",
        "Bodo": "brx-IN",
        "Dogri": "doi-IN",
        "Kashmiri": "ks-IN",
        "Konkani": "kok-IN",
        "Maithili": "mai-IN",
        "Manipuri": "mni-IN",
        "Nepali": "ne-IN",
        "Sanskrit": "sa-IN",
        "Santali": "sat-IN", 
        "Sindhi": "sd-IN"
    }
    
    lang_code = lang_map.get(language, "en-IN")

    try:
        with sr.AudioFile(file_path) as source:
            # Adjust for ambient noise helps if volume is low
            # recognizer.adjust_for_ambient_noise(source) 
            audio_data = recognizer.record(source)
            
            # Recognize with specific language code
            text = recognizer.recognize_google(audio_data, language=lang_code)
            return text
            
    except sr.UnknownValueError:
        return "Audio was too unclear to transcribe."
        
    except sr.RequestError as e:
        # Connection failed (Firewall/No Internet)
        print(f"STT Connection Error: {e}")
        return "⚠️ Offline Mode: Internet unreachable. (Demo: 'Language preservation is important.')"
        
    except Exception as e:
        print(f"STT General Error: {str(e)}")
        return f"Error: {str(e)}"
