from openai import OpenAI

client = OpenAI(
    # api_key=os.environ.get("OPENAI_API_KEY"),
    api_key="sk-proj-82c3eXB5ZqEvMOpOxoI0T3BlbkFJ0miE9F5iGMlxMDdlXeMm"
)


def chat_completion(message):
    chat_response = client.chat.completions.create(
      model="gpt-4",
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
                    "type": "element-multi-select",
                    "content": "Is your runny nose constant or come-and-go?", 
                    "content": ["constant", "come-and-go"]
                }
                {
                    "type": "element-select",
                    "content": "How would you describe your current cold symptoms?", 
                    "options": ["getting better", "staying the same", "getting worse"]
                }
            
             """},
            {"role": "user", "content": message}
        ]
    )
    return chat_response.choices[0].message.content