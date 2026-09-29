import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import { currentUser, initialConversations, initialNotifications } from './data/mockData';
export default function App() {
 const [postStates, setPostStates] = useState({});
 const [personStates, setPersonStates] = useState({});
 const [conversations, setConversations] = useState(initialConversations);
 const [notifications, setNotifications] = useState(initialNotifications);
 const [applicationDecisions, setApplicationDecisions] = useState({});
 const [user, setUser] = useState(currentUser);
 const [toast, setToast] = useState('');
 const timer = useRef();
 const location = useLocation();
 useEffect(() => { if (!location.search.includes('post=')) window.scrollTo(0, 0); }, [location.pathname]);
 useEffect(() => () => clearTimeout(timer.current), []);
 function notify(message) { clearTimeout(timer.current); setToast(message); timer.current = setTimeout(() => setToast(''), 2200); }
 function updatePost(id, patch) { setPostStates(prev => ({ ...prev, [id]: { ...prev[id], ...patch } })); }
 return <><a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main').focus(); }}>Vai al contenuto</a><Sidebar/><main className="app-shell" id="main" tabIndex={-1}><div className="route" key={location.pathname}><Routes><Route path="/" element={<Home postStates={postStates} updatePost={updatePost} personStates={personStates} setPersonStates={setPersonStates} notify={notify} notificationCount={notifications.filter(item => !item.read).length}/>}/><Route path="/messages" element={<Messages conversations={conversations} setConversations={setConversations}/>}/><Route path="/notifications" element={<Notifications notifications={notifications} setNotifications={setNotifications}/>}/><Route path="/profile" element={<Profile user={user} setUser={setUser} notify={notify} postStates={postStates} updatePost={updatePost} applicationDecisions={applicationDecisions} setApplicationDecisions={setApplicationDecisions}/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></div></main><BottomNav/><Toast message={toast}/></>;
}
