import os
import json
import boto3
import random
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class BedrockClient:
    def __init__(self):
        """Initialize the AWS Bedrock client with credentials from environment variables."""
        self.aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
        self.aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
        self.aws_region = os.getenv('AWS_REGION', 'us-east-1')
        # Use the specified agent IDs
        self.agent_id = "BSY3YKE00M"
        self.agent_alias_id = "SNAFJHANNX"
        
        # Check if we have AWS credentials
        self.has_credentials = (self.aws_access_key and self.aws_secret_key)
        
        if self.has_credentials:
            try:
                # Initialize Bedrock client
                # Create a session with the credentials
                session = boto3.Session(
                    aws_access_key_id=self.aws_access_key,
                    aws_secret_access_key=self.aws_secret_key,
                    region_name=self.aws_region
                )
                
                try:
                    # Try to create the bedrock-agent-runtime client from the session
                    self.bedrock_agent_runtime = session.client(service_name='bedrock-agent-runtime')
                    # Removed debug print statement
                except Exception as e:
                    print(f"bedrock-agent-runtime service not available: {str(e)}")
                    print("Trying to use bedrock-runtime instead...")
                    # Fall back to bedrock-runtime
                    self.bedrock_runtime = session.client(service_name='bedrock-runtime')
                    # Removed debug print statement
            except Exception as e:
                print(f"Error initializing Bedrock Agent client: {str(e)}")
                self.has_credentials = False
        else:
            print("AWS credentials not found in environment variables")
    
    def generate_response(self, prompt, max_tokens=1000, temperature=0.7):
        """
        Generate a response from the Bedrock agent.
        
        Args:
            prompt (str): The user's input prompt
            max_tokens (int): Maximum number of tokens to generate (not used for agent)
            temperature (float): Controls randomness in the response (not used for agent)
            
        Returns:
            str: The generated response text from the agent
        """
        # If we don't have credentials, use mock responses for testing
        if not self.has_credentials:
            return self.generate_mock_response(prompt)
            
        try:
            # Check if we have the agent runtime client
            if hasattr(self, 'bedrock_agent_runtime'):
                # Invoke the Bedrock agent
                # Generate a unique session ID using timestamp
                session_id = f"session-{int(time.time())}-{random.randint(1000, 9999)}"
                response = self.bedrock_agent_runtime.invoke_agent(
                    agentId=self.agent_id,
                    agentAliasId=self.agent_alias_id,
                    sessionId=session_id,
                    inputText=prompt,
                    enableTrace=False
                )
                
                # Parse the response
                response_text = ""
                for chunk in response.get('completion', []):
                    if 'chunk' in chunk:
                        try:
                            # Try to parse as JSON first
                            try:
                                chunk_data = json.loads(chunk['chunk']['bytes'])
                                if 'content' in chunk_data:
                                    response_text += chunk_data['content']
                            except json.JSONDecodeError:
                                # If not JSON, treat as plain text
                                raw_text = chunk['chunk']['bytes'].decode('utf-8')
                                response_text += raw_text
                        except Exception as e:
                            print(f"Error processing chunk: {e}")
                            print(f"Raw chunk data: {chunk['chunk']['bytes']}")
                
                if not response_text:
                    print("No content found in agent response")
                    # Check if there's any other data in the response
                    print(f"Response keys: {response.keys()}")
                    if 'completion' in response:
                        print(f"Completion type: {type(response['completion'])}")
                        print(f"Completion data: {response['completion']}")
                
                return response_text if response_text else "No response from agent."
            
            # If we have the bedrock runtime client instead, use that
            elif hasattr(self, 'bedrock_runtime'):
                print("Using Bedrock Runtime for text generation")
                # Use Claude model for text generation
                model_id = "anthropic.claude-v2"  # or another available model
                
                response = self.bedrock_runtime.invoke_model(
                    modelId=model_id,
                    contentType="application/json",
                    accept="application/json",
                    body=json.dumps({
                        "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                        "max_tokens_to_sample": max_tokens,
                        "temperature": temperature
                    })
                )
                
                # Parse the response
                response_body = json.loads(response['body'].read())
                return response_body.get('completion', "No response from model.")
            
            else:
                print("No Bedrock clients available")
                return self.generate_mock_response(prompt)
                
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            # Fall back to mock response if the call fails
            return self.generate_mock_response(prompt)
    
    def generate_mock_response(self, prompt):
        """
        Generate a mock response for testing when AWS credentials are not available
        or when the agent call fails.
        
        Args:
            prompt (str): The user's input prompt
            
        Returns:
            str: A mock response based on the prompt
        """
        # Add a small delay to simulate API call
        time.sleep(1)
        
        # Check for cryptocurrency mentions in the prompt
        crypto_responses = {
            'bitcoin': "Bitcoin is a decentralized digital currency created in 2009. It uses blockchain technology to secure transactions and control the creation of new units. Bitcoin has become the most valuable and widely-adopted cryptocurrency, often referred to as digital gold.",
            'ethereum': "Ethereum is a decentralized blockchain platform that enables smart contracts and decentralized applications (dApps). Unlike Bitcoin, Ethereum was designed to be programmable, allowing developers to build and deploy various applications on its network.",
            'cardano': "Cardano is a proof-of-stake blockchain platform that aims to enable smart contracts, decentralized applications, and multi-asset transactions. It was founded by Charles Hoskinson, a co-founder of Ethereum, and emphasizes a research-driven approach to design.",
            'solana': "Solana is a high-performance blockchain that focuses on fast transactions and high throughput. It uses a proof-of-history consensus combined with proof-of-stake, allowing it to process thousands of transactions per second with minimal fees.",
            'dogecoin': "Dogecoin started as a meme cryptocurrency in 2013, based on the popular 'Doge' Shiba Inu meme. Despite its humorous origins, it gained significant popularity and value, partly due to endorsements from figures like Elon Musk."
        }
        
        prompt_lower = prompt.lower()
        for crypto, response in crypto_responses.items():
            if crypto in prompt_lower:
                return response
        
        # General responses for other queries
        general_responses = [
            "Cryptocurrencies are digital or virtual currencies that use cryptography for security and operate on decentralized networks called blockchains.",
            "Blockchain technology is a distributed ledger that records all transactions across a network of computers, making it secure, transparent, and resistant to modification.",
            "Crypto trading involves buying and selling digital currencies on exchanges, with prices determined by market supply and demand.",
            "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of specific items like art, collectibles, or music on a blockchain.",
            "DeFi (Decentralized Finance) refers to financial applications built on blockchain technology that aim to recreate traditional financial systems without centralized intermediaries."
        ]
        
        # Return a random general response
        return random.choice(general_responses)

# Example usage
if __name__ == "__main__":
    client = BedrockClient()
    response = client.generate_response("What is Bitcoin?")
    print(response)
