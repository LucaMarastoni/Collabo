import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import { posts, discovery } from '../data/mockData';
export default function Home({ postStates, updatePost, notify }) {
 const [params] = useSearchParams();
 const [query, setQuery] = useState('');
 const [category, setCategory] = useState('Esplora');
 useEffect(() => { const id = params.get('post'); if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' }); }, [params]);
 const visible = posts.filter(post => (category === 'Esplora' || post.discovery === category) && [post.title, post.description, post.user.username, post.user.profession, ...post.tags].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <><Header query={query} onSearch={setQuery}/><nav className="discovery-row" aria-label="Esplora per disciplina">{discovery.map(item => <button key={item.label} className={`discovery-item ${category === item.label ? 'active' : ''}`} aria-pressed={category === item.label} onClick={() => setCategory(item.label)}><span className="discovery-ring"><img src={item.avatar} alt=""/></span><span>{item.label}</span></button>)}</nav><section aria-label="Feed di progetti e portfolio">{visible.map(post => <Post key={post.id} post={post} state={postStates[post.id] || {}} update={patch => updatePost(post.id, patch)} notify={notify}/>)}{!visible.length && <div className="empty-feed"><p>Nessun risultato per questa ricerca.</p><button onClick={() => { setQuery(''); setCategory('Esplora'); }}>Mostra tutti i post</button></div>}</section></>;
}
