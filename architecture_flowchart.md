# SmartInbox AI Workflow & Architecture

This document provides visual flowcharts of how data moves through the application, and how users interact with the system.

## User Journey Workflow

This flowchart represents the high-level workflow of a user navigating the application from sign-in to managing their email digests.

```mermaid
graph TD
    Start([User Visits App]) --> AuthCheck{Is User Logged In?}
    AuthCheck -- No --> Login[Google OAuth Login Page]
    Login --> AuthCheck
    
    AuthCheck -- Yes --> Dashboard[SmartInbox Dashboard]
    
    Dashboard --> FetchData[Fetch Recent Emails]
    FetchData --> FilterRules{Check Custom Filter Rules}
    
    FilterRules -- "Rule Matches 'Important'" --> MarkImportant[Mark Important immediately]
    FilterRules -- "Rule Matches 'Noise'" --> MarkNoise[Discard/Hide]
    FilterRules -- "No Rules Match" --> AIEngine[Send to AI Filtering Engine]
    
    AIEngine -- AI says Important --> GenerateSummary[Generate AI TL;DR Summary]
    AIEngine -- AI says Noise --> MarkNoise
    
    MarkImportant --> GenerateSummary
    
    GenerateSummary --> DisplayList[Display in 'Important Digest' Feed]
    
    DisplayList --> UserAction{User Clicks Email}
    UserAction -- "Read" --> ExpandCard[Expand Card & Read Summary]
    UserAction -- "Action" --> ClickAction(Archive / Mark Read / Open in Gmail)
```

## Technical Architecture & Data Flow

This flowchart illustrates the backend infrastructure and how the Next.js server communicates with the external APIs (Gmail API & OpenAI).

```mermaid
sequenceDiagram
    participant Client as Next.js Client (React)
    participant NextAuth as NextAuth (Session)
    participant Server as Next.js API Routes
    participant DB as Prisma (SQLite)
    participant Gmail as Google Gmail API
    participant LLM as OpenAI GPT-4o-mini
    
    Client->>NextAuth: Request Session Token
    NextAuth-->>Client: Returns Active Session
    
    Client->>Server: GET /api/emails
    Server->>NextAuth: Validate Session & Get Access Token
    
    Server->>Gmail: Fetch latest unread emails (using token)
    Gmail-->>Server: Returns raw email payload
    
    Server->>DB: Fetch Custom Filter Rules for User
    DB-->>Server: Returns Rules (Keywords, Senders)
    
    loop For each email
        Server->>Server: Apply Filter Rules
        alt Requires AI Analysis
            Server->>LLM: POST /api/analyze (Prompt: Sender, Subject, Snippet)
            LLM-->>Server: JSON: { isImportant, category, summary }
        end
    end
    
    Server-->>Client: Return mapped & summarized EmailData[]
    
    Client->>Client: Render Glassmorphic UI Dashboard
```

## System Components (Entity Relationship)

```mermaid
erDiagram
    USER ||--o{ ACCOUNT : has
    USER ||--o{ SESSION : has
    USER ||--o{ FILTER_RULE : creates
    
    USER {
        string id
        string name
        string email
    }
    
    FILTER_RULE {
        string id
        string type "Keyword or Sender"
        string value "e.g. invoice"
        string action "Always Important/Noise"
    }
```
