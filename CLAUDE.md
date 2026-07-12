# CLAUDE.md

## Project Overview

This is a web application that helps Filipino investors kickstart their investment journey through beginner-friendly education, AI-assisted guidance, portfolio learning tools, and localized investing resources.

The app should prioritize clarity, trust, simplicity, and responsible financial education. It must not present AI responses as licensed financial advice.

The app uses Supabase Auth (email/password + Google OAuth). there is no Clerk and no Facebook login. The landing page is a single scroll page that encourages Filipinos to invest. There is a chat page for logged-in users. The chatbot interviews the user and provides educational investment guidance based on their profile.

## Stack

- Frontend: Vite + React 19 + TypeScript + Tailwind CSS + React Router v7
- AI / LLM: Openrouter Free
- Database: Supabase (Postgres + Row Level Security)
- Auth: Supabase Auth only <!-- Google Authentication is in the UI but doesn't work due to the lack of a Google API key. -->
- Testing: Vitest + @testing-library/react + jsdom
- CI: GitHub Actions runs lint, typecheck, test, and build on every push/PR to `main`.

## Commands

npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run preview

## Core Principles

- Build for Filipino users and local investing context.
- Keep explanations beginner-friendly and practical.
- Use PHP, Philippine market examples, and local terminology when helpful.
- Avoid hype, guarantees, or unrealistic investment claims.
- Clearly distinguish education from financial advice.
- Prefer simple, maintainable code over clever abstractions.
- Minimize token usage when generating code: be direct, avoid unnecessary comments, and only create files needed for the task.

## Coding Conventions

Use TypeScript.
Use functional components with hooks.
Keep components small and focused.
Use Tailwind CSS for styling.
Keep business logic out of UI components.
Use clear names over comments.
Validate inputs at API boundaries.
Handle loading, empty, and error states.
Avoid unnecessary dependencies.
Do not expose secrets to the client.

## Coding Instructions

Be concise.
Prefer editing existing files over creating new ones.
Do not generate large boilerplate unless requested.
Explain only important decisions.
Ask only when blocked.
Follow the existing project style.
Do not introduce new libraries without a clear reason.
Keep generated code production-ready, typed, and minimal.
Create unit tests.

## AI Guidelines

All AI calls happen server-side only.
Keep prompts short, explicit, and versionable.
Never hardcode API keys.
Keep AI calls server-side.
Add safety instructions for financial topics.
Do not claim certainty about investment outcomes.
Encourage users to research and consult licensed professionals for personal financial decisions.

## Database Guidelines

Tables:

users
profiles
conversations
messages
investment_goals
watchlists
learning_progress

Rules:

Apply row-level security where appropriate
Never expose service role keys to the browser.
Use migrations for schema changes.

## Auth Guidelines

Store only necessary user profile data.
Keep authorization checks server-side

## Security Guidelines

Never commit .env files.
Keep .env.example updated.
Validate user input.
Sanitize AI-visible user content when needed.
Do not allow arbitrary tool execution from AI output.
Keep service role keys server-only.
Avoid logging sensitive user data.
Use least-privilege access patterns.

## Financial Content Rules

When generating investing content:

Use plain language.
Explain risk clearly.
Avoid guaranteed returns.
Avoid personalized buy/sell recommendations unless the app is explicitly designed and legally reviewed for that.

Prefer educational framing:

concepts
comparisons
pros and cons
risk levels
beginner checklists
common mistakes
Mention that investments can lose value.

## UI Guidelines

Design should feel trustworthy, calm, and beginner-friendly.
Use responsive layouts.
Prioritize readability on mobile.
Use accessible contrast and semantic HTML.
Prefer simple dashboards, cards, tables, and guided flows.
Avoid cluttered financial jargon.

## Testing

Test files live in `src/tests/`
Mock external dependencies.

## GitHub Actions

The CI runs on every push and PR to `main`:

npm ci
npm run lint
npm run typecheck
npm run test
npm run build

## Environment Variables

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENROUTER_API_KEY=

## Before finishing a task

Run relevant checks when possible:

npm run lint
npm run typecheck
npm run test
npm run build

## Directory Guide

```txt
src/
  App.tsx                    Route definitions
  main.tsx                   Entry point (BrowserRouter, AuthProvider)
  index.css                  Tailwind entry + shared component classes
  vite-env.d.ts               Vite env var types
  components/
    Logo.tsx
    ProtectedRoute.tsx        Auth-gated route wrapper
    landing/                  Landing page sections (Navbar, Hero, Mission, WhyInvest, Learn, HowItWorks, FAQ, CTA, Footer)
    chat/
      ChatPage.tsx             Chat UI + conversation sidebar (protected route)
    ui/
      GoogleButton.tsx
      LoadingSpinner.tsx
  lib/
    auth/AuthContext.tsx       Supabase Auth context/provider
    chat/chatService.ts        Conversation/message CRUD + calls the chat edge function
    supabase/client.ts         Supabase client + Database types
  pages/
    Landing.tsx
    SignIn.tsx
    SignUp.tsx
  tests/                      Vitest + Testing Library unit tests
supabase/
  functions/chat/index.ts     Deno Edge Function: auth check, profile lookup, calls OpenRouter, persists messages
  migrations/                 SQL schema + RLS policies
.github/workflows/ci.yml      lint, typecheck, test, build
```
