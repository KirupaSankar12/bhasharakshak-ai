import edge_tts
import asyncio
import base64
import tempfile
import os
from gtts import gTTS
import io

async def generate_speech(text: str, lang: str) -> str:
    """
    Hybrid TTS: 
    1. Prefer Microsoft Edge TTS (High Quality Neural).
    2. Fallback to Google TTS (gTTS) for languages Edge misses (e.g., Punjabi).
    3. Use approximate fallbacks for others (e.g., Assamese -> Bengali).
    """
    try:
        # 1. Edge TTS Direct Configuration
        edge_voice_map = {
            "English": "en-IN-NeerjaNeural",
            "Hindi": "hi-IN-SwaraNeural",
            "Tamil": "ta-IN-PallaviNeural",
            "Telugu": "te-IN-MohanNeural",
            "Kannada": "kn-IN-GaganNeural",
            "Malayalam": "ml-IN-SobhanaNeural", 
            "Bengali": "bn-IN-BashkarNeural",
            "Gujarati": "gu-IN-DhwaniNeural",
            "Marathi": "mr-IN-ManoharNeural",
            "Urdu": "ur-IN-GulNeural",
            # Fallbacks using Edge Voices
            "Assamese": "bn-IN-BashkarNeural", # Bengali reads Assamese script (mostly)
            "Bodo": "hi-IN-SwaraNeural",       # Devanagari
            "Dogri": "hi-IN-SwaraNeural",      # Devanagari
            "Konkani": "mr-IN-ManoharNeural",  # Marathi script
            "Maithili": "hi-IN-SwaraNeural",   # Devanagari
            "Nepali": "ne-NP-HemkalaNeural",   # Specific Nepali voice available!
            "Sanskrit": "hi-IN-SwaraNeural",   # Devanagari
            "Sindhi": "ur-PK-UzmaNeural",      # Arabic script
            "Odia": "bn-IN-BashkarNeural"      # EXPERIMENTAL: Try Bengali for Odia.
        }

        # 2. Check if we should use gTTS instead
        # Punjabi is supported by gTTS ('pa') but not consistently found in Edge list
        if lang == "Punjabi":
            return await generate_gtts(text, 'pa')

        # 3. Use Edge TTS
        voice = edge_voice_map.get(lang)
        
        if voice:
            communicate = edge_tts.Communicate(text, voice)
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
            temp_file.close()
            await communicate.save(temp_file.name)
            
            with open(temp_file.name, "rb") as f:
                audio_bytes = f.read()
            os.unlink(temp_file.name)
            return base64.b64encode(audio_bytes).decode('utf-8')
        
        # 4. Fallback for unknowns
        print(f"TTS: Language {lang} not in Edge map, trying English fallback or gTTS.")
        return await generate_gtts(text, 'en')

    except Exception as e:
        print(f"Edge TTS Failed: {e}. Falling back to gTTS.")
        try:
            # Last resort fallback
            return await generate_gtts(text, 'en')
        except:
             return ""

async def generate_gtts(text: str, lang_code: str) -> str:
    # Wrap synchronous gTTS in thread if needed, or just run (it blocks but ok for now)
    try:
        tts = gTTS(text=text, lang=lang_code, slow=False)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        audio_bytes = fp.read()
        return base64.b64encode(audio_bytes).decode('utf-8')
    except Exception as e:
         print(f"gTTS Error: {e}")
         return ""
