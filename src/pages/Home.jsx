import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import ProfileDeck from '../components/ProfileDeck';
import SearchOverlay from '../components/SearchOverlay';
import { creators, discovery, initialRecentSearches } from '../data/mockData';
export default function Home({ postStates, updatePost, personStates, setPersonStates, notify }) {
 const [params, setParams] = useSearchParams();
 const [category, setCategory] = useState('Esplora');
 const [recents, setRecents] = useState(initialRecentSearches);
 const [history, setHistory] = useState([]);
 const [returning, setReturning] = useState(null);
 const returnFocus = useRef(null);
 const searchOpen = params.get('search') === '1';
 const selectedPost = params.get('post');
 const selectedPerson = creators.find(person => person.posts.some(post => post.id === selectedPost))?.id;
 function openSearch(event) { returnFocus.current = event.currentTarget; setParams(previous => { const next = new URLSearchParams(previous); next.set('search', '1'); return next; }); }
 function closeSearch() { setParams(previous => { const next = new URLSearchParams(previous); next.delete('search'); return next; }, { replace: true }); requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true })); }
 function openPost(id) { setCategory('Esplora'); setParams({ post: id }, { replace: true }); }
 const people = creators
  .map(person => category === 'Esplora' ? person : { ...person, posts: person.posts.filter(post => post.discovery === category) })
  .filter(person => person.posts.length && (person.id === selectedPerson || !personStates[person.id]))
  .sort((a, b) => (b.id === selectedPerson) - (a.id === selectedPerson));
 function decide(personId, choice, postId) {
  setPersonStates(previous => ({ ...previous, [personId]: choice }));
  const post = creators.find(person => person.id === personId).posts.find(item => item.id === postId);
  const saved = choice === 'liked' && post && !postStates[postId]?.cool;
  if (saved) { updatePost(postId, { cool: true }); notify(`“${post.title}” salvato in Che figo`); }
  setHistory(previous => [...previous, { personId, choice, postId: saved ? postId : null }]);
  setReturning(null);
  if (personId === selectedPerson) setParams({}, { replace: true });
 }
 function undo() {
  const last = history.at(-1);
  if (!last) return;
  setPersonStates(previous => { const next = { ...previous }; delete next[last.personId]; return next; });
  if (last.postId) updatePost(last.postId, { cool: false });
  setReturning({ id: last.personId, from: last.choice === 'liked' ? 'right' : 'left' });
  setHistory(previous => previous.slice(0, -1));
 }
 function collaborate(postId) { updatePost(postId, { requested: true }); notify('Richiesta di collaborazione inviata'); }
 return <><div className="home-screen" inert={searchOpen ? true : undefined}><Header onOpenSearch={openSearch}/><nav className="discovery-row" aria-label="Esplora per disciplina">{discovery.map(item => <button key={item.label} className={`discovery-item ${category === item.label ? 'active' : ''}`} aria-pressed={category === item.label} onClick={() => setCategory(item.label)}><span className="discovery-ring"><img src={item.avatar} alt=""/></span><span>{item.label}</span></button>)}</nav><ProfileDeck key={selectedPost || category} people={people} startPostId={selectedPost} postStates={postStates} onCollaborate={collaborate} onDecide={decide} onUndo={undo} canUndo={history.length > 0} returning={returning}/></div>{searchOpen && <SearchOverlay onClose={closeSearch} onOpenPost={openPost} recents={recents} setRecents={setRecents} postStates={postStates} updatePost={updatePost}/>}</>;
}
