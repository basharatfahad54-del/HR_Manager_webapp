from openai import OpenAI
from ..core.config import settings

client = OpenAI(api_key=settings.openrouter_api_key, base_url="https://openrouter.ai/api/v1")

def chat_ai(message: str) -> str:
    try:
        response = client.chat.completions.create(
            model="anthropic/claude-3.5-sonnet",  # Or gpt-4o-mini
            messages=[{"role": "system", "content": "HR AI Assistant. Answer recruitment, performance queries."},
                      {"role": "user", "content": message}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"
