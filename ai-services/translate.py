from deep_translator import GoogleTranslator

def translate_text(text: str, target_lang: str) -> str:
    """
    Real Machine Translation using deep-translator (Google Translate).
    """
    try:
        # Map frontend language names to codes for better compatibility
        # Based on deep-translator/Google Translate supported list
        lang_map = {
            "Hindi": "hi", "Tamil": "ta", "Telugu": "te", "Kannada": "kn",
            "Malayalam": "ml", "Bengali": "bn", "Gujarati": "gu", "Marathi": "mr",
            "Punjabi": "pa", "Urdu": "ur", "English": "en", "Odia": "or",
            "Assamese": "as", "Nepali": "ne", "Sindhi": "sd", "Sanskrit": "sa",
            # Corrected/Specific Codes
            "Konkani": "gom", 
            "Manipuri": "mni-Mtei", # Meiteilon
            "Maithili": "mai",
            "Dogri": "doi",
            # Fallbacks for languages not natively supported by standard Google Translate API via deep-translator
            # (Note: Google might support them in web interface but maybe not in the API version used)
            "Kashmiri": "ur", # Fallback to Urdu (closest script/grammar)
            "Bodo": "hi",     # Fallback to Hindi (Devanagari script)
            "Santali": "bn",  # Fallback to Bengali (often uses Bengali script or Ol Chiki, generic fallback)
        }
        
        # Default to target_lang lowercase if not found, but check if key exists in map first
        target_code = lang_map.get(target_lang)
        
        if not target_code:
            # If not in map, try to see if the raw input is a valid code or just fallback to English to be safe
            # The list provided by user shows standard codes. 
            target_code = "en"
        
        translator = GoogleTranslator(source='auto', target=target_code)
        translated = translator.translate(text)
        return translated
    except Exception as e:
        print(f"Translation Error: {e}")
        return f"Error: Could not translate. ({str(e)})"
