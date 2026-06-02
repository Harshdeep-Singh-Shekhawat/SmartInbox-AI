// @ts-nocheck
import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Force the route to be dynamic and run on the edge or serverless
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { subject, sender, snippet, content } = await req.json();

    if (!subject || !sender) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Pre-flight check for the critical rules to save AI tokens and enforce strictly
    const textToCheck = `${subject} ${snippet} ${content || ''}`.toLowerCase();
    const isCritical = textToCheck.includes('unstop') || 
                       textToCheck.includes('job') || 
                       textToCheck.includes('update') || 
                       textToCheck.includes('action');

    try {
      // In a fully wired application with an OpenAI key, this code will run:
      const result = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          isImportant: z.boolean().describe('Whether the email is important or noise based on urgency, action items, or direct personal/professional communication.'),
          category: z.enum(['Urgent', 'Action Required', 'FYI']).describe('The category of the email if important.'),
          summary: z.array(z.string()).describe('A 2-3 bullet point summary highlighting the core context, key action items, and any deadlines.')
        }),
        prompt: `Analyze the following email metadata and categorize it.\n\nSender: ${sender}\nSubject: ${subject}\nContent: ${content ? content.substring(0, 1500) : snippet}\n\nDetermine if it's important and summarize if so.\n\nCRITICAL RULE: If the subject or content contains the exact keywords "unstop", "job", "update", or "action" (case-insensitive), you MUST set isImportant to true.`
      });
      
      // Override the AI if it failed to follow the critical rule
      if (isCritical) {
        result.object.isImportant = true;
        if (result.object.category === 'FYI') {
          result.object.category = 'Action Required';
        }
      }
      
      return NextResponse.json(result.object);
    } catch (apiError) {
      // If AI fails (e.g. no API key, rate limit) but the email is critical, fallback manually!
      if (isCritical) {
        return NextResponse.json({
          isImportant: true,
          category: 'Action Required',
          summary: [
            'This email matched your critical keyword rules ("unstop", "job", "update", or "action").',
            'AI summarization is currently unavailable.',
            'Please review the email manually.'
          ]
        });
      }
      throw apiError;
    }

  } catch (error) {
    console.error('Error analyzing email:', error);
    return NextResponse.json({ error: 'Failed to analyze email' }, { status: 500 });
  }
}
