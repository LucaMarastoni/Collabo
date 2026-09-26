import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BellOff, CheckCheck, ChevronRight, Layers3, MessageCircle, UsersRound } from 'lucide-react';

const groups = ['Oggi', 'Ieri', 'Questa settimana'];
const typeIcons = { message: MessageCircle, application: UsersRound, project: Layers3 };

export default function Notifications({ notifications, setNotifications }) {
 const [filter, setFilter] = useState('all');
 const unreadCount = notifications.filter(item => !item.read).length;
 const visible = filter === 'unread' ? notifications.filter(item => !item.read) : notifications;

 function markRead(id) {
  setNotifications(previous => previous.map(item => item.id === id ? { ...item, read: true } : item));
 }

 function markAllRead() {
  setNotifications(previous => previous.map(item => item.read ? item : { ...item, read: true }));
 }

 return <>
  <header className="header page-header notifications-header">
   <Link to="/" className="icon-button" aria-label="Torna alla Home"><ArrowLeft size={22}/></Link>
   <h1>Notifiche</h1>
   <span className="notifications-header-spacer" aria-hidden="true"/>
  </header>
  <section className="notifications-page" aria-label="Le tue notifiche">
   <div className="notifications-summary">
    <div><span className="notifications-kicker"><span/>LA TUA ATTIVITÀ</span><h2>{unreadCount ? `${unreadCount} novità da leggere` : 'Sei in pari'}</h2><p>{unreadCount ? 'Messaggi, candidature e aggiornamenti ai tuoi progetti.' : 'Hai letto tutte le notifiche. Torna quando ci sono novità.'}</p></div>
    <button type="button" onClick={markAllRead} disabled={!unreadCount}><CheckCheck size={17}/>Segna tutte come lette</button>
   </div>

   <div className="notification-filters" role="group" aria-label="Filtra notifiche">
    <button type="button" className={filter === 'all' ? 'active' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Tutte <span>{notifications.length}</span></button>
    <button type="button" className={filter === 'unread' ? 'active' : ''} aria-pressed={filter === 'unread'} onClick={() => setFilter('unread')}>Da leggere <span>{unreadCount}</span></button>
   </div>

   {visible.length ? <div className="notification-groups">{groups.map(group => {
    const items = visible.filter(item => item.group === group);
    return items.length ? <section className="notification-group" key={group} aria-label={group}>
     <h2>{group}</h2>
     <div className="notification-list">{items.map(item => {
      const Icon = typeIcons[item.type];
      return <Link to={item.href} key={item.id} className={`notification-item ${item.read ? '' : 'unread'}`} onClick={() => markRead(item.id)}>
       <span className="notification-avatar"><img src={item.user?.avatar || item.image} alt=""/><span className={`notification-type ${item.type}`}><Icon size={13} aria-hidden="true"/></span></span>
       <span className="notification-copy"><strong>{item.title}</strong><span>{item.description}</span><small>{item.time}</small></span>
       <span className="notification-trailing">{!item.read && <span className="notification-unread-dot" aria-label="Da leggere"/>}<ChevronRight size={17} aria-hidden="true"/></span>
      </Link>;
     })}</div>
    </section> : null;
   })}</div> : <div className="notifications-empty"><span><BellOff size={28}/></span><h2>Nessuna notifica da leggere</h2><p>Hai già visto tutti gli aggiornamenti.</p><button type="button" onClick={() => setFilter('all')}>Mostra tutte le notifiche</button></div>}
  </section>
 </>;
}
