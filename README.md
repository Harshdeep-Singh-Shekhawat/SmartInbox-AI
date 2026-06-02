# SmartInbox AI

An AI-powered email filtering and summarization application built with Next.js, Tailwind CSS, Prisma, and the Vercel AI SDK.

## Getting Started

This repository contains the complete frontend prototype and API routing skeleton for SmartInbox AI, ready to be connected to your live Gmail and OpenAI accounts.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### 1. Setup the Project

If you received this project as a zip file (`smartinbox-upload.zip`), extract it to a directory of your choice and open it in your terminal.

If this is hosted on a git repository:
```bash
git clone <repository-url>
cd SmartInboxAI
```

### 2. Install Dependencies

Install the required npm packages (this excludes `node_modules` which must be rebuilt locally):
```bash
npm install
```

### 3. Environment Variables & API Setup

Currently, the application runs using local mock data. To connect it to real email and AI endpoints, you need to set up Google Cloud and OpenAI API keys.

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables:

```env
# NextAuth settings
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# Google OAuth (Gmail API)
# Needs `https://www.googleapis.com/auth/gmail.readonly` scope
GOOGLE_CLIENT_ID="your_google_oauth_client_id"
GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"

# OpenAI API Key
OPENAI_API_KEY="your_openai_api_key"
```

### 4. Enable Live Data Integrations

Once your `.env.local` is set up, you need to toggle the codebase from "mock mode" to "live mode":
- **Gmail Fetching**: Open `app/api/emails/route.ts` and uncomment the NextAuth session extraction and Google APIs calls, then comment out the mock JSON response.
- **AI Processing**: Open `app/api/analyze/route.ts` and uncomment the `generateObject` function using the `@ai-sdk/openai` module, then comment out the simulated mock response.

### 5. Run the Application

Start the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will prompt you to "Sign in with Google", request permissions to read your emails, and immediately start analyzing your inbox.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Authentication**: NextAuth.js (Google Provider)
- **Database**: Prisma ORM (SQLite configured for local dev)
- **AI Integration**: Vercel AI SDK (`ai`) & OpenAI GPT models
