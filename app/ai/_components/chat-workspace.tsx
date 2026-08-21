'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, ChevronLeft, FileText, Lightbulb, Menu, MessageSquare, PenLine, Plus, RefreshCw, Search, Send, Sparkles, X } from 'lucide-react'
import MessageContent from './message-content'
import type { ChatMessage, ChatResponse } from '@/lib/ai/types'
import styles from './styles.module.css'

type Conversation = { id: string; title: string; messages: ChatMessage[] }
const makeConversation = (): Conversation => ({ id: crypto.randomUUID(), title: 'New conversation', messages: [] })
const suggestions = [
	{ label: 'Explain something', icon: Lightbulb },
	{ label: 'Write something', icon: PenLine },
	{ label: 'Brainstorm', icon: FileText },
	{ label: 'Analyze', icon: Search },
]

export default function ChatWorkspace() {
	const [conversations, setConversations] = useState<Conversation[]>([])
	const [activeId, setActiveId] = useState('')
	const [draft, setDraft] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [copiedId, setCopiedId] = useState('')
	const endRef = useRef<HTMLDivElement>(null)

	useEffect(() => { const first = makeConversation(); setConversations([first]); setActiveId(first.id) }, [])
	useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [conversations, isLoading, error])
	const active = useMemo(() => conversations.find((conversation) => conversation.id === activeId), [activeId, conversations])
	const updateActive = (updater: (conversation: Conversation) => Conversation) => setConversations((current) => current.map((conversation) => conversation.id === activeId ? updater(conversation) : conversation))
	const createConversation = () => { const next = makeConversation(); setConversations((current) => [next, ...current]); setActiveId(next.id); setError(''); setDrawerOpen(false) }

	const submit = async (override?: string) => {
		const text = (override ?? draft).trim()
		if (!text || !active || isLoading) return
		const user: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text }
		const messages = [...active.messages, user]
		updateActive((conversation) => ({ ...conversation, title: conversation.messages.length ? conversation.title : text.slice(0, 34), messages }))
		setDraft(''); setError(''); setIsLoading(true)
		try {
			const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) })
			const data = (await response.json()) as ChatResponse & { error?: string }
			if (!response.ok || !data.message) throw new Error(data.error || 'The response could not be generated.')
			updateActive((conversation) => ({ ...conversation, messages: [...conversation.messages, data.message] }))
		} catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'The response could not be generated.') } finally { setIsLoading(false) }
	}
	const regenerate = async () => {
		if (!active || isLoading) return
		const lastUser = [...active.messages].reverse().find((message) => message.role === 'user')
		if (!lastUser) return
		const messages = active.messages.filter((message) => message.id !== active.messages[active.messages.length - 1]?.id)
		updateActive((conversation) => ({ ...conversation, messages })); setError(''); setIsLoading(true)
		try {
			const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) })
			const data = (await response.json()) as ChatResponse & { error?: string }
			if (!response.ok || !data.message) throw new Error(data.error || 'The response could not be generated.')
			updateActive((conversation) => ({ ...conversation, messages: [...conversation.messages, data.message] }))
		} catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'The response could not be generated.') } finally { setIsLoading(false) }
	}
	const copy = async (message: ChatMessage) => { await navigator.clipboard.writeText(message.content); setCopiedId(message.id); window.setTimeout(() => setCopiedId(''), 1600) }

	return <main className={styles.shell}>
		{drawerOpen && <button className={styles.backdrop} aria-label='Close chat navigation' onClick={() => setDrawerOpen(false)} />}
		<aside className={`${styles.sidebar} ${drawerOpen ? styles.sidebarOpen : ''}`} aria-label='Chat history'>
			<div className={styles.sidebarTop}><a href='/' className={styles.brand} aria-label='Savikabee website'><span className={styles.brandMark}><Sparkles size={15} /></span><span>Savikabee AI</span></a><button className={styles.closeDrawer} onClick={() => setDrawerOpen(false)} aria-label='Close menu'><X size={19} /></button></div>
			<button className={styles.newChat} onClick={createConversation}><Plus size={15} /> New chat</button>
			<nav className={styles.history}><p className={styles.historyLabel}>Chats</p>{conversations.map((conversation) => <button key={conversation.id} className={conversation.id === activeId ? styles.activeConversation : ''} onClick={() => { setActiveId(conversation.id); setDrawerOpen(false) }}><MessageSquare size={15} /><span>{conversation.title}</span></button>)}</nav>
			<div className={styles.sidebarFoot}><span className={styles.profileDot}><Bot size={14} /></span><span><strong>Local workspace</strong><small>Mock mode</small></span></div>
		</aside>
		<section className={styles.chat}>
			<header className={styles.chatHeader}><button className={styles.menuButton} onClick={() => setDrawerOpen(true)} aria-label='Open chat navigation'><Menu size={20} /></button><div><strong>Savikabee AI</strong><span>New conversation</span></div><a href='/' className={styles.backLink}><ChevronLeft size={16} /> Website</a></header>
			<div className={styles.messages} aria-live='polite'>
				{active?.messages.length === 0 && <div className={styles.welcome}><h1>SAVIKABEE AI</h1><p>A clear space for your next thought.</p></div>}
				{active?.messages.map((message) => <MessageContent key={message.id} message={message} copied={copiedId === message.id} onCopy={() => copy(message)} />)}
				{isLoading && <div className={styles.typing}><div className={styles.avatar}>S</div><span /><span /><span /><em>Thinking</em></div>}
				{error && <div className={styles.error}><span>{error}</span><button onClick={() => { const last = active?.messages[active.messages.length - 1]; if (last?.role === 'user') submit(last.content) }}>Try again</button></div>}
				{active?.messages.some((message) => message.role === 'assistant') && !isLoading && <button className={styles.regenerate} onClick={regenerate}><RefreshCw size={15} /> Regenerate response</button>}
				<div ref={endRef} />
			</div>
			<div className={`${styles.composerArea} ${active?.messages.length === 0 ? styles.emptyComposer : ''}`}><form className={styles.composer} onSubmit={(event) => { event.preventDefault(); submit() }}><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit() } }} placeholder='Ask anything...' rows={1} aria-label='Message Savikabee AI' /><div className={styles.composerToolbar}><span className={styles.attachmentMark} aria-hidden='true'><Plus size={18} /></span><span className={styles.modelLabel}>Standard <ChevronDown size={13} /></span></div><button type='submit' disabled={!draft.trim() || isLoading} aria-label='Send message'><Send size={16} /></button></form>{active?.messages.length === 0 && <div className={styles.suggestions}>{suggestions.map((suggestion) => { const Icon = suggestion.icon; return <button key={suggestion.label} onClick={() => setDraft(suggestion.label)}><Icon size={14} />{suggestion.label}</button> })}</div>}</div>
		</section>
	</main>
}
