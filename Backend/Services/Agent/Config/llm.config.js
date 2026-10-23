import { ChatGroq } from '@langchain/groq';
import { ChatOpenAI } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';

dotenv.config();

export const getLLM = (agent) => {
  switch (agent.toLowerCase()) {
    case 'chat':
      return new ChatGroq({
        model: 'openai/gpt-oss-120b',
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0.7,
      });

    case 'coding-agent':
      return new ChatOpenAI({
        model: 'openrouter/free',
        apiKey: process.env.OPENROUTER_API_KEY,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
        },
        temperature: 0.2,
      });

    case 'pdf-agent':
      return new ChatOpenAI({
        model: 'gpt-4.1-mini',
        apiKey: process.env.OPENAI_API_KEY,
        temperature: 0.3,
      });

    case 'ppt-agent':
      return new ChatGoogleGenerativeAI({
        model: 'gemini-2.5-flash',
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.5,
      });

    case 'search':
    case 'search-agent':
      return new ChatGroq({
        model: 'openai/gpt-oss-120b',
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0.2,
      });

    default:
      return new ChatGroq({
        model: 'llama-3.3-70b-versatile',
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0.7,
      });
  }
};
