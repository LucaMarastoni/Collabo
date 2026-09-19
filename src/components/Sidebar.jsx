import { NavLink, Link } from 'react-router-dom';
import { navItems } from './BottomNav';
import { currentUser } from '../data/mockData';
export default function Sidebar() { return <aside className="sidebar"><Link to="/" className="brand-symbol" aria-label="Collab, Home">c<span>.</span></Link><nav aria-label="Navigazione desktop">{navItems.map(({ to, label, Icon }) => <NavLink key={to} to={to} end aria-label={label} title={label}><Icon size={24}/></NavLink>)}</nav><Link to="/profile" className="sidebar-profile" aria-label="Profilo di Luca"><img className="avatar small" src={currentUser.avatar} alt=""/></Link></aside>; }
