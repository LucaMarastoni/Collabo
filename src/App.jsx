import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import { currentUser, initialConversations } from './data/mockData';
export default function App() {
 const [postStates, setPostStates] = useState({});
 const [conversations, setConversations] = useState(initialConversations);
 const [user, setUser] = useState(currentUser);
 const [toast, setToast] = useState('');
 const timer = useRef();
 const location = useLocation();
 useEffect(() => { if (!location.search.includes('post=')) window.scrollTo(0, 0); }, [location.pathname]);
 useEffect(() => () => clearTimeout(timer.current), []);
 function notify(message) { clearTimeout(timer.current); setToast(message); timer.current = setTimeout(() => setToast(''), 2200); }
 function updatePost(id, patch) { setPostStates(prev => ({ ...prev, [id]: { ...prev[id], ...patch } })); }
 return <><a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main').focus(); }}>Vai al contenuto</a><Sidebar/><main className="app-shell" id="main" tabIndex={-1}><Routes><Route path="/" element={<Home postStates={postStates} updatePost={updatePost} notify={notify}/>}/><Route path="/messages" element={<Messages conversations={conversations} setConversations={setConversations}/>}/><Route path="/profile" element={<Profile user={user} setUser={setUser} notify={notify}/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></main><BottomNav/><Toast message={toast}/></>;
}
