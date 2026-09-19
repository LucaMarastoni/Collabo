import { NavLink } from 'react-router-dom';
import { House, MessageCircle, UserRound } from 'lucide-react';
export const navItems = [{ to: '/', label: 'Home', Icon: House }, { to: '/messages', label: 'Messaggi', Icon: MessageCircle }, { to: '/profile', label: 'Profilo', Icon: UserRound }];
export default function BottomNav() { return <nav className="bottom-nav" aria-label="Navigazione principale">{navItems.map(({ to, label, Icon }) => <NavLink key={to} to={to} end><Icon size={23}/><span>{label}</span></NavLink>)}</nav>; }
