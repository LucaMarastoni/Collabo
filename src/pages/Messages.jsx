import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, SquarePen, X } from 'lucide-react';
import Header from '../components/Header';
export default function Messages({ conversations, setConversations }) {
 const [params, setParams] = useSearchParams();
 const active = conversations.find(c => c.id === params.get('chat'));
 const [draft, setDraft] = useState('');
 const [composing, setComposing] = useState(false);
 const bottom = useRef(null);
 useEffect(() => { bottom.current?.scrollIntoView({ block: 'nearest' }); }, [active?.id, active?.messages.length]);
 useEffect(() => { setDraft(''); if (active?.id) setConversations(prev => prev.map(c => c.id === active.id && c.unread ? { ...c, unread: 0 } : c)); }, [active?.id, setConversations]);
 function openChat(c) { setParams({ chat: c.id }); setComposing(false); }
 function send(e) { e.preventDefault(); if (!draft.trim()) return; const time = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }); setConversations(prev => prev.map(c => c.id === active.id ? { ...c, time, messages: [...c.messages, { id: crypto.randomUUID(), text: draft.trim(), sent: true, time }] } : c)); setDraft(''); }
 if (active) return <section className="chat"><div className="chat-header"><button className="icon-button" aria-label="Torna alle conversazioni" onClick={() => setParams({})}><ArrowLeft size={23}/></button><img className="avatar" src={active.user.avatar} alt=""/><div><h1>{active.user.name}</h1><span className="chat-online"><span/>Online</span></div></div><div className="chat-messages"><span className="chat-date">La vostra conversazione</span>{active.messages.map(m => <div className={`bubble ${m.sent ? 'sent' : 'received'}`} key={m.id}><p>{m.text}</p><time>{m.time}</time></div>)}<div ref={bottom}/></div><form className="message-composer" onSubmit={send}><input aria-label="Scrivi un messaggio" placeholder="Scrivi un messaggio..." value={draft} onChange={e => setDraft(e.target.value)}/><button className="send-button" aria-label="Invia messaggio" disabled={!draft.trim()}><Send size={21}/></button></form></section>;
 return <><Header title={composing ? 'Nuovo messaggio' : 'Messaggi'} action={<button className="icon-button" aria-label={composing ? 'Chiudi nuovo messaggio' : 'Nuovo messaggio'} onClick={() => setComposing(!composing)}>{composing ? <X size={22}/> : <SquarePen size={22}/>}</button>}/><section className="messages-page">{composing && <p className="recipient-label">Scegli una persona con cui iniziare a parlare.</p>}<div className="conversation-list">{conversations.map(c => <button className="conversation" key={c.id} onClick={() => openChat(c)}><div className="conversation-avatar"><img className="avatar" src={c.user.avatar} alt=""/></div><div className="conversation-text"><strong>{c.user.username}</strong><p>{composing ? c.user.profession : `${c.messages.at(-1).sent ? 'Tu: ' : ''}${c.messages.at(-1).text}`}</p></div>{!composing && <div className="conversation-meta"><time>{c.time}</time>{c.unread > 0 && <span className="unread" aria-label={`${c.unread} messaggi non letti`}>{c.unread}</span>}</div>}</button>)}</div></section></>;
}
