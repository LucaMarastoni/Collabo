import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import SearchOverlay from '../components/SearchOverlay';
import { posts, discovery, initialRecentSearches } from '../data/mockData';
export default function Home({ postStates, updatePost, notify }) {
 const [params, setParams] = useSearchParams();
 const [category, setCategory] = useState('Esplora');
 const [recents, setRecents] = useState(initialRecentSearches);
 const returnFocus = useRef(null);
 const searchOpen = params.get('search') === '1';
 const selectedPost = params.get('post');
 useEffect(() => { if (selectedPost) { setCategory('Esplora'); requestAnimationFrame(() => document.getElementById(selectedPost)?.scrollIntoView({ block: 'start' })); } }, [selectedPost]);
 function openSearch(event) { returnFocus.current = event.currentTarget; setParams(previous => { const next = new URLSearchParams(previous); next.set('search', '1'); return next; }); }
 function closeSearch() { setParams(previous => { const next = new URLSearchParams(previous); next.delete('search'); return next; }, { replace: true }); requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true })); }
 function openPost(id) { setCategory('Esplora'); setParams({ post: id }, { replace: true }); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' })); }
 const visible = posts.filter(post => category === 'Esplora' || post.discovery === category);
 return <><div inert={searchOpen ? true : undefined}><Header onOpenSearch={openSearch}/><nav className="discovery-row" aria-label="Esplora per disciplina">{discovery.map(item => <button key={item.label} className={`discovery-item ${category === item.label ? 'active' : ''}`} aria-pressed={category === item.label} onClick={() => setCategory(item.label)}><span className="discovery-ring"><img src={item.avatar} alt=""/></span><span>{item.label}</span></button>)}</nav><section aria-label="Feed di progetti e portfolio">{visible.map(post => <Post key={post.id} post={post} state={postStates[post.id] || {}} update={patch => updatePost(post.id, patch)} notify={notify}/>)}</section></div>{searchOpen && <SearchOverlay onClose={closeSearch} onOpenPost={openPost} recents={recents} setRecents={setRecents} postStates={postStates} updatePost={updatePost}/>}</>;
}
