import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, Search, X, ChevronRight, Clock3, Bookmark, Video, Paintbrush, Camera, Box, Music2, Code2, PanelsTopLeft, Type, PenTool, Clapperboard, Building2, AudioLines } from 'lucide-react';
import { posts, searchCategories, searchMockData, featuredPostIds } from '../data/mockData';

const categoryIcons = { Video, Paintbrush, Camera, Box, Music2, Code2, PanelsTopLeft, Type, PenTool, Clapperboard, Building2, AudioLines };

export default function SearchOverlay({ onClose, onOpenPost, recents, setRecents, postStates, updatePost }) {
 const [query, setQuery] = useState('');
 const [allCategories, setAllCategories] = useState(false);
 const [allFeatured, setAllFeatured] = useState(false);
 const [closing, setClosing] = useState(false);
 const input = useRef(null);
 const closeTimer = useRef();
 const navigate = useNavigate();
 const results = searchMockData(query);
 const hasQuery = query.trim().length > 0;
 const resultCount = results.people.length + results.projects.length + results.portfolio.length;
 const featured = featuredPostIds.map(id => posts.find(post => post.id === id));
 const recommended = allFeatured ? posts : featured;

 useEffect(() => {
  const overflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  input.current?.focus({ preventScroll: true });
  return () => { document.body.style.overflow = overflow; clearTimeout(closeTimer.current); };
 }, []);

 function remember(value = query) {
  const clean = value.trim();
  if (clean) setRecents(previous => [clean, ...previous.filter(item => item.toLowerCase() !== clean.toLowerCase())].slice(0, 8));
 }
 function close() {
  if (closing) return;
  setClosing(true);
  closeTimer.current = setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160);
 }
 function selectQuery(value) { setQuery(value); remember(value); input.current?.focus({ preventScroll: true }); }
 function openPost(post) { remember(); onOpenPost(post.id); }

 return <section className={`search-view ${closing ? 'is-closing' : ''}`} aria-label="Ricerca" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
  <header className="search-view-header"><button className="icon-button search-back" aria-label="Chiudi ricerca e torna alla Home" onClick={close}><ArrowLeft size={24}/></button><form className="search-field" role="search" onSubmit={event => { event.preventDefault(); remember(); input.current?.blur(); }}><Search size={21}/><input ref={input} type="search" aria-label="Cerca progetti, persone, skill" placeholder="Cerca progetti, persone, skill..." autoComplete="off" enterKeyHint="search" value={query} onChange={event => setQuery(event.target.value)}/>{query && <button type="button" className="search-clear" aria-label="Cancella ricerca" onClick={() => { setQuery(''); input.current?.focus(); }}><X size={16}/></button>}</form></header>
  <div className="search-view-content">
   {hasQuery ? <section className="search-results"><div className="search-section-heading"><h1>Risultati</h1><span className="result-count" role="status" aria-live="polite">{resultCount} {resultCount === 1 ? 'risultato' : 'risultati'}</span></div>
    {resultCount === 0 ? <div className="search-empty"><span className="search-empty-icon"><Search size={31}/></span><h2>Nessun risultato trovato</h2><p>Prova con un’altra parola chiave o esplora le categorie.</p><button onClick={() => { setQuery(''); input.current?.focus(); }}>Esplora le categorie<ChevronRight size={17}/></button></div> : <>
     {results.people.length > 0 && <section className="result-group" aria-labelledby="people-results"><h2 id="people-results">Persone <span>{results.people.length}</span></h2>{results.people.map(user => <button className="person-result" key={user.id} aria-label={`Apri conversazione con ${user.username}`} onClick={() => { remember(); navigate(`/messages?chat=${user.id}`); }}><img className="avatar" src={user.avatar} alt=""/><span><strong>{user.username}</strong><span>{user.profession} · {user.city}</span></span><ChevronRight size={18}/></button>)}</section>}
     {[{ label: 'Progetti', items: results.projects }, { label: 'Portfolio', items: results.portfolio }].filter(group => group.items.length).map(group => <section className="result-group" key={group.label} aria-label={group.label}><h2>{group.label} <span>{group.items.length}</span></h2>{group.items.map(post => <button className="post-result" key={post.id} onClick={() => openPost(post)}><img src={post.image} alt={post.alt}/><span className="post-result-content"><span className={`result-badge ${post.type}`}>{post.type === 'project' ? 'Progetto' : 'Portfolio'}</span><strong>{post.title}</strong><span className="result-description">{post.description}</span><span className="result-author">{post.user.username}</span></span><ChevronRight size={17}/></button>)}</section>)}
    </>}
   </section> : <>
    <section className="search-categories" aria-labelledby="categories-heading"><div className="search-section-heading"><h2 id="categories-heading">Categorie consigliate</h2><button aria-expanded={allCategories} onClick={() => setAllCategories(!allCategories)}>{allCategories ? 'Mostra meno' : 'Vedi tutte'}<ChevronRight size={16}/></button></div><div className="category-grid">{searchCategories.slice(0, allCategories ? undefined : 8).map(category => { const Icon = categoryIcons[category.icon]; return <button className="category-card" key={category.label} style={{ '--category-color': category.color }} onClick={() => selectQuery(category.label)}><span><Icon size={24} strokeWidth={1.6}/></span><strong>{category.label}</strong></button>; })}</div></section>
    <section className="search-featured" aria-labelledby="featured-heading"><div className="search-section-heading"><h2 id="featured-heading">In evidenza</h2><button aria-expanded={allFeatured} onClick={() => setAllFeatured(!allFeatured)}>{allFeatured ? 'Mostra meno' : 'Vedi tutti'}<ChevronRight size={16}/></button></div><div className={`featured-track ${allFeatured ? 'expanded' : ''}`}>{recommended.map(post => <article className="featured-card" key={post.id}><button className="featured-open" onClick={() => openPost(post)} aria-label={`Apri ${post.title}`}><img className="featured-cover" src={post.image} alt={post.alt}/><span className="featured-copy"><strong>{post.title}</strong><span className="featured-author"><img src={post.user.avatar} alt=""/><span><span>{post.user.username}</span><small>{post.location.split(',')[0]}</small></span></span></span></button><span className={`result-badge featured-badge ${post.type}`}>{post.type === 'project' ? 'Progetto' : 'Portfolio'}</span><button className={`featured-save ${postStates[post.id]?.saved ? 'saved' : ''}`} aria-label={`${postStates[post.id]?.saved ? 'Rimuovi dai salvati' : 'Salva'}: ${post.title}`} aria-pressed={!!postStates[post.id]?.saved} onClick={() => updatePost(post.id, { saved: !postStates[post.id]?.saved })}><Bookmark size={21} fill={postStates[post.id]?.saved ? 'currentColor' : 'none'}/></button></article>)}</div></section>
    <section className="search-recents" aria-labelledby="recents-heading"><div className="search-section-heading"><h2 id="recents-heading">Ricerche recenti</h2>{recents.length > 0 && <button onClick={() => setRecents([])}>Cancella tutto</button>}</div>{recents.length ? <ul>{recents.map(recent => <li key={recent}><button onClick={() => selectQuery(recent)}><Clock3 size={21}/><span>{recent}</span><ArrowUpLeft size={19}/></button></li>)}</ul> : <p className="no-recents">Le tue prossime ricerche appariranno qui.</p>}</section>
   </>}
  </div>
 </section>;
}
