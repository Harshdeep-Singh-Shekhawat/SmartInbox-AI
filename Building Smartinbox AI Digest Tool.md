# Building SmartInbox AI Digest Tool

Act as an expert full-stack engineer and UI/UX designer. Build a web application called "SmartInbox AI" that connects to a user's email account, filters out the clutter to find genuinely important emails, and provides concise, actionable AI summaries for them.

Please implement the following technical specifications and features:

### 1. Technology Stack & Integrations
- Frontend: Modern, clean, and responsive UI using React, Tailwind CSS, and Lucide React icons.
- Authentication: Secure Google/Microsoft OAuth 2.0 login so the app can securely access the user's inbox via official APIs (Gmail API / Microsoft Graph API).
- Storage/Database: A lightweight database (like Supabase or Prisma/PostgreSQL) to store user preferences and securely handle session tokens.

### 2. Core Functional Requirements
- Email Fetching: Fetch the latest emails (e.g., last 48 hours or unread emails).
- AI Filtering Engine: Use an LLM API (like OpenAI GPT-4o-mini or Claude 3.5 Sonnet) to analyze incoming emails. The AI must evaluate the subject line, sender, and snippet, then categorize the email as either "Important" or "Noise" based on urgency, action items, or direct personal/professional communication.
- AI Summarization Engine: For every email marked "Important," use the LLM to generate a 2-3 bullet-point summary highlighting the core context, key action items, and any deadlines.

### 3. UI/UX & Dashboard Layout
Create a beautiful, minimalist dashboard featuring:
- A sidebar with navigation (Dashboard, Filter Rules, Settings).
- A main metric panel showing: Total Emails Scanned, Important Mails Found, and Pending Actions.
- The "Important Digest" feed: A clean list of the filtered important emails. Clicking an email expands a sleek card showing:
  - Original sender and subject.
  - The "AI TL;DR" (2-3 bulleted summary).
  - Quick action buttons: "Mark as Read", "Archive", and "Open in Gmail/Outlook".
- A "Filter Rules" settings page where users can add custom keywords or VIP senders that the AI should always mark as important.

### 4. Privacy & Security Constraints
- Ensure that email bodies are processed on-the-fly and never permanently stored on the application database to respect user privacy.
- Handle API rate-limiting gracefully with loading states and skeleton loaders in the UI.

Please generate the complete codebase, components, and API routing logic to make this application fully functional.
