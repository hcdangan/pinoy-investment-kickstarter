import { supabase } from '../supabase/client'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at?: string
}

export async function createConversation(title = 'New Conversation') {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ title })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []) as ChatMessage[]
}

export async function deleteConversation(conversationId: string) {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId)
  if (error) throw error
}

export async function sendChatMessage(
  messages: ChatMessage[],
  conversationId: string,
): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const { data: sessionData } = await supabase.auth.getSession()
  const accessToken = sessionData.session?.access_token

  if (!accessToken) throw new Error('Not authenticated')

  const response = await fetch(`${supabaseUrl}/functions/v1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      conversationId,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `Request failed (${response.status})`)
  }

  const data = await response.json()
  if (!data.content) throw new Error('Invalid response from AI service')
  return data.content as string
}
