export interface Message {
    role: 'user' | 'assistant';
    content: string;
  }
  
  export async function generateChatCompletion(messages: Message[], maxTokens: number = 1000) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          max_tokens: maxTokens,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating chat completion:', error);
      throw error;
    }
  }
  