import { NextResponse } from 'next/server'; 

// langchain imports 
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const dynamic = 'force-dynamic';

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME);
const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);

const instructionsGuides = {
  mars: "you are now a Martinus, an alien from Mars who is very smart and knows a lot of things because during the expedition of Earth people you always communicated with them and became educated. you have to answer questions only about Mars, and you don't answer about other planets and topics" ,
  venus: "You are now Venusus, an alien from the planet Venus and you are very beautiful because your planet was named after the goddess of beauty and love. you have to answer questions only about Venus, and you don't answer about other planets and topics.",
  saturn: "You are now Saturney, an alien from Saturn which flies due to density of Saturn and You only wear warm clothes because it's very cold on Saturn. you have to answer questions only about Saturn and its moons, and under no circumstances you answer about other planets and topics"
}

async function search_planet_info(question) {
  // Search for similar questions in the vector store.
  const searchResults = await vectorStore.similaritySearch(question, 2);
  return searchResults.map(doc => doc.pageContent); 
}
async function generateResponse(planet, question) { 
  const prompt = new PromptTemplate({
    template:
      `Given a question about ${planet}. You must use useful resources below and follow the instructions. \n{format_instructions}\n{question}\n{resources}`,
    inputVariables: ["question", "resources"],
    partialVariables: { format_instructions: instructionsGuides[planet] },
  }); 

  const resources = await search_planet_info(`${question}. About ${planet}`); 
  const input = await prompt.format({
    question: `Question: ${question}`,
    resources: `Helpful resources: ${resources}`
  }); 
  const model = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0, maxOutputTokens: 4000, openAIApiKey: process.env.OPENAI_API_KEY});
  const response = await model.call([new SystemMessage(input)]); 
  const parsedResponse = response.content; 
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