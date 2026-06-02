import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { google } from 'googleapis';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

export async function GET() {
  // In a real application, you would get the session and access token here:
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) return new NextResponse('Unauthorized', { status: 401 });

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  
  const listResponse = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 20, // Increased to 20 emails as requested
    q: 'in:inbox'
  });
  
  const messages = listResponse.data.messages || [];
  
    const fullEmails = await Promise.all(
    messages.map(async (msg) => {
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id as string,
        format: 'full' // Fetch the full email to read all contents
      });
      
      const payload = detail.data.payload;
      const headers = payload?.headers || [];
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const sender = headers.find(h => h.name === 'From')?.value || 'Unknown Sender';
      const date = headers.find(h => h.name === 'Date')?.value || new Date().toISOString();
      
      // Helper to extract text body from multipart emails
      function getBodyText(part: any): string {
        let text = '';
        if (part.mimeType === 'text/plain' && part.body?.data) {
          const base64 = part.body.data.replace(/-/g, '+').replace(/_/g, '/');
          text += Buffer.from(base64, 'base64').toString('utf-8');
        } else if (part.parts) {
          for (const p of part.parts) {
            text += getBodyText(p);
          }
        } else if (part.body?.data) {
          // Fallback for non-multipart emails
          const base64 = part.body.data.replace(/-/g, '+').replace(/_/g, '/');
          text += Buffer.from(base64, 'base64').toString('utf-8');
        }
        return text;
      }
      
      let fullContent = getBodyText(payload).substring(0, 3000); // Limit to 3000 chars to avoid token limits
      
      return {
        id: msg.id,
        subject,
        sender,
        snippet: detail.data.snippet,
        fullContent, // The entire text body!
        date
      };
    })
  );
  
  return NextResponse.json({
    status: 'success',
    data: fullEmails
  });
  
  /*
  // Return mock data for UI demonstration purposes
  return NextResponse.json({
    status: 'success',
    message: 'This is a mock endpoint. In production, this would fetch from Gmail API.',
    data: [
      { id: '1', snippet: 'Mock email snippet 1' },
      { id: '2', snippet: 'Mock email snippet 2' }
    ]
  });
  */
}
