# CLAUDE.md

## Project Overview

This is a web application that helps Filipino investors kickstart their investment journey through beginner-friendly education, AI-assisted guidance, portfolio learning tools, and localized investing resources.

The app should prioritize clarity, trust, simplicity, and responsible financial education. It must not present AI responses as licensed financial advice.

## Stack

- Frontend: Next.js 14 + Tailwind CSS
- AI / LLM: Vercel AI SDK + Claude or OpenAI
- Database: Supabase
- Auth: Clerk or Supabase Auth
- Deploy: Vercel + GitHub Actions

## Core Principles

- Build for Filipino users and local investing context.
- Keep explanations beginner-friendly and practical.
- Use PHP, Philippine market examples, and local terminology when helpful.
- Avoid hype, guarantees, or unrealistic investment claims.
- Clearly distinguish education from financial advice.
- Prefer simple, maintainable code over clever abstractions.
- Minimize token usage when generating code: be direct, avoid unnecessary comments, and only create files needed for the task.

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