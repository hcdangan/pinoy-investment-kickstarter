# CLAUDE.md

## Project Overview

This is a web application that helps Filipino investors kickstart their investment journey through beginner-friendly education, AI-assisted guidance, portfolio learning tools, and localized investing resources.

The app should prioritize clarity, trust, simplicity, and responsible financial education. It must not present AI responses as licensed financial advice.

The app should contain Facebook and Google authentication using Clerk or Supabase. The landing page should be a single scroll page that encourages Filipinos to invest. Use factual data if necessary. There should be a chat page for logged-in users. The chatbot should interview the user and recommend the best investment advice based on the user's profile. 

## Stack

- Frontend: Next.js 14 + Tailwind CSS
- AI / LLM: Vercel AI SDK + Claude or OpenAI
- Database: Supabase
- Auth: Clerk or Supabase Auth
- Deploy: Vercel + GitHub Actions

## Commands

npm run dev
npm run lint
npm run typecheck
npm run test
npm run build

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
Prefer server components by default.
Use client components only when interactivity is required.
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

Use Vercel AI SDK for model calls and streaming.
Support Claude or OpenAI through a small provider abstraction.
Keep prompts short, explicit, and versionable.
Never hardcode API keys.
Keep AI calls server-side.
Add safety instructions for financial topics.
Do not claim certainty about investment outcomes.
Encourage users to research and consult licensed professionals for personal financial decisions.

## Database Guidelines

Suggested tables may include:

users
profiles
conversations
messages
investment_goals
watchlists
learning_progress

Rules:

Keep database access in lib/supabase/.
Use typed database helpers.
Apply row-level security where appropriate.
Never expose service role keys to the browser.
Use migrations for schema changes.

## Auth Guidelines

Protect authenticated routes with middleware.ts.
Keep auth helpers in lib/auth/.
Do not mix auth providers unless explicitly required.
Store only necessary user profile data.
Keep authorization checks server-side.

## Security Guidelines

Security Guidelines
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

## GitHub Actions

The CI should run:

npm run lint
npm run typecheck
npm run test
npm run build

## Environment Variables

NEXT_PUBLIC_APP_URL=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

## Before finishing a task

Run relevant checks when possible:

npm run lint
npm run typecheck
npm run test
npm run build

## Directory Guide

```txt
app/                  Next.js App Router pages, layouts, API routes
components/           Reusable UI and feature components
components/ui/        Generic UI primitives
components/chat/      AI chat and assistant UI
lib/                  Shared utilities and service clients
lib/ai/               Vercel AI SDK setup, prompts, model config
lib/supabase/         Supabase clients, queries, database helpers
lib/auth/             Clerk or Supabase Auth helpers
hooks/                Reusable React hooks
types/                Shared TypeScript types
supabase/             Migrations, schema, seed files
public/               Static assets
.github/workflows/   CI and deployment workflows