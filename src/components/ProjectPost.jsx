import { Handshake, Check } from 'lucide-react';
export default function ProjectPost({ requested, onCollaborate, compact }) {
 const label = requested ? 'Richiesta inviata' : 'Collabora';
 return <button className={`collaborate ${compact ? 'compact' : ''} ${requested ? 'requested' : ''}`} disabled={requested} onClick={onCollaborate} aria-label={compact ? label : undefined} title={compact ? label : undefined}>{requested ? <Check size={compact ? 22 : 19}/> : <Handshake size={compact ? 23 : 21}/>}{!compact && <span>{label}</span>}</button>;
}
