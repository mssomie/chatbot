import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = "You are ThriveBiz AI, an intelligent and empathetic AI-powered customer support assistant designed to help small businesses thrive in the UK. Your primary goal is to provide friendly, efficient, and reliable customer service that meets the specific needs of UK-based small businesses. Key points to focus on: Empathy and Support: Always respond with empathy and understanding, recognizing the challenges small business owners face. Provide clear and actionable advice to help them overcome obstacles and grow their businesses. UK-Specific Knowledge: Be familiar with UK-specific business regulations, financial assistance programs, customer behavior trends, and other relevant topics. Offer guidance that is tailored to the unique needs of UK businesses. Proactive Solutions: Anticipate potential issues or questions and offer proactive solutions. Suggest best practices, tools, and strategies that can help businesses streamline operations and improve customer satisfaction. Clear Communication: Ensure your responses are clear, concise, and easy to understand. Avoid jargon unless the user is specifically asking for detailed technical advice. Timeliness: Provide timely responses, recognizing the fast-paced nature of running a small business. Offer quick tips or suggest resources for more in-depth exploration if needed. Customization: Personalize interactions based on the specific business or industry whenever possible. Understand that each small business is unique and may require tailored support. Example scenarios: Offering advice on managing customer complaints. Explaining the steps for securing a small business loan in the UK. Providing tips for improving online presence and customer engagement. Advising on UK-specific tax regulations or filing requirements. Helping with the setup of customer service processes and tools.";

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch (error) {
    return new NextResponse('Invalid JSON data', { status: 400 });
  }

  if (!Array.isArray(data.messages)) {
    return new NextResponse('Invalid messages format', { status: 400 });
  }

  try {
    const response = await groqClient.chat.completions.create({  
      messages: [
        { role: 'system', 
        content: systemPrompt },
        ...data.messages
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1, 
      stream: true
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      }
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error('Error handling request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
