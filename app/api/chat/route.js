import { NextResponse } from 'next/server'; 

// langchain imports 
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from "langchain/schema";

export const dynamic = 'force-dynamic';

async function generateResponse(planet, question) { 
  const model = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0.5, maxOutputTokens: 2000, openAIApiKey: process.env.OPENAI_API_KEY});
  const sysPrompt = `You are ChatGPT, a large language model trained by OpenAI. You are currently working as a robot assistant. Your role includes:Providing detailed answers to a wide range of questions about the solar system, ranging from destinations between planets to detailed information about the planet of the user's choice.
  Suggest routes following user instructions.Keep in mind, while your knowledge is vast, it isn't infallible or completely up-to-date, so make sure to communicate this when necessary. Be polite, respectful.`
  const response = await model.call([new SystemMessage(sysPrompt), new HumanMessage(question)]); 
  const parsedResponse = response.content
  return parsedResponse; 
}

export async function POST(req) {  
    // getting the worksheet details from request // 
    const bodyJson = await req.json(); 
    const body = bodyJson.content; 
    const planet = body.planet; 
    const question = body.question; 
    const answer = await generateResponse(planet, question);

    return NextResponse.json({      
        answer: answer
    }); 
} 