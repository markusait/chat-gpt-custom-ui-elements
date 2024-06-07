import os
import json
from django.conf import settings
from openai import OpenAI


client = OpenAI(
    api_key=settings.OPENAI_API_KEY,
)
def format_response(chat_response):
    try:
        # Try to parse the response as JSON
        formatted_response = json.loads(chat_response.choices[0].message.content)
    except json.JSONDecodeError:
        # If the response can't be parsed as JSON, return it as a plain text message
        formatted_response = {
            "type": "text",
            "content": chat_response.choices[0].message.content
        }
    return formatted_response

def chat_completion(message):
    chat_response = client.chat.completions.create(
      model="gpt-4",
      temperature=0.1,  
                # TODO allow multiple choice
                # {
                #     "type": "element-multi-select",
                #     "content": "Is your runny nose constant or come-and-go?", 
                #     "content": ["constant", "come-and-go"]
                # }
      messages=[
            {"role": "system", "content": """
                You are a virtual doctor tasked with diagnosing diseases based on patient inputs.
                You interact with the patient using a customized interface and can send MUI React
                components (https://mui.com/) for easier data entry when it makes sense. For example,
                you can send a select or multi select element with predefined responses
                Use these components to make the interaction more efficient and user-friendly. 
                Your responses should follow this format:
                For plain text:
                    {
                        "type": "text",
                        "content": "whatever content it returns"
                    }
                For custom elements:
                {
                    "type": "element-select",
                    "content": "How would you describe your current cold symptoms?", 
                    "options": ["getting better", "staying the same", "getting worse"]
                }
                Only ever return one json element at a time.
             """},
            {"role": "user", "content": message}
         ]
    )
    return format_response(chat_response) 