# Author
Created by Harley Dangan <hcdangan@gmail.com> using AI tools.
Submitted to Asian Institute of Management.

This is a project for my post-graduate course. 

# Features
Built for Filipino investors with local terminology, PH market examples, and contextual guidance
AI‑assisted chat using openrouter free 
Secure authentication with email registration
Portfolio learning tools and beginner‑friendly investment concepts
Guided onboarding where the chatbot interviews users and recommends educational paths
Single‑scroll landing page designed to encourage Filipinos to invest responsibly
100% free

# Tech Stack
Frontend: Next.js 14, Tailwind CSS
AI / LLM: Supabase edge chat with openrouter/free LLMs
Database: Supabase 
Auth: Supabase Auth
Deployment: Vercel + GitHub Actions

# File Structure
.github/
  workflows/           CI configuration
dist/
  assets/              Build output assets
public/                Static assets
src/
  components/
    chat/              Chat UI components
    landing/           Landing page components
    ui/                Generic UI primitives
  lib/
    auth/              Auth helpers (Supabase)
    chat/              AI chat logic and providers
    supabase/          Supabase clients and database helpers
  pages/               Next.js pages
  tests/               Unit tests
supabase/
  .temp/               Supabase local dev artifacts
  functions/
    chat/              Edge functions for chat
  migrations/          Database schema migrations

# How to run this code
Clone this code and upload it to your repository, and configure Vercel to connect to your repository.
Use the migration script on your Supabase paltform.
Deploy the supabase chat function.
Add Supabase environment variables and openrouter API key. 