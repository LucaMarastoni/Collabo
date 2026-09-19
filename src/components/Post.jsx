import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, ArrowUpRight, CalendarDays, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectPost from './ProjectPost';
import PortfolioPost from './PortfolioPost';
export default function Post({ post, state, update, notify }) {
 const [commentsOpen, setCommentsOpen] = useState(false);
 const [comment, setComment] = useState('');
 const [menuOpen, setMenuOpen] = useState(false);
 const [imageIndex, setImageIndex] = useState(0);
 const [allTags, setAllTags] = useState(false);
 const gallery = post.gallery || [{ image: post.image, alt: post.alt }];
 const comments = state.comments || [];
 async function share() {
  const url = `${window.location.href.split('#')[0]}#/?post=${post.id}`;
  try { await navigator.clipboard.writeText(url); notify('Link del post copiato'); } catch { notify('Condivisione non disponibile in questo browser'); }
 }
 return <article className="post" id={post.id}>
  <div className="post-header"><img className="avatar" src={post.user.avatar} alt=""/><div className="author"><strong>{post.user.username}</strong><span>{post.user.profession} · {post.location.split(',')[0]}</span></div><div className="post-menu"><button className="icon-button muted" aria-label={`Opzioni per ${post.title}`} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreHorizontal size={22}/></button>{menuOpen && <div className="menu-popover"><button onClick={() => { update({ saved: !state.saved }); setMenuOpen(false); }}>{state.saved ? 'Rimuovi dai salvati' : 'Salva questo post'}</button><button onClick={() => { share(); setMenuOpen(false); }}>Copia link</button></div>}</div></div>
  <div className={`post-media ${post.type}`}><img src={gallery[imageIndex].image} alt={gallery[imageIndex].alt} loading={post.id === 'p1' ? 'eager' : 'lazy'}/><span className={`post-badge ${post.type}`}><span/>{post.type === 'project' ? 'Progetto' : 'Portfolio'}</span>{gallery.length > 1 && <><span className="image-counter" aria-live="polite">{imageIndex + 1}/{gallery.length}</span><button className="gallery-arrow previous" aria-label="Immagine precedente" onClick={() => setImageIndex((imageIndex + gallery.length - 1) % gallery.length)}><ChevronLeft size={20}/></button><button className="gallery-arrow next" aria-label="Immagine successiva" onClick={() => setImageIndex((imageIndex + 1) % gallery.length)}><ChevronRight size={20}/></button></>}</div>
  <div className="post-content"><div className="post-title-row"><h2>{post.title}</h2></div><p className="post-description">{post.description}</p>
  {post.type === 'project' ? <><div className="project-details"><span><MapPin size={15}/>{post.location}</span><span><CalendarDays size={15}/>{post.period}</span><span><Monitor size={15}/>{post.remote ? 'Remoto ok' : 'In presenza'}</span></div><div className="tags">{(allTags ? post.tags : post.tags.slice(0, 3)).map(tag => <span className="tag" key={tag}>{tag}</span>)}{post.tags.length > 3 && <button className="tag more-tags" aria-expanded={allTags} onClick={() => setAllTags(!allTags)}>{allTags ? 'Meno' : `+${post.tags.length - 3}`}</button>}</div></> : <PortfolioPost tags={post.tags}/>}
  <div className={`post-actions ${post.type}-actions ${state.requested ? 'has-request' : ''}`}><button className={`icon-button like ${state.liked ? 'liked' : ''}`} aria-label={state.liked ? 'Rimuovi mi piace' : 'Mi piace'} aria-pressed={!!state.liked} onClick={() => update({ liked: !state.liked })}><Heart size={24} fill={state.liked ? 'currentColor' : 'none'}/><span>{post.likes + (state.liked ? 1 : 0)}</span></button>
  {post.type === 'project' && <ProjectPost requested={state.requested} onCollaborate={() => { update({ requested: true }); notify('Richiesta di collaborazione inviata'); }}/>}
  <button className="icon-button" aria-label="Mostra commenti" aria-expanded={commentsOpen} onClick={() => setCommentsOpen(!commentsOpen)}><MessageCircle size={24}/><span>{post.comments + comments.length}</span></button><button className="icon-button" aria-label="Condividi post" onClick={share}><Send size={23}/></button><button className={`icon-button save ${state.saved ? 'saved' : ''}`} aria-label={state.saved ? 'Rimuovi dai salvati' : 'Salva post'} aria-pressed={!!state.saved} onClick={() => update({ saved: !state.saved })}><Bookmark size={23} fill={state.saved ? 'currentColor' : 'none'}/></button></div><div className="post-footer"><time>{post.time}</time></div>
  {commentsOpen && <section className="comments"><p><strong>giulia.studio</strong> Bellissima atmosfera, seguo volentieri il progetto!</p>{comments.map((text, i) => <p key={i}><strong>luca.visuals</strong> {text}</p>)}<form onSubmit={e => { e.preventDefault(); if (comment.trim()) { update({ comments: [...comments, comment.trim()] }); setComment(''); } }}><input aria-label="Scrivi un commento" placeholder="Aggiungi un commento…" value={comment} onChange={e => setComment(e.target.value)}/><button className="icon-button" disabled={!comment.trim()} aria-label="Invia commento"><ArrowUpRight size={21}/></button></form></section>}
  </div></article>;
}
