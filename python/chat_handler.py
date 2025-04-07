import sys
import json
import os
from dotenv import load_dotenv

# Add the parent directory to the path so we can import the bedrock_client
sys.path.append('.')
from bedrock_client import BedrockClient

# Load environment variables
load_dotenv('./.env')

# Initialize Bedrock client
bedrock_client = BedrockClient()

def handle_chat_request(message):
    """
    Handle chat request from the frontend
    
    Args:
        message: The user's message
        
    Returns:
        str: Response generated from AWS Bedrock
    """
    try:
        if not message:
            return "I didn't receive a message. Please try again."
        
        # Generate response using AWS Bedrock
        response = bedrock_client.generate_response(message)
        
        return response
    except Exception as e:
        print(f"Error handling chat request: {str(e)}")
        return f"Sorry, I encountered an error: {str(e)}"

# For direct testing
if __name__ == "__main__":
    if len(sys.argv) > 1:
        message = sys.argv[1]
        print(handle_chat_request(message))
    else:
        print("No message provided")
