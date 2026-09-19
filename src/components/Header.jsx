import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, X } from 'lucide-react';
import { currentUser } from '../data/mockData';
export default function Header({ title, action, query = '', onSearch }) {
 const [searchOpen, setSearchOpen] = useState(false);
 const [notificationsOpen, setNotificationsOpen] = useState(false);
 if (title) return <header className="header page-header"><h1>{title}</h1>{action}</header>;
 return <header className={`header ${searchOpen ? 'search-open' : ''}`}>
  <Link to="/" className="wordmark" aria-label="Collab, Home">Collab<span>.</span></Link>
  <div className="header-search"><Search size={18}/><input aria-label="Cerca progetti e persone" placeholder="Cerca progetti, persone…" value={query} onChange={e => onSearch?.(e.target.value)}/><button className="search-close icon-button" aria-label="Chiudi ricerca" onClick={() => { setSearchOpen(false); onSearch?.(''); }}><X size={18}/></button></div>
  <div className="header-actions"><button className="mobile-search icon-button" aria-label="Apri ricerca" onClick={() => setSearchOpen(!searchOpen)}><Search size={22}/></button><button className="icon-button" aria-label="Notifiche" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={23}/><span className="notification-dot"/></button><Link to="/profile" aria-label="Il tuo profilo"><img className="avatar small" src={currentUser.avatar} alt="Luca"/></Link></div>
  {notificationsOpen && <div className="notifications-panel"><strong>Notifiche</strong><Link to="/messages?chat=marco" onClick={() => setNotificationsOpen(false)}>Marco ti ha scritto<span>Ti va di parlarne davanti a un caffè?</span></Link><Link to="/messages?chat=giulia" onClick={() => setNotificationsOpen(false)}>Un messaggio da Giulia<span>Ti ho mandato la moodboard, fammi sapere!</span></Link></div>}
 </header>;
}
