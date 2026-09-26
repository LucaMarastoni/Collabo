import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { currentUser } from '../data/mockData';
export default function Header({ title, action, onOpenSearch, notificationCount = 0 }) {
 if (title) return <header className="header page-header"><h1>{title}</h1>{action}</header>;
 return <header className="header">
  <Link to="/" className="wordmark" aria-label="Collab, Home">Collab<span>.</span></Link>
  <button className="header-search search-trigger" aria-label="Apri ricerca" onClick={onOpenSearch}><Search size={18}/><span>Cerca progetti, persone…</span></button>
  <div className="header-actions"><button className="mobile-search icon-button" aria-label="Apri ricerca" onClick={onOpenSearch}><Search size={22}/></button><Link to="/notifications" className="icon-button" aria-label={notificationCount ? `Notifiche, ${notificationCount} da leggere` : 'Notifiche'}><Bell size={23}/>{notificationCount > 0 && <span className="notification-dot"/>}</Link><Link to="/profile" aria-label="Il tuo profilo"><img className="avatar small" src={currentUser.avatar} alt="Luca"/></Link></div>
 </header>;
}
